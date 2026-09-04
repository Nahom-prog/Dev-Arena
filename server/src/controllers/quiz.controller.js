import Quiz from "../models/Quiz.js";
import Question from "../models/Question.js";
import User from "../models/User.js";
import { checkAndAwardBadges } from "../utils/badgeEngine.js";
import { getLevelFromXp } from "../utils/levelEngine.js";

export const createQuiz = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Eligibility Gate: Level 3+ AND 3+ quizzes taken (or admin/teacher)
    const isEligible =
      ((user.level || 1) >= 3 && (user.quizzesTaken || 0) >= 3) ||
      user.role === "admin" ||
      user.role === "author" ||
      user.role === "teacher";

    if (!isEligible) {
      return res.status(403).json({
        message: "Creator Mode Locked: Must be at least Level 3 AND complete 3 assessments to unlock challenge authoring!",
        currentLevel: user.level || 1,
        quizzesTaken: user.quizzesTaken || 0,
        requiredLevel: 3,
        requiredQuizzes: 3,
      });
    }

    const { title, description, timeLimitMinutes, tags, difficulty, startAt, endAt } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const validDifficulties = ["easy", "mid", "hard", "very hard"];
    const quizDifficulty = validDifficulties.includes(difficulty) ? difficulty : "easy";

    const parsedTags = Array.isArray(tags)
      ? tags
      : typeof tags === "string" && tags.trim()
      ? tags.split(",").map((t) => t.trim()).filter(Boolean)
      : ["JavaScript"];

    const quiz = await Quiz.create({
      title,
      description: description || "",
      teacherId: req.user.id,
      creatorName: user.name || "Dev Contributor",
      tags: parsedTags.length > 0 ? parsedTags : ["JavaScript"],
      difficulty: quizDifficulty,
      timeLimitMinutes: timeLimitMinutes ?? 10,
      startAt: startAt || null,
      endAt: endAt || null,
      status: "draft",
    });

    // Update user quizzesCreated count & check for creator badge
    user.quizzesCreated = (user.quizzesCreated || 0) + 1;
    const newBadges = checkAndAwardBadges(user);
    await user.save();

    return res.status(201).json({
      message: "Quiz created successfully",
      quiz,
      newBadges,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to create quiz" });
  }
};

export const getAllQuizzes = async (req, res) => {
  try {
    const { tag, difficulty, search } = req.query;
    const filter = { status: "published" };

    if (tag && tag !== "all") {
      filter.tags = { $in: [new RegExp(`^${tag}$`, "i")] };
    }

    if (difficulty && difficulty !== "all") {
      filter.difficulty = difficulty;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const quizzes = await Quiz.find(filter)
      .populate("teacherId", "name level")
      .sort({ createdAt: -1 });

    return res.status(200).json({ quizzes });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to fetch quizzes" });
  }
};

export const getMyQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({ teacherId: req.user.id }).sort({ createdAt: -1 });
    return res.status(200).json({ quizzes });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch authored quizzes" });
  }
};

export const getQuizById = async (req, res) => {
  try {
    const { quizId } = req.params;
    const quiz = await Quiz.findById(quizId).populate("teacherId", "name level");
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // If draft, only creator or admin can view
    const isOwner = req.user && quiz.teacherId && quiz.teacherId._id?.toString() === req.user.id;
    if (quiz.status !== "published" && !isOwner && req.user?.role !== "admin") {
      return res.status(403).json({ message: "Quiz not published yet" });
    }

    return res.status(200).json({ quiz });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch quiz" });
  }
};

export const publishQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    if (quiz.teacherId.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "This quiz is not owned by you" });
    }

    quiz.status = "published";
    await quiz.save();
    return res.status(200).json({ message: "Quiz published successfully", quiz });
  } catch (error) {
    return res.status(500).json({ message: "Failed to publish quiz" });
  }
};

