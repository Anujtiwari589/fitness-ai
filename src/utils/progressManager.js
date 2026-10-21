
function getDateKey(date = new Date()) {
  return date.toISOString().split("T")[0];
}

// Default progress data
const defaultProgress = {
  totalWorkouts: 0,
  completedWorkouts: 0,
  totalXP: 0,
  currentStreak: 0,
  longestStreak: 0,
  lastWorkoutDate: null,
  weeklyMinutes: [0, 0, 0, 0, 0, 0, 0],
  achievements: [],
};

// Get saved progress
export function getProgress() {
  const savedProgress = localStorage.getItem("fitnessProgress");

  if (!savedProgress) {
    return { ...defaultProgress };
  }

  try {
    return {
      ...defaultProgress,
      ...JSON.parse(savedProgress),
    };
  } catch (error) {
    console.error("Failed to read progress:", error);
    return { ...defaultProgress };
  }
}

// Save progress
export function saveProgress(progress) {
  localStorage.setItem(
    "fitnessProgress",
    JSON.stringify(progress)
  );
}

// Update workout streak
export function updateStreak(progress) {
  const today = getDateKey();

  // First workout
  if (!progress.lastWorkoutDate) {
    return {
      ...progress,
      currentStreak: 1,
      longestStreak: Math.max(progress.longestStreak, 1),
      lastWorkoutDate: today,
    };
  }

  // Same day workout
  if (progress.lastWorkoutDate === today) {
    return progress;
  }

  const lastDate = new Date(progress.lastWorkoutDate);
  const currentDate = new Date(today);

  const differenceInTime =
    currentDate.getTime() - lastDate.getTime();

  const differenceInDays =
    Math.floor(
      differenceInTime / (1000 * 60 * 60 * 24)
    );

  // Consecutive day
  if (differenceInDays === 1) {
    const newStreak = progress.currentStreak + 1;

    return {
      ...progress,
      currentStreak: newStreak,
      longestStreak: Math.max(
        progress.longestStreak,
        newStreak
      ),
      lastWorkoutDate: today,
    };
  }

  // Gap between workouts
  return {
    ...progress,
    currentStreak: 1,
    longestStreak: Math.max(
      progress.longestStreak,
      1
    ),
    lastWorkoutDate: today,
  };
}

export function updateAchievements(progress) {
  const achievements = [...(progress.achievements || [])];

  const addAchievement = (id, title, description, icon) => {
    if (!achievements.some((item) => item.id === id)) {
      achievements.push({
        id,
        title,
        description,
        icon,
      });
    }
  };

  // First Workout
  if (progress.completedWorkouts >= 1) {
    addAchievement(
      "first-workout",
      "First Workout",
      "Completed your first workout.",
      "🥇"
    );
  }

  // 3 Day Streak
  if (progress.currentStreak >= 3) {
    addAchievement(
      "three-day-streak",
      "3 Day Streak",
      "Worked out for 3 consecutive days.",
      "🔥"
    );
  }

  // 5 Workouts
  if (progress.completedWorkouts >= 5) {
    addAchievement(
      "five-workouts",
      "5 Workouts",
      "Completed 5 workouts.",
      "🏋️"
    );
  }

  // 100 XP
  if (progress.totalXP >= 100) {
    addAchievement(
      "hundred-xp",
      "100 XP",
      "Earned 100 XP.",
      "⭐"
    );
  }

  return {
    ...progress,
    achievements,
  };
}

export function updateWeeklyMinutes(progress, duration) {
  const today = new Date();
  const dayIndex = (today.getDay() + 6) % 7;

  const weeklyMinutes = [...progress.weeklyMinutes];

  weeklyMinutes[dayIndex] += Number(duration) || 0;

  return {
    ...progress,
    weeklyMinutes,
  };
}

// Calculate XP
export function calculateXP(completedActivities) {
  if (!completedActivities || completedActivities.length === 0) {
    return 0;
  }

  // 10 XP for every completed activity
  return completedActivities.length * 10;
}

// Get fitness level based on XP
export function getFitnessLevel(totalXP) {
  if (totalXP < 100) {
    return "Beginner";
  } else if (totalXP < 300) {
    return "Intermediate";
  } else if (totalXP < 600) {
    return "Advanced";
  } else {
    return "Expert";
  }
}
