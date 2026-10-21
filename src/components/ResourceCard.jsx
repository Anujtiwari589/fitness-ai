function ResourceCard({ resource, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(resource)}
      className={`relative w-full rounded-2xl border-2 p-5 text-left transition-all duration-200 ${
        selected
          ? "border-blue-600 bg-blue-50 shadow-md"
          : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm"
      }`}
    >
      {/* Selection Indicator */}
      <div
        className={`absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full border text-sm font-bold ${
          selected
            ? "border-blue-600 bg-blue-600 text-white"
            : "border-gray-300 bg-white text-transparent"
        }`}
      >
        ✓
      </div>

      {/* Icon */}
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
        {resource.icon}
      </div>

      {/* Content */}
      <h3 className="mt-4 pr-8 text-lg font-semibold text-gray-900">
        {resource.name}
      </h3>

      <p className="mt-2 text-sm leading-6 text-gray-600">
        {resource.description}
      </p>

      {/* Status */}
      <p
        className={`mt-4 text-sm font-medium ${
          selected ? "text-blue-600" : "text-gray-500"
        }`}
      >
        {selected ? "Selected" : "Select"}
      </p>
    </button>
  );
}

export default ResourceCard;