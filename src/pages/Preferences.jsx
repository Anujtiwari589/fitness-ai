import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import PreferenceCard from "../components/PreferenceCard";
import {
  fitnessLevels,
  workoutLocations,
  availableTimes,
} from "../data/preferences";

function Preferences() {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedGoal = location.state?.selectedGoal;

  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const canContinue =
    selectedLevel && selectedLocation && selectedTime;

  const handleContinue = () => {
    if (!canContinue) return;

    const preferences = {
      fitnessLevel: selectedLevel,
      workoutLocation: selectedLocation,
      availableTime: selectedTime,
    };

    navigate("/resources", {
      state: {
        selectedGoal,
        preferences,
      },
    });
  };

  return (
    <div className="min-h-screen bg-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
            Step 2
          </p>

          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Tell Us About Yourself
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            A few simple preferences will help us create a fitness journey
            that fits your routine.
          </p>

          {selectedGoal && (
            <div className="mx-auto mt-5 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
              Goal: {selectedGoal.name}
            </div>
          )}
        </div>

        {/* Fitness Level */}
        <section className="mb-10">
          <h2 className="mb-2 text-xl font-bold text-gray-900">
            What is your fitness level?
          </h2>

          <p className="mb-5 text-sm text-gray-500">
            Choose the option that best describes your current experience.
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            {fitnessLevels.map((option) => (
              <PreferenceCard
                key={option.id}
                option={option}
                selected={selectedLevel?.id === option.id}
                onSelect={setSelectedLevel}
              />
            ))}
          </div>
        </section>

        {/* Workout Location */}
        <section className="mb-10">
          <h2 className="mb-2 text-xl font-bold text-gray-900">
            Where do you prefer to workout?
          </h2>

          <p className="mb-5 text-sm text-gray-500">
            This will help us choose suitable workout options for you.
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            {workoutLocations.map((option) => (
              <PreferenceCard
                key={option.id}
                option={option}
                selected={selectedLocation?.id === option.id}
                onSelect={setSelectedLocation}
              />
            ))}
          </div>
        </section>

        {/* Available Time */}
        <section className="mb-10">
          <h2 className="mb-2 text-xl font-bold text-gray-900">
            How much time can you spend?
          </h2>

          <p className="mb-5 text-sm text-gray-500">
            Select your preferred workout duration per session.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {availableTimes.map((option) => (
              <PreferenceCard
                key={option.id}
                option={option}
                selected={selectedTime?.id === option.id}
                onSelect={setSelectedTime}
              />
            ))}
          </div>
        </section>

        {/* Continue */}
        <div className="flex justify-center border-t border-gray-100 pt-8">
          <button
            type="button"
            disabled={!canContinue}
            onClick={handleContinue}
            className={`rounded-xl px-8 py-3.5 font-semibold transition-all ${
              canContinue
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

export default Preferences;