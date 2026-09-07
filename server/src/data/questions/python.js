import { pythonEasyChallenges } from "./python/easy.js";
import { pythonMidChallenges } from "./python/mid.js";
import { pythonHardChallenges } from "./python/hard.js";
import { pythonVeryHardChallenges } from "./python/veryHard.js";

/**
 * Master Python Track
 * 40 Dedicated Topic Quizzes:
 * - 10 Easy Topic Quizzes (50 Questions)
 * - 10 Mid Topic Quizzes (50 Questions)
 * - 10 Hard Topic Quizzes (50 Questions)
 * - 10 Very Hard Topic Quizzes (50 Questions)
 */
export const pythonChallenges = [
  ...pythonEasyChallenges,
  ...pythonMidChallenges,
  ...pythonHardChallenges,
  ...pythonVeryHardChallenges,
];
