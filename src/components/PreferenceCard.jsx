function PreferenceCard({ option, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(option)}
      className={`w-full rounded-2xl border-2 p-5 text-left transition-all duration-200 ${
        selected
          ? "border-blue-600 bg-blue-50 shadow-md"
          : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-xl">
          {option.icon}
        </div>

        {selected && (
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-sm text-white">
            ✓
          </span>
        )}
      </div>

      <h3 className="mt-4 text-lg font-semibold text-gray-900">
        {option.name}
      </h3>

      <p className="mt-2 text-sm leading-6 text-gray-600">
        {option.description}
      </p>
    </button>
  );
}

export default PreferenceCard;