export const getDailyChallenge = async (req, res) => {
  try {
    const quizzes = await Quiz.find({ status: "published" }).sort({ createdAt: 1 });
    if (quizzes.length === 0) {
      return res.status(404).json({ message: "No published challenges available for daily rotation." });
    }

    // Deterministic daily index based on days elapsed since epoch UTC
    const daysSinceEpoch = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
    const dailyIndex = daysSinceEpoch % quizzes.length;
    const dailyQuiz = quizzes[dailyIndex];

    // Compute remaining time until next midnight UTC
    const now = new Date();
    const nextReset = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, 0, 0, 0));
    const timeRemainingMs = Math.max(0, nextReset.getTime() - now.getTime());

    // Check if authenticated user has completed daily challenge today
    let completedToday = false;
    let userStreak = 1;

    if (req.user) {
      const user = await User.findById(req.user.id);
      if (user) {
        userStreak = user.streak || 1;
        if (user.lastDailyCompletedDate) {
          const lastDate = new Date(user.lastDailyCompletedDate);
          const sameDay =
            lastDate.getUTCFullYear() === now.getUTCFullYear() &&
            lastDate.getUTCMonth() === now.getUTCMonth() &&
            lastDate.getUTCDate() === now.getUTCDate();
          completedToday = sameDay;
        }
      }
    }

    return res.status(200).json({
      quiz: dailyQuiz,
      timeRemainingMs,
      nextReset,
      completedToday,
      streak: userStreak,
      xpMultiplier: 2.0,
      isDaily: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to fetch daily challenge" });
  }
};

