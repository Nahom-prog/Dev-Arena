/**
 * Progressive Level Progression Engine
 * Each level requires incrementally more XP to reach than the previous level:
 * Level 1 -> 2: 250 XP
 * Level 2 -> 3: 400 XP
 * Level 3 -> 4: 550 XP
 * Level 4 -> 5: 700 XP
 * Level 5 -> 6: 850 XP
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

export function getLevelFromXp(totalXp = 0) {
  return calculateLevelData(totalXp).level;
}
