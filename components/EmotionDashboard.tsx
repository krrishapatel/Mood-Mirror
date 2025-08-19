'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { EmotionData, EmotionType } from '@/types/emotion'
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Activity,
  PieChart,
  Target
} from 'lucide-react'

interface EmotionDashboardProps {
  emotionHistory: EmotionData[]
  currentEmotion: EmotionData | null
}

export default function EmotionDashboard({ 
  emotionHistory, 
  currentEmotion 
}: EmotionDashboardProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'day' | 'week' | 'month'>('day')

  const emotionStats = useMemo(() => {
    if (emotionHistory.length === 0) return null

    const emotionCounts: Record<EmotionType, number> = {
      happy: 0, sad: 0, angry: 0, calm: 0, excited: 0, anxious: 0, neutral: 0,
      surprised: 0, disgusted: 0, fearful: 0
    }

    const totalConfidence = emotionHistory.reduce((sum, emotion) => sum + emotion.confidence, 0)
    const averageConfidence = totalConfidence / emotionHistory.length

    emotionHistory.forEach(emotion => {
      emotionCounts[emotion.emotion]++
    })

    const dominantEmotion = Object.entries(emotionCounts).reduce((a, b) => 
      emotionCounts[a[0] as EmotionType] > emotionCounts[b[0] as EmotionType] ? a : b
    )[0] as EmotionType

    // Calculate mood trend
    const recentEmotions = emotionHistory.slice(-5)
    const earlyEmotions = emotionHistory.slice(0, 5)
    
    const recentAvg = recentEmotions.reduce((sum, e) => sum + e.confidence, 0) / recentEmotions.length
    const earlyAvg = earlyEmotions.reduce((sum, e) => sum + e.confidence, 0) / earlyEmotions.length
    
    let moodTrend: 'improving' | 'declining' | 'stable' = 'stable'
    if (recentAvg > earlyAvg + 0.1) moodTrend = 'improving'
    else if (recentAvg < earlyAvg - 0.1) moodTrend = 'declining'

    return {
      totalRecordings: emotionHistory.length,
      dominantEmotion,
      averageConfidence,
      emotionCounts,
      moodTrend,
      recentEmotions: emotionHistory.slice(-3)
    }
  }, [emotionHistory])

  const getEmotionColor = (emotion: EmotionType) => {
    const colors = {
      happy: 'bg-emotion-happy',
      sad: 'bg-emotion-sad',
      angry: 'bg-emotion-angry',
      calm: 'bg-emotion-calm',
      excited: 'bg-emotion-excited',
      anxious: 'bg-emotion-anxious',
      neutral: 'bg-emotion-neutral',
      surprised: 'bg-purple-500',
      disgusted: 'bg-green-600',
      fearful: 'bg-red-700'
    }
    return colors[emotion] || 'bg-gray-500'
  }

  const getMoodTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving':
        return <TrendingUp className="w-5 h-5 text-green-600" />
      case 'declining':
        return <TrendingUp className="w-5 h-5 text-red-600 transform rotate-180" />
      default:
        return <Activity className="w-5 h-5 text-blue-600" />
    }
  }

  const getMoodTrendText = (trend: string) => {
    switch (trend) {
      case 'improving':
        return 'Mood is improving'
      case 'declining':
        return 'Mood is declining'
      default:
        return 'Mood is stable'
    }
  }

  if (!emotionStats) {
    return (
      <div className="emotion-card">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center">
          <BarChart3 className="w-6 h-6 mr-2" />
          Emotion Dashboard
        </h2>
        <div className="text-center py-8 text-gray-500">
          <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No emotion data yet</p>
          <p className="text-sm">Start recording to see your emotion insights</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Main Dashboard Card */}
      <div className="emotion-card">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center">
          <BarChart3 className="w-6 h-6 mr-2" />
          Emotion Dashboard
        </h2>

        {/* Timeframe Selector */}
        <div className="flex space-x-2 mb-6">
          {(['day', 'week', 'month'] as const).map((timeframe) => (
            <button
              key={timeframe}
              onClick={() => setSelectedTimeframe(timeframe)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                selectedTimeframe === timeframe
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
            </button>
          ))}
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{emotionStats.totalRecordings}</div>
            <div className="text-sm text-gray-600">Recordings</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {Math.round(emotionStats.averageConfidence * 100)}%
            </div>
            <div className="text-sm text-gray-600">Avg Confidence</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 capitalize">
              {emotionStats.dominantEmotion}
            </div>
            <div className="text-sm text-gray-600">Dominant Mood</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="flex justify-center mb-1">
              {getMoodTrendIcon(emotionStats.moodTrend)}
            </div>
            <div className="text-sm text-gray-600">{getMoodTrendText(emotionStats.moodTrend)}</div>
          </div>
        </div>

        {/* Emotion Distribution */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <PieChart className="w-5 h-5 mr-2" />
            Emotion Distribution
          </h3>
          <div className="space-y-3">
            {Object.entries(emotionStats.emotionCounts)
              .filter(([_, count]) => count > 0)
              .sort(([_, a], [__, b]) => b - a)
              .map(([emotion, count]) => {
                const percentage = (count / emotionStats.totalRecordings) * 100
                return (
                  <div key={emotion} className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${getEmotionColor(emotion as EmotionType)}`} />
                    <span className="flex-1 capitalize">{emotion}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1 }}
                        className={`h-2 rounded-full ${getEmotionColor(emotion as EmotionType)}`}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-12 text-right">
                      {Math.round(percentage)}%
                    </span>
                  </div>
                )
              })}
          </div>
        </div>

        {/* Recent Emotions */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Recent Emotions
          </h3>
          <div className="space-y-2">
            {emotionStats.recentEmotions.map((emotion, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${getEmotionColor(emotion.emotion)}`} />
                  <span className="capitalize font-medium">{emotion.emotion}</span>
                </div>
                <div className="text-sm text-gray-500">
                  {emotion.timestamp.toLocaleTimeString()}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Insights Card */}
      <div className="emotion-card">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Target className="w-5 h-5 mr-2" />
          Insights & Recommendations
        </h3>
        
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
            <h4 className="font-semibold text-blue-800 mb-1">Mood Pattern Detected</h4>
            <p className="text-blue-700 text-sm">
              Your dominant emotion is {emotionStats.dominantEmotion}. 
              {emotionStats.dominantEmotion === 'happy' && ' Keep up the positive energy!'}
              {emotionStats.dominantEmotion === 'sad' && ' Consider talking to someone or doing something you enjoy.'}
              {emotionStats.dominantEmotion === 'anxious' && ' Try some deep breathing exercises or meditation.'}
              {emotionStats.dominantEmotion === 'calm' && ' You seem to be in a good, balanced state.'}
            </p>
          </div>

          <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
            <h4 className="font-semibold text-green-800 mb-1">Confidence Level</h4>
            <p className="text-green-700 text-sm">
              Your emotion detection confidence is {Math.round(emotionStats.averageConfidence * 100)}%. 
              {emotionStats.averageConfidence > 0.8 && ' Excellent! The AI is very confident in detecting your emotions.'}
              {emotionStats.averageConfidence > 0.6 && ' Good! Try speaking more clearly for even better results.'}
              {emotionStats.averageConfidence <= 0.6 && ' Try speaking more clearly and in a quieter environment.'}
            </p>
          </div>

          {emotionStats.moodTrend !== 'stable' && (
            <div className={`p-4 rounded-lg border-l-4 ${
              emotionStats.moodTrend === 'improving' 
                ? 'bg-green-50 border-green-500' 
                : 'bg-yellow-50 border-yellow-500'
            }`}>
              <h4 className={`font-semibold mb-1 ${
                emotionStats.moodTrend === 'improving' ? 'text-green-800' : 'text-yellow-800'
              }`}>
                Mood Trend
              </h4>
              <p className={`text-sm ${
                emotionStats.moodTrend === 'improving' ? 'text-green-700' : 'text-yellow-700'
              }`}>
                {emotionStats.moodTrend === 'improving' 
                  ? 'Great news! Your mood has been improving over time.' 
                  : 'Your mood has been declining. Consider reaching out for support or trying stress-relief activities.'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 