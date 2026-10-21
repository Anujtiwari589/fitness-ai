function GoalCard({ goal, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(goal)}
      className={`w-full rounded-2xl border-2 p-6 text-left transition-all duration-200 ${
        selected
          ? "border-blue-600 bg-blue-50 shadow-md"
          : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm"
      }`}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
        {goal.icon}
      </div>

      <h3 className="text-lg font-semibold text-gray-900">
        {goal.name}
      </h3>

      <p className="mt-2 text-sm leading-6 text-gray-600">
        {goal.description}
      </p>

      <div className="mt-5 flex items-center justify-between">
        <span
          className={`text-sm font-medium ${
            selected ? "text-blue-600" : "text-gray-500"
          }`}
        >
          {selected ? "Selected" : "Select Goal"}
        </span>

        {selected && (
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-sm text-white">
            ✓
          </span>
        )}
      </div>
    </button>
  );
}

export default GoalCard;