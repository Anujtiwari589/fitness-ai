import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getProgress,
  getFitnessLevel,
} from "../utils/progressManager";
import ProgressGraph from "../components/ProgressGraph";

function Progress() {
  const location = useLocation();
  const navigate = useNavigate();

  const [progress, setProgress] = useState(() => getProgress());

  const selectedGoal = location.state?.selectedGoal;
  const earnedXP = location.state?.earnedXP || 0;

  // Reload progress whenever the Progress page is entered again
  useEffect(() => {
    const latestProgress = getProgress();
    setProgress(latestProgress);
  }, [location.key]);

  const fitnessLevel = getFitnessLevel(progress.totalXP);

  const achievements = progress.achievements || [];

  const completionRate =
    progress.totalWorkouts > 0
      ? Math.round(
          (progress.completedWorkouts / progress.totalWorkouts) * 100
        )
      : 0;

  return (
    <div className="min-h-screen bg-white px-4 py-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold text-blue-600">
            FITNESSAI • PROGRESS
          </p>

          <h1 className="text-3xl font-bold text-gray-900">
            Your Fitness Progress
          </h1>

          <p className="mt-2 text-gray-600">
            Track your workouts and stay consistent with your fitness journey.
          </p>
        </div>

        {/* Workout Completed Message */}
        {earnedXP > 0 && (
          <div className="mb-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🎉</span>

              <div>
                <h3 className="font-bold text-gray-900">
                  Workout Completed!
                </h3>

                <p className="text-sm text-gray-600">
                  You earned +{earnedXP} XP from this workout.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Progress Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {/* Completed Workouts */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-xl">
              🏋️
            </div>

            <p className="text-sm font-medium text-gray-500">
              Workouts Completed
            </p>

            <h2 className="mt-1 text-3xl font-bold text-gray-900">
              {progress.completedWorkouts}
            </h2>
          </div>

          {/* Total Workouts */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-xl">
              📅
            </div>

            <p className="text-sm font-medium text-gray-500">
              Total Workouts
            </p>

            <h2 className="mt-1 text-3xl font-bold text-gray-900">
              {progress.totalWorkouts}
            </h2>
          </div>

          {/* Current Streak */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-xl">
              🔥
            </div>

            <p className="text-sm font-medium text-gray-500">
              Current Streak
            </p>

            <h2 className="mt-1 text-3xl font-bold text-gray-900">
              {progress.currentStreak}
              <span className="ml-1 text-base font-medium text-gray-500">
                days
              </span>
            </h2>
          </div>

          {/* Longest Streak */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-xl">
              🏆
            </div>

            <p className="text-sm font-medium text-gray-500">
              Longest Streak
            </p>

            <h2 className="mt-1 text-3xl font-bold text-gray-900">
              {progress.longestStreak}
              <span className="ml-1 text-base font-medium text-gray-500">
                days
              </span>
            </h2>
          </div>

          {/* XP */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-xl">
              ⭐
            </div>

            <p className="text-sm font-medium text-gray-500">
              Total XP
            </p>

            <h2 className="mt-1 text-3xl font-bold text-gray-900">
              {progress.totalXP}
            </h2>
          </div>
        </div>

        {/* Fitness Level */}
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-xl">
            🏆
          </div>

          <p className="text-sm font-medium text-gray-500">
            Fitness Level
          </p>

          <h2 className="mt-1 text-2xl font-bold text-gray-900">
            {fitnessLevel}
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            {progress.totalXP} XP earned
          </p>
        </div>

        {/* Similar Goal Users */}
        <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Compare Your Activity
            </h2>

            <p className="mt-1 text-sm text-gray-600">
              See how other users with similar fitness goals are staying active.
            </p>
          </div>

          <button
            onClick={() =>
              navigate("/similar-users", {
                state: {
                  selectedGoal,
                },
              })
            }
            className="mt-5 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            See Similar Goal Users
          </button>
        </div>

        {/* Main Dashboard */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* Workout Completion */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Workout Progress
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Your overall workout completion.
                </p>
              </div>

              <span className="text-2xl font-bold text-blue-600">
                {completionRate}%
              </span>
            </div>

            <div className="mt-6 h-3 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-blue-600 transition-all duration-500"
                style={{ width: `${completionRate}%` }}
              />
            </div>

            <div className="mt-4 flex justify-between text-sm text-gray-500">
              <span>
                {progress.completedWorkouts} completed
              </span>

              <span>
                {progress.totalWorkouts} total
              </span>
            </div>
          </div>

          {/* Goal */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Current Goal
            </p>

            <h2 className="mt-3 text-2xl font-bold text-gray-900">
              {selectedGoal?.name || "Fitness Journey"}
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Keep following your personalized plan and complete workouts
              regularly to improve your progress.
            </p>

            <button
              onClick={() => navigate("/plan")}
              className="mt-5 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              View Fitness Plan
            </button>
          </div>
        </div>

        {/* Weekly Activity */}
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Weekly Activity
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Track your workout duration throughout the week.
            </p>
          </div>

          <ProgressGraph
            weeklyMinutes={progress.weeklyMinutes}
          />
        </div>

        {/* Achievements */}
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Achievements
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Milestones you have unlocked on your fitness journey.
            </p>
          </div>

          {achievements.length === 0 ? (
            <div className="rounded-xl bg-gray-50 p-6 text-center">
              <p className="text-2xl">🏆</p>

              <p className="mt-2 font-semibold text-gray-800">
                No achievements yet
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Complete your first workout to unlock your first badge.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="rounded-xl border border-blue-100 bg-blue-50 p-5"
                >
                  <div className="text-3xl">
                    {achievement.icon}
                  </div>

                  <h3 className="mt-3 font-bold text-gray-900">
                    {achievement.title}
                  </h3>

                  <p className="mt-1 text-sm text-gray-600">
                    {achievement.description}
                  </p>

                  <div className="mt-3 text-xs font-semibold text-blue-600">
                    ✓ Unlocked
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Back Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => navigate("/")}
            className="rounded-xl border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            Back to Home
          </button>
        </div>

      </div>
    </div>
  );
}

export default Progress;