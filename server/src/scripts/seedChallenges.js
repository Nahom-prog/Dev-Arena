import "dotenv/config";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import User from "../models/User.js";
import Quiz from "../models/Quiz.js";
import Question from "../models/Question.js";
import { ALL_CHALLENGES } from "../data/questions/index.js";

const RETIRED_LEGACY_TITLES = [
  "TypeScript Generics & Type Systems",
  "JavaScript Core & Web Essentials",
  "React 19 & Component Architecture",
  "Node.js & Backend Architecture",
  "JavaScript - Practical Fundamentals",
  "JavaScript - Real-World Gotchas & Patterns",
  "JavaScript - Deep Mechanics & Internals",
  "JavaScript - Advanced Mastery & Gymnastics",
  "advanced react concurrency",
  "sdfsd",
];

async function seed() {
  try {
    console.log("Connecting to MongoDB for arena challenge seeding...");
    await connectDB();
    console.log("✓ Connected to MongoDB");

    // 1. Find or create master system arena user (benchmark author)
    let masterUser = await User.findOne({ email: "arena.master@devarena.io" });
    if (!masterUser) {
      masterUser = await User.create({
        name: "Dev Arena Official",
        email: "arena.master@devarena.io",
        passwordHash: "$2a$10$e7K00oXmXq2z4dZt1sS67OPR8lW9M4mNq9hL6sRk4zO3Q1t2e4w5q",
        role: "author",
        xp: 9999,
        level: 10,
        quizzesCreated: ALL_CHALLENGES.length,
      });
      console.log("✓ Created Arena Master user");
    } else {
      masterUser.role = "author";
      masterUser.quizzesCreated = ALL_CHALLENGES.length;
      await masterUser.save();
    }

    // 2. Clean up retired legacy titles that have been replaced by dedicated difficulty tracks
    for (const title of RETIRED_LEGACY_TITLES) {
      const oldQuiz = await Quiz.findOne({ title });
      if (oldQuiz) {
        await Question.deleteMany({ quizId: oldQuiz._id });
        await Quiz.deleteOne({ _id: oldQuiz._id });
        console.log(`✓ Cleaned up retired legacy challenge: "${title}"`);
      }
    }

    let totalQuestionsSeeded = 0;

    // 3. Loop and upsert all 24 challenges
    for (const ch of ALL_CHALLENGES) {
      let quiz = await Quiz.findOne({ title: ch.title });
      if (!quiz) {
        quiz = await Quiz.create({
          title: ch.title,
          description: ch.description,
          difficulty: ch.difficulty,
          tags: ch.tags,
          timeLimitMinutes: ch.timeLimitMinutes,
          teacherId: masterUser._id,
          creatorName: "Dev Arena Official",
          status: "published",
          playsCount: Math.floor(Math.random() * 80) + 25,
        });
        console.log(`✓ Created challenge: ${ch.title} [${ch.difficulty.toUpperCase()}]`);
      } else {
        quiz.description = ch.description;
        quiz.difficulty = ch.difficulty;
        quiz.tags = ch.tags;
        quiz.timeLimitMinutes = ch.timeLimitMinutes;
        quiz.status = "published";
        quiz.creatorName = "Dev Arena Official";
        await quiz.save();
        console.log(`✓ Updated challenge: ${ch.title} [${ch.difficulty.toUpperCase()}]`);
      }

      // 4. Clean existing questions for this challenge and re-seed
      await Question.deleteMany({ quizId: quiz._id });

      for (const q of ch.questions) {
        // Ensure options include the correct answer and is valid
        let options = [...q.options];
        if (!options.includes(q.correctAnswer)) {
          options[0] = q.correctAnswer;
        }

        await Question.create({
          quizId: quiz._id,
          question: q.question,
          codeSnippet: q.codeSnippet || "",
          language: q.language || "javascript",
          options: options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation || "",
        });
        totalQuestionsSeeded++;
      }
      console.log(`   ➔ Seeded ${ch.questions.length} questions for "${ch.title}"`);
    }

    console.log(`\n🚀 Success! Seeded ${ALL_CHALLENGES.length} challenges with ${totalQuestionsSeeded} verified questions across all difficulty tiers!`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

seed();