export const submitQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { answers } = req.body;

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ message: "Answers array is required" });
    }

    const quiz = await Quiz.findById(quizId);
    if (!quiz || quiz.status !== "published") {
      return res.status(404).json({ message: "Quiz not found or not published" });
    }

    const questions = await Question.find({ quizId });
    if (questions.length === 0) {
      return res.status(400).json({ message: "This quiz has no questions available" });
    }

    let score = 0;
    questions.forEach((q) => {
      const userAns = answers.find((a) => a.questionId.toString() === q._id.toString());
      if (userAns && userAns.selectedAnswer === q.correctAnswer) {
        score += 1;
      }
    });

    const totalQuestions = questions.length;
    const percentage = Math.round((score / totalQuestions) * 100);

    // Check if this quiz is today's daily challenge
    const allQuizzes = await Quiz.find({ status: "published" }).sort({ createdAt: 1 });
    const daysSinceEpoch = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
    const dailyIndex = allQuizzes.length > 0 ? daysSinceEpoch % allQuizzes.length : -1;
    const isTodayDaily = dailyIndex >= 0 && allQuizzes[dailyIndex]._id.toString() === quiz._id.toString();

    // XP calculation with difficulty multiplier (or 2.0x daily bonus)
    const multipliers = {
      easy: 1.0,
      mid: 1.25,
      hard: 1.5,
      "very hard": 2.0,
    };
    const mult = isTodayDaily ? 2.0 : multipliers[quiz.difficulty] || 1.0;
    const baseScoreXp = score * 50 * mult;
    const perfectBonus = percentage === 100 ? 50 : 0;
    const xpEarned = Math.round(baseScoreXp + perfectBonus);

    // Update User progression
    const user = await User.findById(req.user.id);
    if (user) {
      const now = new Date();
      let dailyAlreadyCompleted = false;

      if (isTodayDaily && user.lastDailyCompletedDate) {
        const lastDate = new Date(user.lastDailyCompletedDate);
        dailyAlreadyCompleted =
          lastDate.getUTCFullYear() === now.getUTCFullYear() &&
          lastDate.getUTCMonth() === now.getUTCMonth() &&
          lastDate.getUTCDate() === now.getUTCDate();
      }

      // Anti-Exploit Rules:
      // 1. Author cannot earn XP from their own quizzes (Author Preview Mode)
      const isAuthor = quiz.teacherId && quiz.teacherId.toString() === req.user.id.toString();

      // 2. User only earns XP on the FIRST completion of any quiz (Strict Zero-XP on repeated plays)
      const hasPreviouslyCompleted = user.recentAttempts?.some(
        (att) => att.quizId && att.quizId.toString() === quiz._id.toString()
      );

      let finalXpEarned = xpEarned;
      let xpStatusNote = "";

      if (isAuthor) {
        finalXpEarned = 0;
        xpStatusNote = "Author Preview Mode — 0 XP awarded";
      } else if (isTodayDaily && dailyAlreadyCompleted) {
        finalXpEarned = 0;
        xpStatusNote = "Daily Challenge already completed today — 0 XP awarded";
      } else if (hasPreviouslyCompleted) {
        finalXpEarned = 0;
        xpStatusNote = "Practice Retake — 0 XP awarded (one-time completion points already claimed)";
      }

      user.xp = (user.xp || 0) + finalXpEarned;
      user.level = getLevelFromXp(user.xp);
      user.quizzesTaken = (user.quizzesTaken || 0) + 1;
      user.totalScore = (user.totalScore || 0) + score;
      user.totalQuestionsAttempted = (user.totalQuestionsAttempted || 0) + totalQuestions;

      // Update Streak only on first daily completion of the day
      if (isTodayDaily && !dailyAlreadyCompleted) {
        if (!user.lastDailyCompletedDate) {
          user.streak = (user.streak || 0) + 1;
        } else {
          const lastDate = new Date(user.lastDailyCompletedDate);
          const diffDays = Math.floor((now.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
          if (diffDays === 1) {
            user.streak = (user.streak || 0) + 1;
          } else if (diffDays > 1) {
            user.streak = 1;
          }
        }
        user.lastDailyCompletedDate = now;
      }

      // Add to recent attempts
      user.recentAttempts.push({
        quizId: quiz._id,
        quizTitle: isTodayDaily ? `🔥 [DAILY] ${quiz.title}` : quiz.title,
        score,
        totalQuestions,
        percentage,
        xpEarned: finalXpEarned,
        date: now,
      });

      // Check and award badges (only if real score and not already capped)
      const newBadges = checkAndAwardBadges(
        user,
        { percentage, score, totalQuestions },
        quiz.difficulty
      );

      await user.save();

      // Increment quiz play count
      quiz.playsCount = (quiz.playsCount || 0) + 1;
      await quiz.save();

      return res.status(200).json({
        message: "Quiz submitted successfully",
        score,
        totalQuestions,
        percentage,
        xpEarned: finalXpEarned,
        xpStatusNote,
        isRepeatPlay: hasPreviouslyCompleted,
        isAuthor,
        newTotalXp: user.xp,
        newLevel: user.level,
        streak: user.streak,
        isDaily: isTodayDaily,
        newBadges,
        questions,
      });
    }

    return res.status(200).json({
      message: "Quiz submitted successfully",
      score,
      totalQuestions,
      percentage,
      xpEarned,
      questions,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to submit quiz" });
  }
};

/**
 * Question Community Quality Feedback (Upvote / Downvote)
 */
export const voteQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;
    const { voteType } = req.body; // 'up' or 'down'

    if (!['up', 'down'].includes(voteType)) {
      return res.status(400).json({ message: "Invalid voteType. Must be 'up' or 'down'." });
    }

    const incField = voteType === 'up' ? { upvotes: 1 } : { downvotes: 1 };
    const question = await Question.findByIdAndUpdate(
      questionId,
      { $inc: incField },
      { new: true }
    );

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    return res.status(200).json({
      message: `Feedback registered (${voteType})`,
      upvotes: question.upvotes,
      downvotes: question.downvotes,
    });
  } catch (error) {
    console.error("Vote question error:", error);
    return res.status(500).json({ message: "Failed to register feedback" });
  }
};

/**
 * Report Question Issue (Typo, Wrong Answer, Broken Code, Spam)
 */
export const reportQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;
    const { reason } = req.body;

    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    question.reportsCount = (question.reportsCount || 0) + 1;
    question.reports.push({
      userId: req.user?.id || null,
      reason: reason || "User reported question issue",
      createdAt: new Date(),
    });

    await question.save();

    return res.status(200).json({
      message: "Report logged for God Mode moderation review",
      reportsCount: question.reportsCount,
    });
  } catch (error) {
    console.error("Report question error:", error);
    return res.status(500).json({ message: "Failed to log report" });
  }
};


