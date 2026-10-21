function UserComparisonCard({ user, isCurrentUser = false }) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        isCurrentUser
          ? "border-blue-500 bg-blue-50"
          : "border-gray-200 bg-white"
      }`}
    >
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {user.name}
        </h3>

        {isCurrentUser && (
          <span className="text-sm font-medium text-blue-600">
            You
          </span>
        )}
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-500">Goal</p>
        <p className="font-medium text-gray-800">
          {user.goal.replaceAll("_", " ")}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl bg-gray-50 p-3 text-center">
          <p className="text-xl font-bold text-blue-600">
            {user.workouts}
          </p>
          <p className="text-xs text-gray-500">
            Workouts
          </p>
        </div>

        <div className="rounded-xl bg-gray-50 p-3 text-center">
          <p className="text-xl font-bold text-blue-600">
            {user.xp}
          </p>
          <p className="text-xs text-gray-500">
            XP
          </p>
        </div>

        <div className="rounded-xl bg-gray-50 p-3 text-center">
          <p className="text-xl font-bold text-blue-600">
            🔥 {user.streak}
          </p>
          <p className="text-xs text-gray-500">
            Day Streak
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserComparisonCard;