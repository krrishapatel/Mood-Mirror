export interface EmotionData {
  emotion: EmotionType;
  confidence: number;
  timestamp: Date;
  audioDuration: number;
  userId?: string;
}

export type EmotionType = 
  | 'happy' 
  | 'sad' 
  | 'angry' 
  | 'calm' 
  | 'excited' 
  | 'anxious' 
  | 'neutral' 
  | 'surprised' 
  | 'disgusted' 
  | 'fearful';

export interface EmotionConfig {
  sensitivity: number;
  language: string;
  autoSave: boolean;
  notifications: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  preferences: EmotionConfig;
  createdAt: Date;
  lastActive: Date;
}

export interface EmotionHistory {
  id: string;
  userId: string;
  emotions: EmotionData[];
  date: Date;
  summary: EmotionSummary;
}

export interface EmotionSummary {
  dominantEmotion: EmotionType;
  averageConfidence: number;
  emotionCounts: Record<EmotionType, number>;
  moodTrend: 'improving' | 'declining' | 'stable';
}

export interface VoiceRecording {
  id: string;
  audioBlob: Blob;
  duration: number;
  timestamp: Date;
  emotionData?: EmotionData;
}

export interface EmotionInsight {
  type: 'pattern' | 'trend' | 'recommendation';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  actionable: boolean;
  actionText?: string;
}

export interface RecordingSession {
  id: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  recordings: VoiceRecording[];
  sessionEmotions: EmotionData[];
  sessionSummary?: EmotionSummary;
} 