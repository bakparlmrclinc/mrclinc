export const PD_EARNINGS = {
  aesthetic: {
    base: 250,
    bonus: 100,
    total: 350,
    currency: "EUR",
    bonusCondition: "Patient books within 14 days OR 3+ cases in same month",
  },
  cancer: {
    base: 1000,
    bonus: 200,
    total: 1200,
    currency: "EUR",
    bonusCondition: "Positive clinic feedback on case completion",
  },
  general: {
    base: 1000,
    bonus: 200,
    total: 1200,
    currency: "EUR",
    bonusCondition: "Positive clinic feedback on case completion",
  },
};

export const PAYMENT_SCHEDULE = {
  frequency: "Twice monthly (1st and 15th)",
  method: "Bank transfer",
  currencies: ["EUR", "GBP"] as const,
  processingDays: 3,
};

export const EDUCATION_MODULES = [
  {
    id: 1,
    title: "PD Fundamentals",
    description: "Understanding your role as a Pathway Developer",
    duration: 15,
    questions: 10,
    required: true,
  },
  {
    id: 2,
    title: "Target Hints Masterclass",
    description: "Conflict-free profession targeting strategies",
    duration: 20,
    questions: 10,
    required: true,
    prerequisite: 1,
  },
  {
    id: 3,
    title: "Second Opinion Strategy",
    description: "Leveraging free second opinion for trust building",
    duration: 15,
    questions: 10,
    required: true,
    prerequisite: 1,
  },
  {
    id: 4,
    title: "Compliance & Ethics",
    description: "GDPR, medical boundaries, and ethical conduct",
    duration: 20,
    questions: 12,
    required: true,
    prerequisite: 1,
  },
  {
    id: 5,
    title: "Patient Communication",
    description: "Professional language and expectation management",
    duration: 15,
    questions: 10,
    required: true,
    prerequisite: 1,
  },
];
