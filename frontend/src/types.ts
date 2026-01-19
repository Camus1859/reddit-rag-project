export interface UserInsight {
  message: string;
  action: "ask_clarification" | "provide_analysis" | "need_more_data";
  followUpOptions?: string[];
  interests?: {
    topic: string;
    confidence: "high" | "medium" | "low";
    evidence: string;
  }[];
  personalityTraits?: {
    trait: string;
    description: string;
  }[];
  speakingStyle?: {
    tone: string;
    vocabulary: string;
    patterns: string[];
  };
  topTopics?: {
    name: string;
    frequency: string;
  }[];
  summary?: string;
}

export interface Message {
  role: "user" | "assistant";
  content: string;
}
