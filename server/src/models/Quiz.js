import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    creatorName: {
      type: String,
      default: "Dev Contributor",
      trim: true,
    },
    tags: {
      type: [String],
      default: ["JavaScript"],
    },
    difficulty: {
      type: String,
      enum: ["easy", "mid", "hard", "very hard"],
      default: "easy",
    },
    playsCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    status: {
      type: String,
      enum: ["draft", "published", "closed"],
      default: "draft",
    },
    timeLimitMinutes: { type: Number, default: 10, min: 1 },
    startAt: { type: Date, default: null },
    endAt: { type: Date, default: null },
  },
  { timestamps: true }
);

quizSchema.index({ status: 1, createdAt: -1 });
quizSchema.index({ tags: 1 });

const Quiz = mongoose.model("Quiz", quizSchema);

export default Quiz;