export const passionCategories = [
  {
    id: "climate",
    name: "Climate & Environment",
    description: "Focus on environmental conservation, climate action, sustainability, and protecting natural resources.",
    icon: "lucide:leaf",
    color: "success",
    relatedTopics: [
      "Renewable Energy", 
      "Conservation", 
      "Sustainable Living", 
      "Ocean Protection", 
      "Climate Policy", 
      "Zero Waste",
      "Biodiversity"
    ]
  },
  {
    id: "education",
    name: "Education & Literacy",
    description: "Work to improve access to quality education, promote literacy, and support lifelong learning opportunities.",
    icon: "lucide:book-open",
    color: "primary",
    relatedTopics: [
      "Early Childhood Education", 
      "Digital Literacy", 
      "Educational Equity", 
      "Teacher Training", 
      "Adult Education",
      "STEM Education",
      "Educational Technology"
    ]
  },
  {
    id: "healthcare",
    name: "Health & Wellbeing",
    description: "Address health challenges, improve healthcare access, promote mental health, and support medical research.",
    icon: "lucide:heart-pulse",
    color: "secondary",
    relatedTopics: [
      "Mental Health", 
      "Public Health", 
      "Healthcare Access", 
      "Disease Prevention", 
      "Maternal Health",
      "Nutrition",
      "Medical Research"
    ]
  },
  {
    id: "equality",
    name: "Equality & Human Rights",
    description: "Advocate for equal rights, fight discrimination, and promote justice for all people regardless of background.",
    icon: "lucide:scale",
    color: "warning",
    relatedTopics: [
      "Gender Equality", 
      "Racial Justice", 
      "LGBTQ+ Rights", 
      "Disability Rights", 
      "Indigenous Rights",
      "Economic Justice",
      "Criminal Justice Reform"
    ]
  },
  {
    id: "poverty",
    name: "Poverty & Economic Development",
    description: "Combat poverty, promote economic opportunity, and build sustainable livelihoods for vulnerable communities.",
    icon: "lucide:home",
    color: "danger",
    relatedTopics: [
      "Homelessness", 
      "Food Security", 
      "Microfinance", 
      "Fair Trade", 
      "Affordable Housing",
      "Job Training",
      "Financial Inclusion"
    ]
  },
  {
    id: "animal_rights",
    name: "Animal Rights & Welfare",
    description: "Protect animals from cruelty, conserve wildlife, and promote ethical treatment of all living creatures.",
    icon: "lucide:paw-print",
    color: "primary",
    relatedTopics: [
      "Wildlife Conservation", 
      "Animal Rescue", 
      "Anti-Poaching", 
      "Humane Farming", 
      "Marine Life Protection",
      "Pet Adoption",
      "Animal Testing Alternatives"
    ]
  },
  {
    id: "arts_culture",
    name: "Arts & Cultural Preservation",
    description: "Support artistic expression, preserve cultural heritage, and ensure access to arts and cultural education.",
    icon: "lucide:palette",
    color: "secondary",
    relatedTopics: [
      "Cultural Heritage", 
      "Arts Education", 
      "Indigenous Culture", 
      "Community Arts", 
      "Museum Access",
      "Music Programs",
      "Historical Preservation"
    ]
  }
];

