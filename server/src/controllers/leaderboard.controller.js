import User from "../models/User.js";

export const getLeaderboard = async (req, res) => {
  try {
    const { filter, affiliation } = req.query;
    const query = { role: { $ne: "admin" } };

    if (filter === "ethiopia") {
      query.$or = [
        { country: "Ethiopia" },
        { country: { $exists: false } },
      ];
    }

    if (affiliation) {
      query.affiliation = { $regex: affiliation, $options: "i" };
    }

    // Only show real contenders on the public leaderboard (exclude stealth admin accounts)
    const users = await User.find(query)
      .select("name email xp level streak quizzesTaken totalScore totalQuestionsAttempted badges country affiliation")
      .sort({ xp: -1, totalScore: -1 })
      .limit(50);

    const rankedUsers = users.map((u, index) => {
      const accuracy =
        u.totalQuestionsAttempted > 0
          ? ((u.totalScore / u.totalQuestionsAttempted) * 100).toFixed(1)
          : "0.0";

      return {
        rank: index + 1,
        id: u._id,
        name: u.name,
        country: u.country || "Ethiopia",
        affiliation: u.affiliation || "",
        xp: u.xp || 0,
        level: u.level || 1,
        streak: u.streak || 1,
        quizzesTaken: u.quizzesTaken || 0,
        accuracy: `${accuracy}%`,
        badgeCount: (u.badges || []).length,
        topBadge: u.badges && u.badges.length > 0 ? u.badges[u.badges.length - 1] : null,
      };
    });

    return res.status(200).json({ leaderboard: rankedUsers });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to fetch leaderboard" });
  }
};
