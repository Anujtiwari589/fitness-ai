const researchCategories = [
  {
    id: "modern-exercise",
    title: "Modern Exercise",
    description:
      "Research and guidelines related to physical activity, exercise planning, strength, cardio and fitness.",
    topics: [
      "Strength Training",
      "Cardiorespiratory Fitness",
      "Running & Cardio",
      "Bodyweight Exercises",
      "Physical Activity Guidelines",
    ],
    references: [
      {
        title: "WHO Guidelines on Physical Activity and Sedentary Behaviour",
        organization: "World Health Organization",
        type: "Guideline",
        description:
          "Evidence-based recommendations covering the frequency, intensity and duration of physical activity for different age groups.",
        url: "https://www.who.int/publications/i/item/9789240014886",
      },
      {
        title: "Physical Activity",
        organization: "World Health Organization",
        type: "Reference",
        description:
          "Overview of physical activity, its health benefits and recommended activity levels.",
        url: "https://www.who.int/news-room/fact-sheets/detail/physical-activity",
      },
    ],
  },

  {
    id: "yoga",
    title: "Yoga",
    description:
      "Traditional Yoga practices and modern research related to physical and mental well-being.",
    topics: [
      "Asanas",
      "Flexibility",
      "Mobility",
      "Balance",
      "Traditional Yoga Practice",
    ],
    references: [
      {
        title: "Yoga: Effectiveness and Safety",
        organization:
          "National Center for Complementary and Integrative Health (NCCIH)",
        type: "Research Reference",
        description:
          "Overview of Yoga, its traditional roots, common practices and evidence related to health and well-being.",
        url: "https://www.nccih.nih.gov/health/yoga-effectiveness-and-safety",
      },
      {
        title: "Yoga for Health",
        organization:
          "National Center for Complementary and Integrative Health (NCCIH)",
        type: "Research Digest",
        description:
          "Summary of research on Yoga for health, fitness, stress management and well-being.",
        url: "https://www.nccih.nih.gov/health/providers/digest/yoga-for-health",
      },
    ],
  },

  {
    id: "pranayama",
    title: "Pranayama",
    description:
      "Traditional breathing practices and research related to yogic breathing techniques.",
    topics: [
      "Breathing Practices",
      "Controlled Breathing",
      "Yogic Breathing",
      "Breathing Awareness",
      "Structured Breathing Routines",
    ],
    references: [
      {
        title: "Yogic Breathing Affects Cerebrospinal Fluid Dynamics During Breathing Practice",
        organization: "National Center for Complementary and Integrative Health (NCCIH)",
        type: "Research Study",
        description:
          "Research investigating physiological effects associated with different forms of yogic breathing.",
        url: "https://www.nccih.nih.gov/research/research-results/yogic-breathing-affects-cerebrospinal-fluid-dynamics-during-breathing-practice",
      },
      {
        title: "Relaxation Techniques: What You Need To Know",
        organization:
          "National Center for Complementary and Integrative Health (NCCIH)",
        type: "Reference",
        description:
          "Information about breathing exercises and other relaxation techniques.",
        url: "https://www.nccih.nih.gov/health/relaxation-techniques-what-you-need-to-know",
      },
    ],
  },

  {
    id: "personalized-fitness",
    title: "Personalized Fitness",
    description:
      "Research areas connected with adapting physical activity according to goals, time, resources and individual needs.",
    topics: [
      "Goal-Based Planning",
      "Fitness-Level Adaptation",
      "Time-Based Planning",
      "Resource-Based Adaptation",
      "Progress Tracking",
    ],
    references: [
      {
        title: "WHO Guidelines on Physical Activity and Sedentary Behaviour",
        organization: "World Health Organization",
        type: "Guideline",
        description:
          "Provides recommendations that can help inform activity planning based on age, ability and individual circumstances.",
        url: "https://www.who.int/publications/i/item/9789240014886",
      },
      {
        title: "Physical Activity Fact Sheet",
        organization: "World Health Organization",
        type: "Reference",
        description:
          "Provides an overview of physical activity and ways people can incorporate movement into daily life.",
        url: "https://www.who.int/publications/i/item/WHO-HEP-HPR-RUN-2021.2",
      },
    ],
  },
];

const traditionalReferences = [
  {
    title: "Yoga Sutras of Patanjali",
    author: "Patanjali",
    topic: "Classical Yoga Philosophy",
    type: "Traditional Reference",
  },
];

const featureResearchMapping = [
  {
    feature: "Modern Exercises",
    researchArea: "Exercise & physical activity",
  },
  {
    feature: "Yoga",
    researchArea: "Traditional Yoga practices",
  },
  {
    feature: "Pranayama",
    researchArea: "Traditional breathing practices",
  },
  {
    feature: "Goal-Based Planning",
    researchArea: "Personalized fitness planning",
  },
  {
    feature: "Time-Based Planning",
    researchArea: "Workout planning",
  },
  {
    feature: "Resource Alternatives",
    researchArea: "Exercise adaptation",
  },
  {
    feature: "Progress Tracking",
    researchArea: "Physical activity & adherence",
  },
];

export {
  researchCategories,
  traditionalReferences,
  featureResearchMapping,
};

export default researchCategories;