export const quizQuestions = [
  {
    id: "q1",
    question: "Which of these issues concerns you the most?",
    options: [
      {
        id: "q1a",
        text: "Climate change and environmental degradation",
        categories: ["climate"],
        weight: 10
      },
      {
        id: "q1b",
        text: "Lack of access to quality education",
        categories: ["education"],
        weight: 10
      },
      {
        id: "q1c",
        text: "Healthcare disparities and public health challenges",
        categories: ["healthcare"],
        weight: 10
      },
      {
        id: "q1d",
        text: "Social inequality and discrimination",
        categories: ["equality"],
        weight: 10
      },
      {
        id: "q1e",
        text: "Poverty and economic hardship",
        categories: ["poverty"],
        weight: 10
      }
    ]
  },
  {
    id: "q2",
    question: "How would you prefer to contribute to a cause?",
    options: [
      {
        id: "q2a",
        text: "Educating others and raising awareness",
        categories: ["education", "climate"],
        weight: 8
      },
      {
        id: "q2b",
        text: "Direct service and hands-on volunteering",
        categories: ["healthcare", "poverty"],
        weight: 8
      },
      {
        id: "q2c",
        text: "Advocacy and policy change",
        categories: ["equality", "climate"],
        weight: 8
      },
      {
        id: "q2d",
        text: "Donating money or resources",
        categories: ["poverty", "healthcare"],
        weight: 8
      },
      {
        id: "q2e",
        text: "Creating art or media to inspire action",
        categories: ["arts_culture", "equality"],
        weight: 8
      }
    ]
  },
  {
    id: "q3",
    question: "Which of these activities do you enjoy most?",
    options: [
      {
        id: "q3a",
        text: "Spending time in nature",
        categories: ["climate", "animal_rights"],
        weight: 7
      },
      {
        id: "q3b",
        text: "Teaching or mentoring others",
        categories: ["education"],
        weight: 7
      },
      {
        id: "q3c",
        text: "Caring for people's wellbeing",
        categories: ["healthcare"],
        weight: 7
      },
      {
        id: "q3d",
        text: "Engaging in community organizing",
        categories: ["equality", "poverty"],
        weight: 7
      },
      {
        id: "q3e",
        text: "Creating or appreciating art and culture",
        categories: ["arts_culture"],
        weight: 7
      }
    ]
  },
  {
    id: "q4",
    question: "What news topics do you find yourself most drawn to?",
    options: [
      {
        id: "q4a",
        text: "Environmental issues and climate science",
        categories: ["climate"],
        weight: 6
      },
      {
        id: "q4b",
        text: "Social justice and human rights",
        categories: ["equality"],
        weight: 6
      },
      {
        id: "q4c",
        text: "Public health and medical breakthroughs",
        categories: ["healthcare"],
        weight: 6
      },
      {
        id: "q4d",
        text: "Economic inequality and development",
        categories: ["poverty"],
        weight: 6
      },
      {
        id: "q4e",
        text: "Arts, culture, and heritage preservation",
        categories: ["arts_culture"],
        weight: 6
      }
    ]
  },
  {
    id: "q5",
    question: "Which of these skills do you have or would like to develop?",
    options: [
      {
        id: "q5a",
        text: "Scientific research and data analysis",
        categories: ["climate", "healthcare"],
        weight: 5
      },
      {
        id: "q5b",
        text: "Teaching and communication",
        categories: ["education"],
        weight: 5
      },
      {
        id: "q5c",
        text: "Caregiving and support services",
        categories: ["healthcare", "poverty"],
        weight: 5
      },
      {
        id: "q5d",
        text: "Advocacy and public speaking",
        categories: ["equality", "animal_rights"],
        weight: 5
      },
      {
        id: "q5e",
        text: "Creative expression and storytelling",
        categories: ["arts_culture", "education"],
        weight: 5
      }
    ]
  },
  {
    id: "q6",
    question: "What type of change would you most like to see in the world?",
    options: [
      {
        id: "q6a",
        text: "A sustainable relationship with our planet",
        categories: ["climate", "animal_rights"],
        weight: 9
      },
      {
        id: "q6b",
        text: "Equal opportunities for all people",
        categories: ["education", "equality"],
        weight: 9
      },
      {
        id: "q6c",
        text: "Better health and wellbeing for everyone",
        categories: ["healthcare"],
        weight: 9
      },
      {
        id: "q6d",
        text: "End to poverty and economic hardship",
        categories: ["poverty"],
        weight: 9
      },
      {
        id: "q6e",
        text: "Preservation of diverse cultures and expressions",
        categories: ["arts_culture"],
        weight: 9
      }
    ]
  },
  {
    id: "q7",
    question: "Which of these quotes resonates with you most?",
    options: [
      {
        id: "q7a",
        text: "\"We do not inherit the earth from our ancestors; we borrow it from our children.\"",
        categories: ["climate"],
        weight: 4
      },
      {
        id: "q7b",
        text: "\"Education is the most powerful weapon which you can use to change the world.\"",
        categories: ["education"],
        weight: 4
      },
      {
        id: "q7c",
        text: "\"The greatest wealth is health.\"",
        categories: ["healthcare"],
        weight: 4
      },
      {
        id: "q7d",
        text: "\"Injustice anywhere is a threat to justice everywhere.\"",
        categories: ["equality"],
        weight: 4
      },
      {
        id: "q7e",
        text: "\"Overcoming poverty is not a gesture of charity. It is an act of justice.\"",
        categories: ["poverty"],
        weight: 4
      }
    ]
  },
  {
    id: "q8",
    question: "What aspect of community life do you value most?",
    options: [
      {
        id: "q8a",
        text: "Clean, green spaces and sustainable practices",
        categories: ["climate"],
        weight: 6
      },
      {
        id: "q8b",
        text: "Strong educational institutions and learning opportunities",
        categories: ["education"],
        weight: 6
      },
      {
        id: "q8c",
        text: "Accessible healthcare and wellness resources",
        categories: ["healthcare"],
        weight: 6
      },
      {
        id: "q8d",
        text: "Diversity, inclusion, and equal treatment",
        categories: ["equality"],
        weight: 6
      },
      {
        id: "q8e",
        text: "Economic opportunity and support for those in need",
        categories: ["poverty"],
        weight: 6
      }
    ]
  },
  {
    id: "q9",
    question: "Which of these would you be most likely to donate to?",
    options: [
      {
        id: "q9a",
        text: "Environmental conservation organization",
        categories: ["climate", "animal_rights"],
        weight: 7
      },
      {
        id: "q9b",
        text: "Educational scholarship fund",
        categories: ["education"],
        weight: 7
      },
      {
        id: "q9c",
        text: "Medical research or healthcare access initiative",
        categories: ["healthcare"],
        weight: 7
      },
      {
        id: "q9d",
        text: "Human rights organization",
        categories: ["equality"],
        weight: 7
      },
      {
        id: "q9e",
        text: "Homeless shelter or food bank",
        categories: ["poverty"],
        weight: 7
      }
    ]
  },
  {
    id: "q10",
    question: "What kind of future do you most want to help create?",
    options: [
      {
        id: "q10a",
        text: "One where humans live in harmony with nature",
        categories: ["climate", "animal_rights"],
        weight: 10
      },
      {
        id: "q10b",
        text: "One where everyone has access to quality education",
        categories: ["education"],
        weight: 10
      },
      {
        id: "q10c",
        text: "One where healthcare is a right, not a privilege",
        categories: ["healthcare"],
        weight: 10
      },
      {
        id: "q10d",
        text: "One where all people are treated with dignity and respect",
        categories: ["equality"],
        weight: 10
      },
      {
        id: "q10e",
        text: "One where no one lives in poverty or economic insecurity",
        categories: ["poverty"],
        weight: 10
      }
    ]
  }
];