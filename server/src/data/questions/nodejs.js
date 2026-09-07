import { nodejsEasyQuizzes } from "./nodejs/easy.js";
import { nodejsMidQuizzes } from "./nodejs/mid.js";
import { nodejsHardQuizzes } from "./nodejs/hard.js";
import { nodejsVeryHardQuizzes } from "./nodejs/veryHard.js";

/**
 * Node.js Complete Challenge Library
 * 4 Difficulties x 20 Unique Topic Quizzes x 5 Questions = 80 Quizzes / 400 Questions Total
 * - Easy: 20 Quizzes (100 Questions)
 * - Mid: 20 Quizzes (100 Questions)
 * - Hard: 20 Quizzes (100 Questions)
 * - Very Hard: 20 Quizzes (100 Questions)
 * All answers are strictly balanced 25% A, 25% B, 25% C, 25% D across each tier.
 */

export const nodejsChallenges = [
  ...nodejsEasyQuizzes,
  ...nodejsMidQuizzes,
  ...nodejsHardQuizzes,
  ...nodejsVeryHardQuizzes,
];
