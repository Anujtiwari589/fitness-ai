import { useLocation, useNavigate } from "react-router-dom";
import users from "../data/users";
import getSimilarUsers from "../utils/similarUsers";
import getCurrentUser from "../utils/currentUser";
import UserComparisonCard from "../components/UserComparisonCard";

function SimilarUsers() {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedGoal = location.state?.selectedGoal;

  const goal = selectedGoal?.id || selectedGoal;

  const currentUser = getCurrentUser(goal);

  const similarUsers = getSimilarUsers(goal, users);

  return (
    <div className="min-h-screen bg-white px-4 py-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            ← Back
          </button>

          <h1 className="text-3xl font-bold text-gray-900">
            People With Similar Goals
          </h1>

          <p className="mt-2 text-gray-600">
            See how other users with similar fitness goals are staying active.
          </p>
        </div>

        {/* Goal */}
        <div className="mb-8 rounded-2xl border border-blue-200 bg-blue-50 p-5">
          <p className="text-sm font-medium text-blue-600">
            Your Goal
          </p>

          <h2 className="mt-1 text-xl font-semibold capitalize text-gray-900">
            {goal ? goal.replaceAll("_", " ") : "Not selected"}
          </h2>
        </div>

        {/* Current User */}
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Your Activity
          </h2>

          <UserComparisonCard
            user={currentUser}
            isCurrentUser={true}
          />
        </section>

        {/* Similar Users */}
        <section>
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Similar Goal Users
          </h2>

          {similarUsers.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {similarUsers.map((user) => (
                <UserComparisonCard
                  key={user.id}
                  user={user}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 text-center">
              <h3 className="text-lg font-semibold text-gray-800">
                No similar goal users found yet.
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Keep working on your fitness journey. More users may appear
                here in the future.
              </p>
            </div>
          )}
        </section>

        {/* Motivation */}
        <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            Keep Building Your Consistency 💪
          </h2>

          <p className="mt-2 text-gray-600">
            Stay active and keep improving your fitness journey.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SimilarUsers;