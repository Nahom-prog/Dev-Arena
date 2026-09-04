import Question from "../models/Question.js"
import Quiz from "../models/Quiz.js"
// creating a question
export const createQuestion = async (req, res) => {
  try {
    const { quizId, question, codeSnippet, language, options, correctAnswer, explanation } = req.body;

    if (!quizId || !question || !options || !correctAnswer) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // Check ownership: quiz owner or admin/teacher
    const isOwner = quiz.teacherId.toString() === req.user.id;
    if (!isOwner && req.user.role !== "admin" && req.user.role !== "teacher") {
      return res.status(403).json({ message: "Only the author can add questions to this quiz" });
    }

    const newQuestion = await Question.create({
      quizId: quiz._id,
      question: question.trim(),
      codeSnippet: codeSnippet || "",
      language: language || "javascript",
      options: options,
      correctAnswer: correctAnswer,
      explanation: explanation || "",
    });

    return res.status(201).json({ message: "Question created successfully", question: newQuestion });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to create question" });
  }
};
 // fetching the question
export const getQuestionByQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // Security Hardening: Anti-Cheat Mechanism
    // Only author or admin can view answers & explanations prior to exam submission.
    const isOwner = req.user && quiz.teacherId && quiz.teacherId.toString() === req.user.id;
    const isAdmin = req.user && req.user.role === "admin";
    const projection = isOwner || isAdmin ? "" : "-correctAnswer -explanation";

    const questions = await Question.find({ quizId }).select(projection);
    return res.status(200).json({ questions });
  } catch (error) {
    return res.status(500).json({ message: "can't get questions" });
  }
};