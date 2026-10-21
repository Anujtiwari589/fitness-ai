import { useLocation, useNavigate } from "react-router-dom";
import resources from "../data/resources";
import { generateFitnessPlan } from "../utils/recommendationEngine";

function Plan() {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedGoal = location.state?.selectedGoal;
  const preferences = location.state?.preferences;
  const selectedResources = location.state?.selectedResources || [];

  const userData = {
    goal: selectedGoal?.id,
    fitnessLevel: preferences?.fitnessLevel?.id,
    workoutLocation: preferences?.workoutLocation?.id,
    availableTime: Number(preferences?.availableTime?.id),
    resources: selectedResources,
  };

  const plan =
    selectedGoal && preferences
      ? generateFitnessPlan(userData)
      : null;

  const handleBack = () => {
    navigate("/resources", {
      state: {
        selectedGoal,
        preferences,
        selectedResources,
      },
    });
  };

  const handleRegenerate = () => {
    navigate("/plan", {
      state: {
        selectedGoal,
        preferences,
        selectedResources,
        regeneratedAt: Date.now(),
      },
    });
  };

  const handleStartWorkout = () => {
    navigate("/workout", {
      state: {
        selectedGoal,
        preferences,
        selectedResources,
        plan,
      },
    });
  };

  return (
    <div className="min-h-screen bg-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
            FITNESS AI
          </p>

          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Your Personalized Fitness Plan
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            A routine created according to your goal, fitness level,
            available time, workout location, and resources.
          </p>
        </div>

        {plan ? (
          <>
            {/* Personalization Summary */}
            <section className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-5">
                <h2 className="text-xl font-bold text-gray-900">
                  Your Fitness Profile
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Your plan is personalized using these preferences.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl bg-blue-50 p-4">
                  <p className="text-sm text-gray-500">
                    Goal
                  </p>

                  <p className="mt-1 font-semibold text-blue-700">
                    {selectedGoal?.name || "Not selected"}
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-sm text-gray-500">
                    Fitness Level
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {preferences?.fitnessLevel?.name || "Not selected"}
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-sm text-gray-500">
                    Workout Location
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {preferences?.workoutLocation?.name || "Not selected"}
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-sm text-gray-500">
                    Available Time
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {preferences?.availableTime?.name || "Not selected"}
                  </p>
                </div>
              </div>
            </section>

            {/* Resources */}
            <section className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  Available Resources
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Equipment available for your workout.
                </p>
              </div>

              {selectedResources.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {selectedResources.map((resourceId) => {
                    const resource = resources.find(
                      (item) => item.id === resourceId
                    );

                    return (
                      <span
                        key={resourceId}
                        className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700"
                      >
                        {resource?.name || resourceId}
                      </span>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  No specific equipment selected.
                </p>
              )}
            </section>

            {/* Duration */}
            <section className="mb-8 rounded-2xl border border-blue-100 bg-blue-50 p-6 text-center">
              <p className="text-sm font-medium text-blue-600">
                Estimated Session Duration
              </p>

              <p className="mt-2 text-4xl font-bold text-blue-700">
                {plan.estimatedDuration} min
              </p>

              <p className="mt-2 text-sm text-gray-600">
                Based on your available time and personalized recommendations.
              </p>
            </section>

            {/* Modern Exercises */}
            <section className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-5">
                <h2 className="text-2xl font-bold text-gray-900">
                  🏋️ Modern Exercises
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Exercises selected according to your goal and fitness level.
                </p>
              </div>

              {plan.modernExercises.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {plan.modernExercises.map((exercise) => (
                    <div
                      key={exercise.id}
                      className="rounded-xl bg-gray-50 p-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {exercise.name}
                          </h3>

                          <p className="mt-1 text-sm capitalize text-gray-500">
                            {exercise.category}
                          </p>
                        </div>

                        <span className="rounded-full bg-white px-3 py-1 text-sm font-medium text-gray-600">
                          {exercise.duration} min
                        </span>
                      </div>

                      {exercise.equipment &&
                        exercise.equipment !== "none" && (
                          <p className="mt-3 text-sm text-gray-600">
                            Equipment:{" "}
                            <span className="font-medium">
                              {resources.find(
                                (resource) =>
                                  resource.id ===
                                  (exercise.alternativeUsed
                                    ? exercise.alternativeEquipment
                                    : exercise.equipment)
                              )?.name ||
                                (exercise.alternativeUsed
                                  ? exercise.alternativeEquipment
                                  : exercise.equipment)}
                            </span>
                          </p>
                        )}

                      {exercise.alternativeUsed && (
                        <div className="mt-3 rounded-lg bg-blue-50 p-3 text-sm text-blue-700">
                          <strong>Resource alternative:</strong>{" "}
                          {resources.find(
                            (resource) =>
                              resource.id === exercise.originalEquipment
                          )?.name || exercise.originalEquipment}{" "}
                          →{" "}
                          {resources.find(
                            (resource) =>
                              resource.id === exercise.alternativeEquipment
                          )?.name || exercise.alternativeEquipment}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  No suitable modern exercises were found for the selected
                  preferences.
                </p>
              )}
            </section>

            {/* Yoga */}
            <section className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-5">
                <h2 className="text-2xl font-bold text-gray-900">
                  🧘 Yoga
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Yoga practices included in your personalized routine.
                </p>
              </div>

              {plan.yoga.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {plan.yoga.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-xl bg-gray-50 p-4"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="font-semibold text-gray-900">
                          {item.name}
                        </h3>

                        <span className="rounded-full bg-white px-3 py-1 text-sm font-medium text-gray-600">
                          {item.duration} min
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  No suitable yoga practice was found.
                </p>
              )}
            </section>

            {/* Pranayama */}
            <section className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-5">
                <h2 className="text-2xl font-bold text-gray-900">
                  🌿 Pranayama
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  A breathing practice included in your session.
                </p>
              </div>

              {plan.pranayama.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {plan.pranayama.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-xl bg-gray-50 p-4"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="font-semibold text-gray-900">
                          {item.name}
                        </h3>

                        <span className="rounded-full bg-white px-3 py-1 text-sm font-medium text-gray-600">
                          {item.duration} min
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  No suitable pranayama practice was found.
                </p>
              )}
            </section>

            {/* Resource Adaptation */}
            {plan.alternatives.length > 0 && (
              <section className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-5">
                  <h2 className="text-2xl font-bold text-gray-900">
                    🔄 Resource Adaptation
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Exercises adapted according to your available resources.
                  </p>
                </div>

                <div className="space-y-3">
                  {plan.alternatives.map((item, index) => (
                    <div
                      key={index}
                      className="rounded-xl bg-gray-50 p-4"
                    >
                      <p className="font-semibold text-gray-900">
                        {item.exercise}
                      </p>

                      <p className="mt-1 text-sm text-gray-600">
                        Required equipment:{" "}
                        {resources.find(
                          (resource) =>
                            resource.id === item.originalEquipment
                        )?.name || item.originalEquipment}
                      </p>

                      <p className="text-sm font-medium text-blue-600">
                        Available alternative:{" "}
                        {resources.find(
                          (resource) =>
                            resource.id === item.alternativeEquipment
                        )?.name || item.alternativeEquipment}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Plan Actions */}
            <section className="mt-10 border-t border-gray-200 pt-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  onClick={handleBack}
                  className="rounded-xl border border-gray-300 px-5 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  ← Back
                </button>

                <div className="flex flex-col gap-3 sm:flex-row">
  <button
    onClick={() => navigate("/research")}
    className="rounded-xl border border-gray-300 px-5 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
  >
    Research & References
  </button>

  <button
    onClick={handleRegenerate}
    className="rounded-xl border border-blue-200 px-5 py-3 font-medium text-blue-700 transition hover:bg-blue-50"
  >
    Regenerate Plan
  </button>

  <button
    onClick={handleStartWorkout}
    className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
  >
    Start Workout →
  </button>
</div>
              </div>
            </section>
          </>
        ) : (
          <div className="rounded-2xl border border-gray-200 p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-900">
              No Fitness Plan Available
            </h2>

            <p className="mt-2 text-gray-600">
              Please complete your goal and preference selection first.
            </p>

            <button
              onClick={() => navigate("/goals")}
              className="mt-5 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Start Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Plan;