export const ALL_BADGES = [
  {
    id: "first_commit",
    name: "First Commit",
    icon: "🚀",
    description: "Completed your first developer challenge",
  },
  {
    id: "bug_squasher",
    name: "Bug Squasher",
    icon: "🐛",
    description: "Scored a perfect 100% on a challenge",
  },
  {
    id: "senior_mindset",
    name: "Senior Mindset",
    icon: "🧠",
    description: "Conquered a Hard or Very Hard challenge",
  },
  {
    id: "accuracy_sniper",
    name: "Accuracy Sniper",
    icon: "🎯",
    description: "Maintained 90%+ accuracy across 3+ assessments",
  },
  {
    id: "level_5_elite",
    name: "10x Engineer",
    icon: "👑",
    description: "Reached Level 5 in the Developer Arena",
  },
  {
    id: "open_source_hero",
    name: "Open Source Hero",
    icon: "🛠️",
    description: "Published a community challenge for other devs",
  },
  {
    id: "arena_gladiator",
    name: "Arena Gladiator",
    icon: "⚔️",
    description: "Completed 10+ developer assessments",
  },
  {
    id: "streak_warrior",
    name: "Streak Warrior",
    icon: "🔥",
    description: "Achieved a 3+ day streak of coding trivia",
  },
];

/**
 * Checks and awards new badges based on user stats and current quiz result
 */
export const checkAndAwardBadges = (user, currentQuizResult = null, quizDifficulty = "easy") => {
  const existingBadgeIds = new Set((user.badges || []).map((b) => b.id));
  const newBadges = [];

  const grant = (badgeDef) => {
    if (!existingBadgeIds.has(badgeDef.id)) {
      const badgeObj = {
        id: badgeDef.id,
        name: badgeDef.name,
        icon: badgeDef.icon,
        description: badgeDef.description,
        earnedAt: new Date(),
      };
      user.badges.push(badgeObj);
      existingBadgeIds.add(badgeDef.id);
      newBadges.push(badgeObj);
    }
  };

  // 1. First Commit
  if (user.quizzesTaken >= 1) {
    const b = ALL_BADGES.find((x) => x.id === "first_commit");
    if (b) grant(b);
  }

  // 2. Bug Squasher (100% on current quiz or past)
  if (currentQuizResult && currentQuizResult.percentage === 100) {
    const b = ALL_BADGES.find((x) => x.id === "bug_squasher");
    if (b) grant(b);
  }

  // 3. Senior Mindset
  if (
    currentQuizResult &&
    currentQuizResult.percentage >= 70 &&
    (quizDifficulty === "hard" || quizDifficulty === "very hard")
  ) {
    const b = ALL_BADGES.find((x) => x.id === "senior_mindset");
    if (b) grant(b);
  }

  // 4. Accuracy Sniper
  if (user.quizzesTaken >= 3 && user.totalQuestionsAttempted > 0) {
    const accuracy = (user.totalScore / user.totalQuestionsAttempted) * 100;
    if (accuracy >= 90) {
      const b = ALL_BADGES.find((x) => x.id === "accuracy_sniper");
      if (b) grant(b);
    }
  }

  // 5. 10x Engineer
  if (user.level >= 5 || user.xp >= 1500) {
    const b = ALL_BADGES.find((x) => x.id === "level_5_elite");
    if (b) grant(b);
  }

  // 6. Arena Gladiator
  if (user.quizzesTaken >= 10) {
    const b = ALL_BADGES.find((x) => x.id === "arena_gladiator");
    if (b) grant(b);
  }

  // 7. Open Source Hero
  if (user.quizzesCreated >= 1) {
    const b = ALL_BADGES.find((x) => x.id === "open_source_hero");
    if (b) grant(b);
  }

  // 8. Streak Warrior
  if (user.streak >= 3) {
    const b = ALL_BADGES.find((x) => x.id === "streak_warrior");
    if (b) grant(b);
  }

  return newBadges;
};
