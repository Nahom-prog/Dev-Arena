import Quiz from "../models/Quiz.js";
import Question from "../models/Question.js";
import User from "../models/User.js";
import { checkAndAwardBadges } from "../utils/badgeEngine.js";
import { getLevelFromXp } from "../utils/levelEngine.js";
import { escapeRegex } from "../utils/sanitize.js";

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
    const { tag, difficulty, search, page: rawPage, limit: rawLimit } = req.query;
    const filter = { status: "published" };

    if (tag && tag !== "all") {
      const safeTag = escapeRegex(tag.trim());
      filter.tags = { $in: [new RegExp(`^${safeTag}$`, "i")] };
    }

    if (difficulty && difficulty !== "all") {
      filter.difficulty = difficulty;
    }

    if (search && search.trim()) {
      const safeSearch = escapeRegex(search.trim());
      filter.$or = [
        { title: { $regex: safeSearch, $options: "i" } },
        { description: { $regex: safeSearch, $options: "i" } },
      ];
    }

    const page = Math.max(1, parseInt(rawPage) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(rawLimit) || 16));
    const skip = (page - 1) * limit;

    const isAllTagsNoSearch = (!tag || tag === "all") && (!search || !search.trim());

    let quizzes = [];
    let total = 0;

    if (isAllTagsNoSearch) {
      // Interleave technologies so the initial view is diverse across stacks rather than monolithic
      const allMatching = await Quiz.find(filter)
        .populate("teacherId", "name level")
        .lean();

      total = allMatching.length;

      // Group by primary language tag
      const CORE_STACKS = ["JavaScript", "TypeScript", "React", "Node.js", "Python", "HTML & CSS"];
      const groups = {};
      CORE_STACKS.forEach((s) => (groups[s] = []));
      const others = [];

      allMatching.forEach((q) => {
        const matchingStack = CORE_STACKS.find((s) =>
          q.tags?.some((t) => t.toLowerCase() === s.toLowerCase())
        );
        if (matchingStack) {
          groups[matchingStack].push(q);
        } else {
          others.push(q);
        }
      });

      // Interleave items round-robin across stacks
      const interleaved = [];
      let maxLen = Math.max(...Object.values(groups).map((g) => g.length), others.length);

      for (let i = 0; i < maxLen; i++) {
        for (const stack of CORE_STACKS) {
          if (groups[stack][i]) {
            interleaved.push(groups[stack][i]);
          }
        }
        if (others[i]) {
          interleaved.push(others[i]);
        }
      }

      quizzes = interleaved.slice(skip, skip + limit);
    } else {
      total = await Quiz.countDocuments(filter);
      quizzes = await Quiz.find(filter)
        .populate("teacherId", "name level")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean();
    }

    const quizIds = quizzes.map((q) => q._id);
    const counts = await Question.aggregate([
      { $match: { quizId: { $in: quizIds } } },
      { $group: { _id: "$quizId", count: { $sum: 1 } } },
    ]);
    const countMap = {};
    counts.forEach((c) => {
      countMap[c._id.toString()] = c.count;
    });

    const quizzesWithCounts = quizzes.map((q) => {
      return {
        ...q,
        questionCount: countMap[q._id.toString()] || 0,
      };
    });

    const hasMore = skip + quizzesWithCounts.length < total;

    return res.status(200).json({
      quizzes: quizzesWithCounts,
      page,
      limit,
      total,
      hasMore,
    });
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
 * Security Hardened: 1 vote per user with toggle/switch capability
 */
export const voteQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;
    const { voteType } = req.body; // 'up' or 'down'
    const userId = req.user.id;

    if (!["up", "down"].includes(voteType)) {
      return res.status(400).json({ message: "Invalid voteType. Must be 'up' or 'down'." });
    }

    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    question.voters = question.voters || [];
    const existingIndex = question.voters.findIndex(
      (v) => v.userId && v.userId.toString() === userId
    );

    if (existingIndex !== -1) {
      const currentVote = question.voters[existingIndex].voteType;
      if (currentVote === voteType) {
        return res.status(200).json({
          message: `Already registered your ${voteType}vote`,
          upvotes: question.upvotes,
          downvotes: question.downvotes,
          currentVote,
        });
      }

      // Switching vote (e.g. from down to up or vice-versa)
      if (voteType === "up") {
        question.upvotes = (question.upvotes || 0) + 1;
        question.downvotes = Math.max(0, (question.downvotes || 0) - 1);
      } else {
        question.downvotes = (question.downvotes || 0) + 1;
        question.upvotes = Math.max(0, (question.upvotes || 0) - 1);
      }
      question.voters[existingIndex].voteType = voteType;
    } else {
      // First time voting on this question
      if (voteType === "up") {
        question.upvotes = (question.upvotes || 0) + 1;
      } else {
        question.downvotes = (question.downvotes || 0) + 1;
      }
      question.voters.push({ userId, voteType });
    }

    await question.save();

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
 * Security Hardened: 1 report per user per question to prevent MongoDB document bloating
 */
export const reportQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;
    const { reason } = req.body;
    const userId = req.user.id;

    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    question.reports = question.reports || [];
    const alreadyReported = question.reports.some(
      (r) => r.userId && r.userId.toString() === userId
    );

    if (alreadyReported) {
      return res.status(409).json({
        message: "You have already submitted a report for this question.",
        reportsCount: question.reportsCount,
      });
    }

    const cleanReason = typeof reason === "string" ? reason.trim().slice(0, 300) : "User reported question issue";

    question.reportsCount = (question.reportsCount || 0) + 1;
    question.reports.push({
      userId,
      reason: cleanReason,
      createdAt: new Date(),
    });

    await question.save();

    return res.status(200).json({
      message: "Report logged for moderation review",
      reportsCount: question.reportsCount,
    });
  } catch (error) {
    console.error("Report question error:", error);
    return res.status(500).json({ message: "Failed to log report" });
  }
};

/**
 * Delete Quiz (Author or Admin Only)
 * Cascades deletion to remove all associated questions.
 */
export const deleteQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    const isOwner = quiz.teacherId && quiz.teacherId.toString() === req.user.id;
    const isAdmin = req.user && req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Only the author or admin can delete this quiz" });
    }

    // Cascade delete all associated questions
    await Question.deleteMany({ quizId: quiz._id });
    await Quiz.findByIdAndDelete(quizId);

    return res.status(200).json({ message: "Quiz and its questions deleted successfully", quizId });
  } catch (error) {
    console.error("Delete quiz error:", error);
    return res.status(500).json({ message: "Failed to delete quiz" });
  }
};


