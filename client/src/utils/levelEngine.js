/**
 * Progressive Level Progression Engine (Client)
 * Calculates level, current-level XP, XP needed for next level, and progress %
 */

export function calculateLevelData(totalXp = 0) {
  let level = 1;
  let accumulatedXp = 0;

  while (true) {
    const xpNeededForNext = 250 + (level - 1) * 150;
    if (totalXp < accumulatedXp + xpNeededForNext) {
      const currentLevelXp = Math.max(0, totalXp - accumulatedXp);
      const progressPct = Math.min(100, Math.round((currentLevelXp / xpNeededForNext) * 100));
      return {
        level,
        currentLevelXp,
        xpNeededForNext,
        progressPct,
        nextLevelThreshold: accumulatedXp + xpNeededForNext,
      };
    }
    accumulatedXp += xpNeededForNext;
    level += 1;
  }
}
