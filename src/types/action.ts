export interface ActionItem {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  type: "volunteer" | "donate" | "campaign" | "learn" | "event";
  category: "climate" | "education" | "healthcare" | "equality" | "poverty" | "animal_rights" | "arts_culture";
  organizationName: string;
  organizationLogo: string;
  location: string;
  isLocal: boolean;
  requirements?: string[];
  impact?: string;
  deadline?: string;
  actionUrl: string;
  actionLabel?: string;
  featured: boolean;
}

// Add Matrix-related types
export interface MatrixRoom {
  id: string;
  name: string;
  topic?: string;
  avatarUrl?: string;
  memberCount: number;
  isPublic: boolean;
  lastMessage?: {
    sender: string;
    content: string;
    timestamp: string;
  };
}

export interface MatrixMessage {
  id: string;
  roomId: string;
  sender: string;
  content: {
    body: string;
    msgtype: string;
    [key: string]: any;
  };
  timestamp: Date;
}