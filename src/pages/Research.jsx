import {
  researchCategories,
  traditionalReferences,
  featureResearchMapping,
} from "../data/research";

function Research() {
  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-600">
            FitnessAI Research
          </p>

          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Research & References
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-gray-600">
            FitnessAI combines modern fitness practices with traditional Yoga
            and Pranayama approaches to create a personalized fitness
            experience.
          </p>
        </div>

        {/* Research Categories */}
        <section className="mb-14">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Research Categories
            </h2>

            <p className="mt-2 text-gray-600">
              Key research areas connected with the FitnessAI concept.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {researchCategories.map((category) => (
              <div
                key={category.id}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <h3 className="text-xl font-bold text-gray-900">
                  {category.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {category.description}
                </p>

                {/* Topics */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {category.topics.map((topic) => (
                    <span
                      key={topic}
                      className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700"
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                {/* References */}
                <div className="mt-6">
                  <h4 className="mb-3 font-semibold text-gray-900">
                    References
                  </h4>

                  <div className="space-y-4">
                    {category.references.map((reference) => (
                      <div
                        key={reference.title}
                        className="rounded-xl bg-gray-50 p-4"
                      >
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                          <h5 className="font-semibold text-gray-900">
                            {reference.title}
                          </h5>

                          <span className="w-fit rounded-full bg-white px-2.5 py-1 text-xs font-medium text-gray-600">
                            {reference.type}
                          </span>
                        </div>

                        <p className="mt-1 text-sm font-medium text-blue-600">
                          {reference.organization}
                        </p>

                        <p className="mt-2 text-sm leading-6 text-gray-600">
                          {reference.description}
                        </p>

                        <a
                          href={reference.url}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-3 inline-block text-sm font-semibold text-blue-600 hover:text-blue-800"
                        >
                          View Reference →
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Traditional References */}
        <section className="mb-14">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Traditional References
            </h2>

            <p className="mt-2 text-gray-600">
              Classical sources that provide traditional context for the Yoga
              component of FitnessAI.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {traditionalReferences.map((reference) => (
              <div
                key={reference.title}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  {reference.type}
                </span>

                <h3 className="mt-4 text-xl font-bold text-gray-900">
                  {reference.title}
                </h3>

                <p className="mt-2 text-gray-600">
                  <span className="font-medium text-gray-800">Author:</span>{" "}
                  {reference.author}
                </p>

                <p className="mt-1 text-gray-600">
                  <span className="font-medium text-gray-800">Topic:</span>{" "}
                  {reference.topic}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Research → FitnessAI */}
        <section className="mb-14">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Research → FitnessAI
            </h2>

            <p className="mt-2 text-gray-600">
              How the research areas connect with the features implemented in
              FitnessAI.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-200">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-5 py-4 text-sm font-semibold text-gray-900">
                      FitnessAI Feature
                    </th>

                    <th className="px-5 py-4 text-sm font-semibold text-gray-900">
                      Research Area
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {featureResearchMapping.map((item) => (
                    <tr key={item.feature} className="hover:bg-gray-50">
                      <td className="px-5 py-4 text-sm font-medium text-gray-900">
                        {item.feature}
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-600">
                        {item.researchArea}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Research Flow */}
        <section className="rounded-2xl bg-blue-50 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900">
            From Research to Personalized Planning
          </h2>

          <p className="mt-2 max-w-3xl text-gray-600">
            FitnessAI uses these research areas as conceptual references while
            combining user goals, preferences, available resources and time
            constraints.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm font-semibold">
            <span className="rounded-lg bg-white px-4 py-3 text-gray-800 shadow-sm">
              Research
            </span>

            <span className="text-blue-600">→</span>

            <span className="rounded-lg bg-white px-4 py-3 text-gray-800 shadow-sm">
              Exercise Selection
            </span>

            <span className="text-blue-600">→</span>

            <span className="rounded-lg bg-white px-4 py-3 text-gray-800 shadow-sm">
              Yoga & Pranayama
            </span>

            <span className="text-blue-600">→</span>

            <span className="rounded-lg bg-white px-4 py-3 text-gray-800 shadow-sm">
              Personalization
            </span>

            <span className="text-blue-600">→</span>

            <span className="rounded-lg bg-white px-4 py-3 text-gray-800 shadow-sm">
              FitnessAI Plan
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Research;
