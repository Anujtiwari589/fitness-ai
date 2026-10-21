import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <main className="flex min-h-screen items-center justify-center px-6 py-12">
        <div className="w-full max-w-5xl">
          <div className="text-center">
            {/* Logo */}
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-bold text-white shadow-sm">
              F
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              FitnessAI
            </h1>

            <p className="mt-4 text-lg font-medium text-blue-600 sm:text-xl">
              Personalized Fitness. Traditional Wisdom. Smarter Planning.
            </p>

            {/* Description */}
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-600">
              Build a fitness journey tailored to your goals by combining
              modern exercise, yoga, pranayama, and personalized planning.
            </p>

            {/* Feature Cards */}
            <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-4">
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <div className="text-2xl">🏋️</div>
                <h3 className="mt-3 font-semibold text-gray-900">
                  Modern Exercise
                </h3>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <div className="text-2xl">🧘</div>
                <h3 className="mt-3 font-semibold text-gray-900">Yoga</h3>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <div className="text-2xl">🌿</div>
                <h3 className="mt-3 font-semibold text-gray-900">
                  Pranayama
                </h3>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <div className="text-2xl">🎯</div>
                <h3 className="mt-3 font-semibold text-gray-900">
                  Personalized
                </h3>
              </div>
            </div>

            {/* CTA */}
            <button
              type="button"
              onClick={() => navigate("/goals")}
              className="mt-10 rounded-xl bg-blue-600 px-8 py-3.5 font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              Start Your Fitness Journey →
            </button>

            <button
  type="button"
  onClick={() => navigate("/research")}
  className="mt-4 rounded-xl border border-gray-300 px-8 py-3.5 font-semibold text-gray-700 transition hover:bg-gray-50"
>
  Explore Research & References →
</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;