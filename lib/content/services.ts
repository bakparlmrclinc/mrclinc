export const SERVICE_CATEGORIES = {
  aesthetic: {
    title: "Aesthetic Surgery",
    description: "Face, breast, body contouring, and hair restoration procedures",
    icon: "✨",
    earnings: { base: 250, bonus: 100, total: 350 },
    hasSecondOpinion: false,
  },
  cancer: {
    title: "Cancer Surgery",
    description: "Oncological surgery with free second opinion service",
    icon: "🎗️",
    earnings: { base: 1000, bonus: 200, total: 1200 },
    hasSecondOpinion: true,
  },
  general: {
    title: "General Surgery",
    description: "Hepatobiliary, hernia, proctology, and bariatric procedures",
    icon: "🏥",
    earnings: { base: 1000, bonus: 200, total: 1200 },
    hasSecondOpinion: true,
  },
};

export const AESTHETIC_SERVICES = {
  face: {
    title: "Face",
    procedures: [
      "Rhinoplasty (Nose Aesthetics)",
      "Revision Rhinoplasty",
      "Septorhinoplasty",
      "Blepharoplasty (Eyelid Surgery)",
      "Face Lift / Mini Face Lift",
      "Neck Lift",
      "Brow Lift",
      "Otoplasty (Ear Pinning)",
      "Buccal Fat Removal",
      "Chin Surgery (Genioplasty)",
    ],
  },
  breast: {
    title: "Breast",
    procedures: [
      "Breast Augmentation",
      "Breast Lift (Mastopexy)",
      "Breast Reduction",
      "Gynecomastia Surgery",
      "Breast Revision Surgery",
    ],
  },
  body: {
    title: "Body Contouring",
    procedures: [
      "Liposuction",
      "Abdominoplasty (Tummy Tuck)",
      "Mini Abdominoplasty",
      "Brazilian Butt Lift (BBL)",
      "Arm Lift (Brachioplasty)",
      "Thigh Lift",
      "Back/Waist Contouring",
    ],
  },
  hair: {
    title: "Hair Restoration",
    procedures: [
      "Hair Transplant (FUE/DHI)",
      "Beard/Mustache Transplant",
      "Eyebrow Transplant",
    ],
  },
};

export const REQUEST_STATUSES = {
  received: {
    label: "Received",
    description: "We've received your request and are reviewing it.",
    color: "blue",
  },
  processing: {
    label: "Processing",
    description: "Your request is being coordinated with clinics.",
    color: "yellow",
  },
  quotes_sent: {
    label: "Quotes Sent",
    description: "Clinics have sent you quotes. Please check your email.",
    color: "purple",
  },
  in_progress: {
    label: "In Progress",
    description: "You've booked treatment. Preparation in progress.",
    color: "orange",
  },
  completed: {
    label: "Completed",
    description: "Treatment completed successfully.",
    color: "green",
  },
  closed: {
    label: "Closed",
    description: "This case has been closed.",
    color: "gray",
  },
};
