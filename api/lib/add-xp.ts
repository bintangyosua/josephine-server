function xpToNextLevel(
  level: number,
  baseXP = 100,
  growthFactor = 1.5
): number {
  return Math.floor(baseXP * Math.pow(level, growthFactor));
}

export function calculateXpAndLevel(
  currentXp: number,
  currentLevel: number,
  amount: number
): { newXp: number; newLevel: number } {
  let xp = currentXp + amount;
  let level = currentLevel;

  while (xp >= xpToNextLevel(level)) {
    xp -= xpToNextLevel(level);
    level += 1;
  }

  return { newXp: xp, newLevel: level };
}
