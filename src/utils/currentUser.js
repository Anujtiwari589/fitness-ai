import { getProgress } from "./progressManager";

function getCurrentUser(goal) {
  const progress = getProgress();

  return {
    name: "You",
    goal,
    workouts: progress.completedWorkouts,
    xp: progress.totalXP,
    streak: progress.currentStreak,
  };
}

export default getCurrentUser;