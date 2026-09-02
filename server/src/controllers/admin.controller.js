import User from "../models/User.js";
import Quiz from "../models/Quiz.js";
import Question from "../models/Question.js";

/**
 * Platform pulse stats
 */
export async function getSystemStats(req, res) {
  try {
    const [totalUsers, totalQuizzes, publishedQuizzes, totalQuestions] = await Promise.all([
      User.countDocuments(),
      Quiz.countDocuments(),
      Quiz.countDocuments({ status: "published" }),
      Question.countDocuments(),
    ]);

    const xpAggregate = await User.aggregate([
      { $group: { _id: null, totalPlatformXp: { $sum: "$xp" } } },
    ]);

    const totalXp = xpAggregate[0]?.totalPlatformXp || 0;

    return res.json({
      stats: {
        totalUsers,
        totalQuizzes,
        publishedQuizzes,
        totalQuestions,
        totalXp,
      },
    });
  } catch (err) {
    console.error("Admin stats error:", err);
    return res.status(500).json({ message: "Failed to load system statistics" });
  }
}

/**
 * Get all users with search
 */
export async function getAllUsers(req, res) {
  try {
    const { search } = req.query;
    const filter = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const users = await User.find(filter)
      .select("-passwordHash")
      .sort({ createdAt: -1 })
      .limit(100);

    return res.json({ users });
  } catch (err) {
    console.error("Admin get users error:", err);
    return res.status(500).json({ message: "Failed to load users" });
  }
}

/**
 * Modify any user's stats, level, role, or streak
 */
export async function updateUser(req, res) {
  try {
    const { userId } = req.params;
    const { xp, level, role, streak } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (xp !== undefined) user.xp = Number(xp);
    if (level !== undefined) user.level = Number(level);
    if (streak !== undefined) user.streak = Number(streak);
    if (role && ["student", "teacher", "developer", "admin"].includes(role)) {
      user.role = role;
    }

    await user.save();
    return res.json({ message: "User updated successfully", user });
  } catch (err) {
    console.error("Admin update user error:", err);
    return res.status(500).json({ message: "Failed to update user" });
  }
}

/**
 * Delete any user
 */
export async function deleteUser(req, res) {
  try {
    const { userId } = req.params;

    if (req.user._id.toString() === userId) {
      return res.status(400).json({ message: "Cannot delete your own master admin account." });
    }

    const deleted = await User.findByIdAndDelete(userId);
    if (!deleted) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({ message: "User purged successfully" });
  } catch (err) {
    console.error("Admin delete user error:", err);
    return res.status(500).json({ message: "Failed to delete user" });
  }
}

/**
 * Get all quizzes (draft, published, closed) for moderation
 */
export async function getAllQuizzesAdmin(req, res) {
  try {
    const quizzes = await Quiz.find()
      .populate("teacherId", "name email")
      .sort({ createdAt: -1 });

    return res.json({ quizzes });
  } catch (err) {
    console.error("Admin get quizzes error:", err);
    return res.status(500).json({ message: "Failed to load quizzes" });
  }
}

/**
 * Force-publish or unpublish any quiz
 */
export async function toggleQuizStatus(req, res) {
  try {
    const { quizId } = req.params;
    const { status } = req.body;

    if (!["published", "draft", "closed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const quiz = await Quiz.findByIdAndUpdate(
      quizId,
      { status },
      { new: true }
    );

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    return res.json({ message: `Quiz status set to ${status}`, quiz });
  } catch (err) {
    console.error("Admin toggle status error:", err);
    return res.status(500).json({ message: "Failed to update quiz status" });
  }
}

/**
 * Delete a quiz and all its questions
 */
export async function deleteQuizAdmin(req, res) {
  try {
    const { quizId } = req.params;

    await Promise.all([
      Quiz.findByIdAndDelete(quizId),
      Question.deleteMany({ quizId }),
    ]);

    return res.json({ message: "Quiz and all questions purged successfully" });
  } catch (err) {
    console.error("Admin delete quiz error:", err);
    return res.status(500).json({ message: "Failed to delete quiz" });
  }
}
