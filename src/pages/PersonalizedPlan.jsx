import React from "react";

function PersonalizedPlan() {
  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold text-blue-600">
            FITNESS AI
          </p>

          <h1 className="text-3xl font-bold text-gray-900">
            Your Personalized Fitness Plan
          </h1>

          <p className="mt-2 max-w-2xl text-gray-600">
            A routine designed according to your goal, fitness level,
            available time and resources.
          </p>
        </div>

        {/* Plan Content */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">
            Your Plan
          </h2>

          <p className="mt-2 text-gray-600">
            Your personalized fitness recommendations will appear here.
          </p>
        </div>

      </div>
    </div>
  );
}

export default PersonalizedPlan;