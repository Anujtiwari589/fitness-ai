import exercises from "../data/exercises";
import yoga from "../data/yoga";
import pranayama from "../data/pranayama";
import resourceAlternatives from "../data/resourceAlternatives";

// STEP 4: Time Based Exercise Count
function getExerciseCount(availableTime) {
  if (availableTime <= 15) {
    return 2;
  }

  if (availableTime <= 30) {
    return 4;
  }

  if (availableTime <= 45) {
    return 5;
  }

  return 6;
}

// STEP 3 + STEP 5: Exercise Filtering + Resource Adaptation
function filterExercises(userData) {
  const {
  goal,
  fitnessLevel,
  workoutLocation,
  resources = [],
} = userData;

  const suitableExercises = exercises.filter((exercise) => {
  const goalMatch = exercise.goals.includes(goal);
  const levelMatch = exercise.levels.includes(fitnessLevel);
  const locationMatch = exercise.location.includes(workoutLocation);

  return goalMatch && levelMatch && locationMatch;
});

  
  const adaptedExercises = suitableExercises
    .map((exercise) => {
      const requiredEquipment = exercise.equipment;

      // No equipment required
      if (!requiredEquipment || requiredEquipment === "none") {
        return {
          ...exercise,
          originalEquipment: "none",
          alternativeUsed: false,
          alternativeEquipment: null,
        };
      }

      // Required equipment available
      if (resources.includes(requiredEquipment)) {
        return {
          ...exercise,
          originalEquipment: requiredEquipment,
          alternativeUsed: false,
          alternativeEquipment: null,
        };
      }

      // Check alternatives
      const alternatives =
        resourceAlternatives[requiredEquipment] || [];

      const availableAlternative = alternatives.find(
        (alternative) => resources.includes(alternative)
      );

      if (availableAlternative) {
        return {
          ...exercise,
          originalEquipment: requiredEquipment,
          alternativeUsed: true,
          alternativeEquipment: availableAlternative,
        };
      }

      return null;
    })
    .filter(Boolean);

  return adaptedExercises;
}

// STEP 6: Yoga Recommendation
function getYogaRecommendations(userData) {
  const { goal, fitnessLevel } = userData;

  const suitableYoga = yoga.filter((item) => {
    const goalMatch = item.goals.includes(goal);
    const levelMatch = item.levels.includes(fitnessLevel);

    return goalMatch && levelMatch;
  });

  return suitableYoga.slice(0, 2);
}

// STEP 7: Pranayama Recommendation
function getPranayamaRecommendations(userData) {
  const { goal, fitnessLevel } = userData;

  const suitablePranayama = pranayama.filter((item) => {
    const goalMatch = item.goals.includes(goal);
    const levelMatch = item.levels.includes(fitnessLevel);

    return goalMatch && levelMatch;
  });

  return suitablePranayama.slice(0, 1);
}

function getTimeAllocation(availableTime) {
  if (availableTime <= 15) {
    return {
      exercise: 8,
      yoga: 4,
      pranayama: 3,
    };
  }

  if (availableTime <= 30) {
    return {
      exercise: 20,
      yoga: 5,
      pranayama: 5,
    };
  }

  if (availableTime <= 45) {
    return {
      exercise: 30,
      yoga: 10,
      pranayama: 5,
    };
  }

  return {
    exercise: 40,
    yoga: 10,
    pranayama: 10,
  };
}

function fitItemsByDuration(items, maxDuration) {
  let total = 0;
  const selected = [];

  for (const item of items) {
    if (total + item.duration <= maxDuration) {
      selected.push(item);
      total += item.duration;
    }
  }

  return selected;
}
// STEP 8: Generate Final Fitness Plan
function generateFitnessPlan(userData) {
  const {
    goal,
    availableTime,
  } = userData;

  // Get time available for each section
  const allocation = getTimeAllocation(availableTime);

  // Get all suitable recommendations
  const allExercises = filterExercises(userData);
  const allYoga = getYogaRecommendations(userData);
  const allPranayama = getPranayamaRecommendations(userData);

  // Select items according to time limits
  const modernExercises = fitItemsByDuration(
    allExercises,
    allocation.exercise
  );

  const yogaRecommendations = fitItemsByDuration(
    allYoga,
    allocation.yoga
  );

  const pranayamaRecommendations = fitItemsByDuration(
    allPranayama,
    allocation.pranayama
  );

  // Calculate actual duration
  const exerciseDuration = modernExercises.reduce(
    (total, exercise) => total + exercise.duration,
    0
  );

  const yogaDuration = yogaRecommendations.reduce(
    (total, item) => total + item.duration,
    0
  );

  const pranayamaDuration = pranayamaRecommendations.reduce(
    (total, item) => total + item.duration,
    0
  );

  const estimatedDuration =
    exerciseDuration +
    yogaDuration +
    pranayamaDuration;

  // Collect resource alternatives
  const alternatives = modernExercises
    .filter((exercise) => exercise.alternativeUsed)
    .map((exercise) => ({
      exercise: exercise.name,
      originalEquipment: exercise.originalEquipment,
      alternativeEquipment: exercise.alternativeEquipment,
    }));

  return {
    goal,
    modernExercises,
    yoga: yogaRecommendations,
    pranayama: pranayamaRecommendations,
    alternatives,
    estimatedDuration,
  };
}

export {
  filterExercises,
  getTimeAllocation,
  getYogaRecommendations,
  getPranayamaRecommendations,
  generateFitnessPlan,
};