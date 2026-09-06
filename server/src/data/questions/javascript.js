import { javascriptEasyQuizzes } from "./javascript/easy.js";
import { javascriptMidQuizzes } from "./javascript/mid.js";
import { javascriptHardQuizzes } from "./javascript/hard.js";
import { javascriptVeryHardQuizzes } from "./javascript/veryHard.js";

/**
 * JavaScript Complete Challenge Library
 * 4 Difficulties x 20 Unique Topic Quizzes x 5 Questions = 80 Quizzes / 400 Questions
 * - Easy: 20 Quizzes (100 Questions)
 * - Mid: 20 Quizzes (100 Questions)
 * - Hard: 20 Quizzes (100 Questions)
 * - Very Hard: 20 Quizzes (100 Questions)
 */

export const javascriptChallenges = [
  ...javascriptEasyQuizzes,
  ...javascriptMidQuizzes,
  ...javascriptHardQuizzes,
  ...javascriptVeryHardQuizzes,
];
