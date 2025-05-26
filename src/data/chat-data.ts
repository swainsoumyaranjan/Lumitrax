export const chatRooms = [
  {
    id: "room-1",
    name: "Climate Action",
    description: "Discuss climate initiatives and sustainability projects",
    avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=50",
    memberCount: 245,
    category: "climate",
    matrixRoomId: "!abcdefghijklmno:matrix.org" // Added Matrix room ID
  },
  {
    id: "room-2",
    name: "Education Access",
    description: "Working to improve education access for all",
    avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=51",
    memberCount: 183,
    category: "education",
    matrixRoomId: "!pqrstuvwxyz12345:matrix.org" // Added Matrix room ID
  },
  {
    id: "room-3",
    name: "Healthcare Equity",
    description: "Discussing healthcare access and equity issues",
    avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=52",
    memberCount: 127,
    category: "healthcare"
  },
  {
    id: "room-4",
    name: "Human Rights",
    description: "Advocating for equality and human rights",
    avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=53",
    memberCount: 209,
    category: "equality"
  },
  {
    id: "room-5",
    name: "Food Security",
    description: "Working to end hunger and improve food access",
    avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=54",
    memberCount: 156,
    category: "poverty"
  },
  {
    id: "room-6",
    name: "Wildlife Protection",
    description: "Protecting endangered species and habitats",
    avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=55",
    memberCount: 178,
    category: "animal_rights"
  },
  {
    id: "room-7",
    name: "Cultural Heritage",
    description: "Preserving and celebrating cultural diversity",
    avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=56",
    memberCount: 132,
    category: "arts_culture"
  }
];

export const chatMessages = [
  {
    id: "msg-1",
    roomId: "room-1",
    sender: {
      id: "user-1",
      name: "Emma Johnson",
      avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=10"
    },
    content: "Has anyone participated in the coastal cleanup initiative last weekend? I'm thinking of joining the next one.",
    timestamp: "2024-05-15T10:30:00Z"
  },
  {
    id: "msg-2",
    roomId: "room-1",
    sender: {
      id: "user-2",
      name: "Miguel Rodriguez",
      avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=11"
    },
    content: "Yes! I was there with a few friends. We collected about 15 bags of plastic waste. It was really eye-opening to see how much trash washes up on our beaches.",
    timestamp: "2024-05-15T10:32:00Z"
  },
  {
    id: "msg-3",
    roomId: "room-1",
    sender: {
      id: "user-3",
      name: "Aisha Patel",
      avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=12"
    },
    content: "I couldn't make it last weekend, but I'm definitely joining the next one. Does anyone know when it's scheduled?",
    timestamp: "2024-05-15T10:35:00Z"
  },
  {
    id: "msg-4",
    roomId: "room-1",
    sender: {
      id: "user-2",
      name: "Miguel Rodriguez",
      avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=11"
    },
    content: "The next one is on June 5th, which is World Environment Day. They're expecting a big turnout!",
    timestamp: "2024-05-15T10:37:00Z"
  },
  {
    id: "msg-5",
    roomId: "room-1",
    sender: {
      id: "user-4",
      name: "James Wilson",
      avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=13"
    },
    content: "Has anyone here implemented any zero-waste practices at home? I'm looking for practical tips to reduce my household waste.",
    timestamp: "2024-05-15T10:40:00Z"
  },
  {
    id: "msg-6",
    roomId: "room-1",
    sender: {
      id: "user-1",
      name: "Emma Johnson",
      avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=10"
    },
    content: "I started composting last year and it's made a huge difference in reducing my trash output. I also switched to reusable produce bags and shop at bulk stores with my own containers.",
    timestamp: "2024-05-15T10:42:00Z"
  },
  {
    id: "msg-7",
    roomId: "room-1",
    sender: {
      id: "user-5",
      name: "Fatima Al-Farsi",
      avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=14"
    },
    content: "I've been making my own cleaning products using vinegar, baking soda, and essential oils. It's cheaper, works just as well, and eliminates so much plastic packaging!",
    timestamp: "2024-05-15T10:45:00Z"
  },
  {
    id: "msg-8",
    roomId: "room-2",
    sender: {
      id: "user-6",
      name: "Chen Wei",
      avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=15"
    },
    content: "I'm working on a project to provide refurbished laptops to students in underserved communities. Does anyone have experience with similar initiatives?",
    timestamp: "2024-05-15T11:00:00Z"
  },
  {
    id: "msg-9",
    roomId: "room-2",
    sender: {
      id: "user-7",
      name: "Sophia Mbeki",
      avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=16"
    },
    content: "That's a great initiative! I worked with a similar program in Cape Town. One challenge we faced was ensuring students had internet access at home. Have you considered that aspect?",
    timestamp: "2024-05-15T11:05:00Z"
  },
  {
    id: "msg-10",
    roomId: "room-3",
    sender: {
      id: "user-8",
      name: "Gabriel Silva",
      avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=17"
    },
    content: "Our community health clinic is looking for volunteer healthcare professionals for our weekend clinics. If anyone is interested or knows someone who might be, please let me know!",
    timestamp: "2024-05-15T11:15:00Z"
  }
];