import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },
    question: {
      type: String,
      required: true,
      trim: true,
    },
    codeSnippet: {
      type: String,
      default: "",
    },
    language: {
      type: String,
      default: "javascript",
      trim: true,
    },
    options: {
      type: [String],
      required: true,
    },
    correctAnswer: {
      type: String,
      required: true,
      trim: true,
    },
    explanation: {
      type: String,
      default: "",
      trim: true,
    },
    upvotes: {
      type: Number,
      default: 0,
      min: 0,
    },
    downvotes: {
      type: Number,
      default: 0,
      min: 0,
    },
    reportsCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    reports: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        reason: { type: String, trim: true, default: "General issue" },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    voters: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        voteType: { type: String, enum: ["up", "down"] },
      },
    ],
  },
  { timestamps: true }
);

questionSchema.index({ quizId: 1 });

const Question = mongoose.model("Question", questionSchema);
export default Question;
