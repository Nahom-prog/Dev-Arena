import { typescriptChallenges } from "./typescript.js";
import { javascriptChallenges } from "./javascript.js";
import { reactChallenges } from "./react.js";
import { nodejsChallenges } from "./nodejs.js";
import { pythonChallenges } from "./python.js";
import { htmlChallenges } from "./html.js";
import { communityChallenges } from "./communityTracks.js";

/**
 * Master collection of all arena challenge tracks:
 * - TypeScript: 80 Quizzes (400 Questions)
 * - JavaScript: 80 Quizzes (400 Questions)
 * - React: 80 Quizzes (400 Questions)
 * - Node.js: 80 Quizzes (400 Questions)
 * - Python: 40 Quizzes (200 Questions)
 * - HTML & CSS: 40 Quizzes (200 Questions)
 * - Community tracks: PostgreSQL, Next.js, Docker, MongoDB, Java, Git (6 Quizzes, 30 Questions)
 * Total: 406 Quizzes (2,030 Questions)
 */
export const ALL_CHALLENGES = [
  ...typescriptChallenges,
  ...javascriptChallenges,
  ...reactChallenges,
  ...nodejsChallenges,
  ...pythonChallenges,
  ...htmlChallenges,
  ...communityChallenges,
];

