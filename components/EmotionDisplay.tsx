'use client'

import { motion } from 'framer-motion'
import { EmotionData, EmotionType } from '@/types/emotion'
import { 
  Smile, 
  Frown, 
  Angry, 
  Heart, 
  Zap, 
  AlertTriangle, 
  Meh,
  TrendingUp,
  Clock
} from 'lucide-react'

interface EmotionDisplayProps {
  emotionData: EmotionData
}

const emotionConfig = {
  happy: {
    icon: Smile,
    color: 'text-emotion-happy',
    bgColor: 'bg-emotion-happy/10',
    borderColor: 'border-emotion-happy/20',
    description: 'You sound cheerful and positive!',
    emoji: '😊'
  },
  sad: {
    icon: Frown,
    color: 'text-emotion-sad',
    bgColor: 'bg-emotion-sad/10',
    borderColor: 'border-emotion-sad/20',
    description: 'You sound a bit down or melancholic.',
    emoji: '😢'
  },
  angry: {
    icon: Angry,
    color: 'text-emotion-angry',
    bgColor: 'bg-emotion-angry/10',
    borderColor: 'border-emotion-angry/20',
    description: 'You sound frustrated or upset.',
    emoji: '😠'
  },
  calm: {
    icon: Heart,
    color: 'text-emotion-calm',
    bgColor: 'bg-emotion-calm/10',
    borderColor: 'border-emotion-calm/20',
    description: 'You sound peaceful and relaxed.',
    emoji: '😌'
  },
  excited: {
    icon: Zap,
    color: 'text-emotion-excited',
    bgColor: 'bg-emotion-excited/10',
    borderColor: 'border-emotion-excited/20',
    description: 'You sound enthusiastic and energetic!',
    emoji: '🤩'
  },
  anxious: {
    icon: AlertTriangle,
    color: 'text-emotion-anxious',
    bgColor: 'bg-emotion-anxious/10',
    borderColor: 'border-emotion-anxious/20',
    description: 'You sound worried or nervous.',
    emoji: '😰'
  },
  neutral: {
    icon: Meh,
    color: 'text-emotion-neutral',
    bgColor: 'bg-emotion-neutral/10',
    borderColor: 'border-emotion-neutral/20',
    description: 'You sound balanced and neutral.',
    emoji: '😐'
  }
}

export default function EmotionDisplay({ emotionData }: EmotionDisplayProps) {
  const config = emotionConfig[emotionData.emotion]
  const IconComponent = config.icon
  const confidencePercentage = Math.round(emotionData.confidence * 100)

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600'
    if (confidence >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getConfidenceLabel = (confidence: number) => {
    if (confidence >= 80) return 'Very Confident'
    if (confidence >= 60) return 'Confident'
    return 'Low Confidence'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`emotion-card ${config.bgColor} ${config.borderColor} border-2`}
    >
      <div className="text-center space-y-4">
        {/* Emotion Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="flex justify-center"
        >
          <div className={`w-20 h-20 ${config.bgColor} rounded-full flex items-center justify-center`}>
            <IconComponent className={`w-10 h-10 ${config.color}`} />
          </div>
        </motion.div>

        {/* Emotion Label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-gray-800 capitalize">
            {emotionData.emotion} {config.emoji}
          </h3>
          <p className="text-gray-600 mt-1">{config.description}</p>
        </motion.div>

        {/* Confidence Score */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-2"
        >
          <div className="flex items-center justify-center space-x-2">
            <TrendingUp className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">Confidence Level</span>
          </div>
          
          <div className="flex items-center justify-center space-x-2">
            <span className={`text-xl font-bold ${getConfidenceColor(confidencePercentage)}`}>
              {confidencePercentage}%
            </span>
            <span className="text-sm text-gray-500">
              ({getConfidenceLabel(confidencePercentage)})
            </span>
          </div>

          {/* Confidence Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${confidencePercentage}%` }}
              transition={{ duration: 1, delay: 0.4 }}
              className={`h-2 rounded-full ${
                confidencePercentage >= 80 ? 'bg-green-500' :
                confidencePercentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
            />
          </div>
        </motion.div>

        {/* Recording Details */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center space-x-4 text-sm text-gray-500"
        >
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{emotionData.audioDuration}s recording</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>•</span>
            <span>{emotionData.timestamp.toLocaleTimeString()}</span>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center space-x-3 pt-4"
        >
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
            Save to Journal
          </button>
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm">
            Share
          </button>
        </motion.div>
      </div>
    </motion.div>
  )
} 