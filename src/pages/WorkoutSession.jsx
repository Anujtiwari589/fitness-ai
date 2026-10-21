import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  getProgress,
  saveProgress,
  calculateXP,
  updateStreak,
  updateAchievements,
  updateWeeklyMinutes,
} from "../utils/progressManager";

function WorkoutSession() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    selectedGoal,
    preferences,
    selectedResources,
    plan,
  } = location.state || {};

  const [completedActivities, setCompletedActivities] = useState([]);

  // No plan protection
  if (!plan) {
    return (
      <div className="min-h-screen bg-white px-4 py-10">
        <div className="mx-auto max-w-2xl rounded-2xl border border-gray-200 p-8 text-center shadow-sm">
          <div className="text-5xl">🏋️</div>

          <h1 className="mt-4 text-2xl font-bold text-gray-900">
            No Workout Plan Found
          </h1>

          <p className="mt-2 text-gray-500">
            Please generate your personalized fitness plan first.
          </p>

          <button
            onClick={() => navigate("/plan")}
            className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Go to Fitness Plan
          </button>
        </div>
      </div>
    );
  }

  // Combine all activities
  const activities = [
  ...(plan.modernExercises || []).map((item) => ({
    ...item,
    activityId: `modern-${item.id}`,
    type: "Modern Exercise",
    icon: "🏋️",
  })),

  ...(plan.yoga || []).map((item) => ({
    ...item,
    activityId: `yoga-${item.id}`,
    type: "Yoga",
    icon: "🧘",
  })),

  ...(plan.pranayama || []).map((item) => ({
    ...item,
    activityId: `pranayama-${item.id}`,
    type: "Pranayama",
    icon: "🌿",
  })),
];

  const toggleActivity = (activityId) => {
  setCompletedActivities((previous) => {
    if (previous.includes(activityId)) {
      return previous.filter((id) => id !== activityId);
    }

    return [...previous, activityId];
  });
};

  const handleCompleteWorkout = () => {
    if (completedActivities.length === 0) {
      alert("Please complete at least one activity.");
      return;
    }

    const progress = getProgress();

    const selectedActivities = activities.filter((activity) =>
  completedActivities.includes(activity.activityId)
);

    const earnedXP = calculateXP(selectedActivities);

    const workoutDuration = selectedActivities.reduce(
      (total, activity) =>
        total + (Number(activity.duration) || 0),
      0
    );

    const progressWithWorkout = {
      ...progress,
      totalWorkouts: progress.totalWorkouts + 1,
      completedWorkouts: progress.completedWorkouts + 1,
      totalXP: progress.totalXP + earnedXP,
    };

    const progressWithMinutes = updateWeeklyMinutes(
      progressWithWorkout,
      workoutDuration
    );

    const progressWithStreak =
      updateStreak(progressWithMinutes);

    const updatedProgress =
      updateAchievements(progressWithStreak);

    saveProgress(updatedProgress);

    alert(`🎉 Workout Completed! +${earnedXP} XP 🔥`);

    navigate("/progress", {
      state: {
        selectedGoal,
        preferences,
        selectedResources,
        plan,
        workoutCompleted: true,
        completedActivities,
        earnedXP,
      },
    });
  };

  const completionPercentage =
    activities.length > 0
      ? Math.round(
          (completedActivities.length / activities.length) * 100
        )
      : 0;

  return (
    <div className="min-h-screen bg-white px-4 py-8">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            FITNESS AI
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Workout Session
          </h1>

          <p className="mt-2 text-gray-600">
            Complete your planned activities and track your progress.
          </p>
        </div>

        {/* Workout Summary */}
        <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-3">

            <div className="rounded-xl bg-blue-50 p-4">
              <p className="text-sm text-gray-500">
                Goal
              </p>

              <p className="mt-1 font-semibold text-blue-700">
                {selectedGoal?.name || "Fitness"}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">
                Activities
              </p>

              <p className="mt-1 font-semibold text-gray-900">
                {activities.length}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">
                Completed
              </p>

              <p className="mt-1 font-semibold text-gray-900">
                {completedActivities.length}
              </p>
            </div>

          </div>
        </div>

        {/* Progress */}
        <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-gray-900">
                Workout Progress
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {completedActivities.length} of {activities.length} completed
              </p>
            </div>

            <span className="text-xl font-bold text-blue-600">
              {completionPercentage}%
            </span>
          </div>

          <div className="mt-4 h-3 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-blue-600 transition-all"
              style={{
                width: `${completionPercentage}%`,
              }}
            />
          </div>
        </div>

        {/* Activities */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Today's Activities
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Check each activity after completing it.
            </p>
          </div>

          <div className="space-y-4">

            {activities.length === 0 ? (
              <div className="rounded-xl bg-gray-50 p-6 text-center">
                <p className="text-gray-500">
                  No activities found in this plan.
                </p>
              </div>
            ) : (
              activities.map((activity) => {
                const isCompleted =
                completedActivities.includes(activity.activityId);
                return (
                  <button
                    key={activity.activityId}
                    type="button"
                    onClick={() =>
  toggleActivity(activity.activityId)
}
                    className={`w-full rounded-xl border p-4 text-left transition ${
                      isCompleted
                        ? "border-blue-300 bg-blue-50"
                        : "border-gray-200 bg-white hover:border-blue-200 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-4">

                      {/* Checkbox */}
                      <div
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 ${
                          isCompleted
                            ? "border-blue-600 bg-blue-600 text-white"
                            : "border-gray-300 bg-white"
                        }`}
                      >
                        {isCompleted && "✓"}
                      </div>

                      {/* Icon */}
                      <div className="text-2xl">
                        {activity.icon}
                      </div>

                      {/* Details */}
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-gray-900">
                          {activity.name}
                        </h3>

                        <div className="mt-1 flex flex-wrap gap-2 text-xs text-gray-500">
                          <span>
                            {activity.type}
                          </span>

                          {activity.duration && (
                            <span>
                              • {activity.duration} min
                            </span>
                          )}
                        </div>
                      </div>

                      {isCompleted && (
                        <span className="text-sm font-semibold text-blue-600">
                          Done
                        </span>
                      )}

                    </div>
                  </button>
                );
              })
            )}

          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">

          <button
            type="button"
            onClick={() => navigate("/plan")}
            className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50"
          >
            ← Back to Plan
          </button>

          <button
            type="button"
            onClick={handleCompleteWorkout}
            disabled={completedActivities.length === 0}
            className={`rounded-xl px-8 py-3 font-semibold text-white transition ${
              completedActivities.length === 0
                ? "cursor-not-allowed bg-gray-300"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            🎉 Complete Workout
          </button>

        </div>

        {/* Bottom Message */}
        {completedActivities.length === activities.length &&
          activities.length > 0 && (
            <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5 text-center">
              <p className="font-semibold text-blue-800">
                🔥 All activities completed!
              </p>

              <p className="mt-1 text-sm text-blue-600">
                Click "Complete Workout" to save your progress.
              </p>
            </div>
          )}

      </div>
    </div>
  );
}

export default WorkoutSession;