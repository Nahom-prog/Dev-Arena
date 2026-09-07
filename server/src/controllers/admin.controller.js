import User from "../models/User.js";
import Quiz from "../models/Quiz.js";
import Question from "../models/Question.js";
import { escapeRegex } from "../utils/sanitize.js";

/**
 * Platform pulse stats
 */
export async function getSystemStats(req, res) {
  try {
    const [totalUsers, totalQuizzes, publishedQuizzes, totalQuestions, reportedQuestionsCount] = await Promise.all([
      User.countDocuments(),
      Quiz.countDocuments(),
      Quiz.countDocuments({ status: "published" }),
      Question.countDocuments(),
      Question.countDocuments({ reportsCount: { $gt: 0 } }),
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
        reportedQuestionsCount,
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

    if (search && search.trim()) {
      const safeSearch = escapeRegex(search.trim());
      filter.$or = [
        { name: { $regex: safeSearch, $options: "i" } },
        { email: { $regex: safeSearch, $options: "i" } },
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

const FOUNDER_EMAIL = "abiynahom570@gmail.com";

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

    // Founder Immunity Shield: Non-founders cannot modify the founder account
    if (user.email === FOUNDER_EMAIL && req.user.email !== FOUNDER_EMAIL) {
      return res.status(403).json({
        message: "Immunity Shield: The Supreme Founder account cannot be modified by other admins.",
      });
    }

    // Only the Supreme Founder can grant admin role to others
    if (role === "admin" && req.user.email !== FOUNDER_EMAIL) {
      return res.status(403).json({
        message: "Hierarchy Protection: Only the Supreme Founder can appoint new Admins.",
      });
    }

    if (xp !== undefined) user.xp = Number(xp);
    if (level !== undefined) user.level = Number(level);
    if (streak !== undefined) user.streak = Number(streak);
    if (role && ["developer", "author", "admin", "student", "teacher"].includes(role)) {
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

    const userToDelete = await User.findById(userId);
    if (!userToDelete) {
      return res.status(404).json({ message: "User not found" });
    }

    // Founder Immunity Shield: Founder can never be deleted
    if (userToDelete.email === FOUNDER_EMAIL) {
      return res.status(403).json({
        message: "Immunity Shield: The Supreme Founder account cannot be deleted.",
      });
    }

    const currentAdminId = (req.user?.id || req.user?._id || "").toString();
    if (currentAdminId === userId) {
      return res.status(400).json({ message: "Cannot delete your own account." });
    }

    // Cascade: remove quizzes and questions authored by this user
    const userQuizzes = await Quiz.find({ teacherId: userId }).select("_id");
    if (userQuizzes.length > 0) {
      const quizIds = userQuizzes.map((q) => q._id);
      await Promise.all([
        Quiz.deleteMany({ teacherId: userId }),
        Question.deleteMany({ quizId: { $in: quizIds } }),
      ]);
    }

    await User.findByIdAndDelete(userId);
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

/**
 * Get questions with report metrics and voting counters for God Mode review
 */
export async function getQuestionsAdmin(req, res) {
  try {
    const { filter } = req.query; // 'reported' or 'all'
    const query = {};
    if (filter === 'reported') {
      query.reportsCount = { $gt: 0 };
    }

    const questions = await Question.find(query)
      .populate("quizId", "title difficulty status")
      .sort({ reportsCount: -1, downvotes: -1, createdAt: -1 })
      .limit(100);

    return res.json({ questions });
  } catch (err) {
    console.error("Admin get questions error:", err);
    return res.status(500).json({ message: "Failed to load questions" });
  }
}

/**
 * Dismiss reports on a verified question (clears reports count and log)
 */
export async function dismissQuestionReportsAdmin(req, res) {
  try {
    const { questionId } = req.params;
    const question = await Question.findByIdAndUpdate(
      questionId,
      { $set: { reportsCount: 0, reports: [] } },
      { new: true }
    );

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    return res.json({ message: "Reports dismissed and question marked verified", question });
  } catch (err) {
    console.error("Admin dismiss reports error:", err);
    return res.status(500).json({ message: "Failed to dismiss reports" });
  }
}

/**
 * Purge a single broken or toxic question
 */
export async function deleteQuestionAdmin(req, res) {
  try {
    const { questionId } = req.params;
    const deleted = await Question.findByIdAndDelete(questionId);
    if (!deleted) {
      return res.status(404).json({ message: "Question not found" });
    }

    return res.json({ message: "Question purged successfully" });
  } catch (err) {
    console.error("Admin delete question error:", err);
    return res.status(500).json({ message: "Failed to delete question" });
  }
}
