import mongoose from "mongoose";

const badgeSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    icon: { type: String, default: "🏅" },
    description: { type: String, default: "" },
    earnedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const recentAttemptSchema = new mongoose.Schema(
  {
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
    quizTitle: { type: String, default: "Assessment" },
    score: { type: Number, default: 0 },
    totalQuestions: { type: Number, default: 0 },
    percentage: { type: Number, default: 0 },
    xpEarned: { type: Number, default: 0 },
    date: { type: Date, default: Date.now },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: ["developer", "teacher", "student", "admin"],
      default: "developer",
    },
    xp: { type: Number, default: 0, min: 0 },
    level: { type: Number, default: 1, min: 1 },
    streak: { type: Number, default: 1, min: 0 },
    quizzesTaken: { type: Number, default: 0, min: 0 },
    quizzesCreated: { type: Number, default: 0, min: 0 },
    totalScore: { type: Number, default: 0, min: 0 },
    totalQuestionsAttempted: { type: Number, default: 0, min: 0 },
    lastDailyCompletedDate: { type: Date, default: null },
    badges: { type: [badgeSchema], default: [] },
    recentAttempts: { type: [recentAttemptSchema], default: [] },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;

