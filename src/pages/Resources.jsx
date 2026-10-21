import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import ResourceCard from "../components/ResourceCard";
import resources from "../data/resources.js";

function Resources() {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedGoal = location.state?.selectedGoal;
  const preferences = location.state?.preferences;

  const [selectedResources, setSelectedResources] = useState([]);

  const handleResourceSelect = (resource) => {
    setSelectedResources((currentResources) => {
      // No Equipment is a special option
      if (resource.id === "no_equipment") {
        if (currentResources.includes("no_equipment")) {
          return [];
        }

        return ["no_equipment"];
      }

      // If No Equipment was selected, remove it
      const withoutNoEquipment = currentResources.filter(
        (id) => id !== "no_equipment"
      );

      // Toggle resource
      if (withoutNoEquipment.includes(resource.id)) {
        return withoutNoEquipment.filter((id) => id !== resource.id);
      }

      return [...withoutNoEquipment, resource.id];
    });
  };

  const handleContinue = () => {
    if (selectedResources.length === 0) return;

    navigate("/plan", {
      state: {
        selectedGoal,
        preferences,
        selectedResources,
      },
    });
  };

  const canContinue = selectedResources.length > 0;

  return (
    <div className="min-h-screen bg-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
            Step 3
          </p>

          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            What resources do you have?
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Select the equipment or everyday items available to you. We'll
            adapt your fitness plan accordingly.
          </p>

          {selectedGoal && (
            <div className="mt-5 inline-flex items-center rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
              Goal: {selectedGoal.name}
            </div>
          )}
        </div>

        {/* Resource Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              selected={selectedResources.includes(resource.id)}
              onSelect={handleResourceSelect}
            />
          ))}
        </div>

        {/* Selected Count */}
        <div className="mt-8 text-center">
          {selectedResources.length > 0 && (
            <p className="text-sm font-medium text-gray-600">
              {selectedResources.length}{" "}
              {selectedResources.length === 1
                ? "resource"
                : "resources"}{" "}
              selected
            </p>
          )}
        </div>

        {/* Continue */}
        <div className="mt-6 flex justify-center border-t border-gray-100 pt-8">
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

export default Resources;