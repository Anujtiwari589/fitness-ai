import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoalCard from "../components/GoalCard";
import goals from "../data/goals";

function GoalSelection() {
  const [selectedGoal, setSelectedGoal] = useState(null);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!selectedGoal) return;

    navigate("/preferences", {
      state: {
        selectedGoal,
      },
    });
  };

  return (
    <div className="min-h-screen bg-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
            Step 1
          </p>

          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            What is your fitness goal?
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Choose the goal you want to focus on. Your selection will help us
            create a personalized fitness journey.
          </p>
        </div>

        {/* Goal Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {goals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              selected={selectedGoal?.id === goal.id}
              onSelect={setSelectedGoal}
            />
          ))}
        </div>

        {/* Continue */}
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            disabled={!selectedGoal}
            onClick={handleContinue}
            className={`rounded-xl px-8 py-3 font-semibold transition-all ${
              selectedGoal
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "cursor-not-allowed bg-gray-200 text-gray-400"
            }`}
          >
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
}

export default GoalSelection;