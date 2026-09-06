import { typescriptChallenges } from "./typescript.js";
import { javascriptChallenges } from "./javascript.js";
import { reactChallenges } from "./react.js";
import { nodejsChallenges } from "./nodejs.js";
import { communityChallenges } from "./communityTracks.js";

/**
 * Master collection of all arena challenge tracks
 * 24 Challenges total:
 * - TypeScript: Easy (20Q), Mid (20Q), Hard (20Q), Very Hard (20Q)
 * - JavaScript: Easy (20Q), Mid (20Q), Hard (20Q), Very Hard (20Q)
 * - React: Easy (20Q), Mid (20Q), Hard (20Q), Very Hard (20Q)
 * - Node.js: Easy (20Q), Mid (20Q), Hard (20Q), Very Hard (20Q)
 * - PostgreSQL, Next.js, Python, Docker, HTML & CSS, MongoDB, Java, Git
 */
export const ALL_CHALLENGES = [
  ...typescriptChallenges,
  ...javascriptChallenges,
  ...reactChallenges,
  ...nodejsChallenges,
  ...communityChallenges,
];
