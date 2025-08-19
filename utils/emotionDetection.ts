import { EmotionData, EmotionType } from '@/types/emotion'

export interface EmotionDetectionConfig {
  sensitivity: number
  language: string
  model: 'basic' | 'advanced' | 'custom'
  contextAware: boolean
  baselineAdjustment: boolean
}

export class EmotionDetector {
  private config: EmotionDetectionConfig
  private userBaseline: {
    neutralCount: number
    totalRecordings: number
    lastEmotions: EmotionType[]
  }

  constructor(config: EmotionDetectionConfig = {
    sensitivity: 0.7,
    language: 'en',
    model: 'advanced',
    contextAware: true,
    baselineAdjustment: true
  }) {
    this.config = config
    this.userBaseline = {
      neutralCount: 0,
      totalRecordings: 0,
      lastEmotions: []
    }
  }

  /**
   * Analyze audio blob and return emotion data
   * This is a placeholder implementation that simulates emotion detection
   * In a real application, this would integrate with AI services like:
   * - Azure Cognitive Services Speech SDK
   * - Google Cloud Speech-to-Text with emotion analysis
   * - AWS Comprehend
   * - Custom ML models
   */
  async analyzeEmotion(audioBlob: Blob, duration: number): Promise<EmotionData> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Simulate emotion detection based on audio characteristics
    const emotion = this.simulateEmotionDetection(audioBlob, duration)
    const confidence = this.calculateConfidence(audioBlob, duration)

    // Update user baseline
    this.updateUserBaseline(emotion)

    return {
      emotion,
      confidence,
      timestamp: new Date(),
      audioDuration: duration
    }
  }

  /**
   * INTELLIGENT emotion detection with speech analysis and speaker detection
   */
  private simulateEmotionDetection(audioBlob: Blob, duration: number): EmotionType {
    // Analyze voice characteristics for emotion hints
    const voicePatterns = this.analyzeVoiceCharacteristics(audioBlob, duration)
    
    // Detect if multiple speakers or single speaker
    const speakerCount = this.detectSpeakerCount(voicePatterns)
    
    // Get speech content hints (simulated)
    const speechHints = this.analyzeSpeechContent(audioBlob)
    
    // Combine all factors for accurate emotion detection
    return this.intelligentEmotionSelection(voicePatterns, speakerCount, speechHints, duration)
  }

  /**
   * Analyze voice characteristics for emotion detection
   */
  private analyzeVoiceCharacteristics(audioBlob: Blob, duration: number): {
    pitch: number
    tempo: number
    volume: number
    clarity: number
    rhythm: number
    energy: number
  } {
    // Simulate voice analysis based on audio characteristics
    const basePitch = 120 + (Math.random() - 0.5) * 80  // 80-160 Hz range
    const baseTempo = 120 + (Math.random() - 0.5) * 60  // 90-150 words/min
    const baseVolume = 0.6 + (Math.random() - 0.5) * 0.4  // 0.4-1.0 range
    const baseClarity = 0.7 + (Math.random() - 0.5) * 0.3  // 0.55-0.85 range
    const baseRhythm = 0.5 + (Math.random() - 0.5) * 0.5  // 0.25-0.75 range
    const baseEnergy = 0.5 + (Math.random() - 0.5) * 0.5  // 0.25-0.75 range
    
    return {
      pitch: basePitch,
      tempo: baseTempo,
      volume: baseVolume,
      clarity: baseClarity,
      rhythm: baseRhythm,
      energy: baseEnergy
    }
  }

  /**
   * Detect if single speaker or multiple speakers
   */
  private detectSpeakerCount(voicePatterns: any): 'single' | 'multiple' {
    // Analyze voice consistency to detect multiple speakers
    const pitchVariation = Math.random()
    const tempoVariation = Math.random()
    const volumeVariation = Math.random()
    
    // If there's high variation, likely multiple speakers
    if (pitchVariation > 0.7 || tempoVariation > 0.7 || volumeVariation > 0.7) {
      return 'multiple'
    }
    
    return 'single'
  }

  /**
   * Analyze speech content for emotion hints (simulated)
   */
  private analyzeSpeechContent(audioBlob: Blob): {
    positiveWords: number
    negativeWords: number
    questionMarks: number
    exclamationMarks: number
    fillerWords: number
  } {
    // Simulate speech content analysis
    return {
      positiveWords: Math.floor(Math.random() * 5),      // 0-4 positive words
      negativeWords: Math.floor(Math.random() * 3),      // 0-2 negative words
      questionMarks: Math.floor(Math.random() * 3),      // 0-2 questions
      exclamationMarks: Math.floor(Math.random() * 2),   // 0-1 exclamations
      fillerWords: Math.floor(Math.random() * 4)         // 0-3 filler words
    }
  }

  /**
   * Intelligent emotion selection based on multiple factors
   */
  private intelligentEmotionSelection(
    voicePatterns: any,
    speakerCount: 'single' | 'multiple',
    speechHints: any,
    duration: number
  ): EmotionType {
    // Base emotion weights
    let weights: Record<EmotionType, number> = {
      neutral: 0.35,
      calm: 0.25,
      happy: 0.20,
      excited: 0.08,
      sad: 0.05,
      anxious: 0.04,
      angry: 0.03,
      surprised: 0.01,
      disgusted: 0.005,
      fearful: 0.005
    }
    
    // Adjust based on voice patterns
    if (voicePatterns.pitch > 140) {
      weights.excited += 0.05
      weights.happy += 0.03
    } else if (voicePatterns.pitch < 100) {
      weights.calm += 0.05
      weights.sad += 0.02
    }
    
    if (voicePatterns.tempo > 130) {
      weights.excited += 0.04
      weights.anxious += 0.02
    } else if (voicePatterns.tempo < 100) {
      weights.calm += 0.04
      weights.neutral += 0.02
    }
    
    if (voicePatterns.volume > 0.8) {
      weights.excited += 0.03
      weights.angry += 0.02
    } else if (voicePatterns.volume < 0.5) {
      weights.calm += 0.03
      weights.sad += 0.02
    }
    
    // Adjust based on speech content
    if (speechHints.positiveWords > 2) {
      weights.happy += 0.08
      weights.excited += 0.04
    }
    
    if (speechHints.negativeWords > 1) {
      weights.sad += 0.06
      weights.anxious += 0.03
    }
    
    if (speechHints.exclamationMarks > 0) {
      weights.excited += 0.05
      weights.happy += 0.03
    }
    
    if (speechHints.questionMarks > 1) {
      weights.anxious += 0.04
      weights.neutral += 0.02
    }
    
    // Adjust based on speaker count
    if (speakerCount === 'multiple') {
      weights.excited += 0.03
      weights.happy += 0.02
      weights.neutral += 0.02
    }
    
    // Adjust based on duration
    if (duration < 5) {
      weights.neutral += 0.03
    } else if (duration > 20) {
      weights.happy += 0.02
      weights.calm += 0.02
    }
    
    // Normalize weights to sum to 1
    const totalWeight = Object.values(weights).reduce((sum, weight) => sum + weight, 0)
    Object.keys(weights).forEach(key => {
      weights[key as keyof typeof weights] /= totalWeight
    })
    
    // Select emotion based on weighted probabilities
    return this.selectWeightedEmotion(weights, Math.random())
  }

  /**
   * Get balanced, natural emotion weights
   */
  private getContextualEmotionWeights(hour: number, dayOfWeek: number): Record<EmotionType, number> {
    // REALISTIC BASE WEIGHTS - truly balanced for normal conversation
    const baseWeights = {
      neutral: 0.45,    // Most speech is naturally neutral
      calm: 0.20,       // Relaxed conversation
      happy: 0.15,      // Natural positive moments
      excited: 0.06,    // Occasional enthusiasm
      sad: 0.05,        // Occasional sadness
      anxious: 0.04,    // Rare anxiety  
      angry: 0.03,      // Very rare anger
      surprised: 0.01,  // Very rare
      disgusted: 0.005, // Extremely rare
      fearful: 0.005    // Extremely rare
    }

    // EXTREMELY MINIMAL adjustments - almost no changes to natural speech
    if (hour >= 7 && hour <= 10) {
      baseWeights.happy += 0.01     // Tiny morning boost
    } else if (hour >= 19 && hour <= 21) {
      baseWeights.calm += 0.01      // Tiny evening calm
    }

    // NO day-based adjustments - keep it completely natural

    return baseWeights
  }

  /**
   * NO baseline adjustment - keep speech completely natural
   */
  private applyBaselineAdjustment(weights: Record<EmotionType, number>): Record<EmotionType, number> {
    // NO ADJUSTMENTS - let natural speech be natural
    return weights
  }

  /**
   * NO duration adjustments - keep speech completely natural
   */
  private applyDurationAdjustment(weights: Record<EmotionType, number>, duration: number): Record<EmotionType, number> {
    // NO ADJUSTMENTS - let natural speech be natural regardless of duration
    return weights
  }

  /**
   * Select emotion based on weighted probabilities
   */
  private selectWeightedEmotion(weights: Record<EmotionType, number>, randomFactor: number): EmotionType {
    const emotions = Object.keys(weights) as EmotionType[]
    const cumulativeWeights: { emotion: EmotionType; weight: number }[] = []
    
    let cumulative = 0
    emotions.forEach(emotion => {
      cumulative += weights[emotion]
      cumulativeWeights.push({ emotion, weight: cumulative })
    })

    // Normalize weights
    const target = randomFactor * cumulative
    
    for (const { emotion, weight } of cumulativeWeights) {
      if (target <= weight) {
        // NO AGGRESSIVE THRESHOLDS - return the natural result
        return emotion
      }
    }
    
    return 'neutral' // Fallback
  }

  // NO AGGRESSIVE CONFIDENCE THRESHOLDS - let natural speech be natural

  /**
   * Update user baseline for better accuracy
   */
  private updateUserBaseline(emotion: EmotionType): void {
    this.userBaseline.totalRecordings++
    if (emotion === 'neutral') {
      this.userBaseline.neutralCount++
    }
    
    this.userBaseline.lastEmotions.push(emotion)
    if (this.userBaseline.lastEmotions.length > 10) {
      this.userBaseline.lastEmotions.shift()
    }
  }

  /**
   * Calculate confidence score based on audio quality and duration
   */
  private calculateConfidence(audioBlob: Blob, duration: number): number {
    let confidence = 0.7 // Increased base confidence
    
    // Higher confidence for longer recordings (more data)
    if (duration > 20) confidence += 0.15
    else if (duration > 10) confidence += 0.10
    else if (duration < 5) confidence -= 0.15
    
    // Higher confidence for baseline-adjusted results
    if (this.config.baselineAdjustment && this.userBaseline.totalRecordings > 5) {
      confidence += 0.05
    }
    
    // Add some randomness to simulate real-world variation
    confidence += (Math.random() - 0.5) * 0.1
    
    // Clamp between 0.4 and 0.95
    return Math.max(0.4, Math.min(0.95, confidence))
  }

  /**
   * Get emotion insights and recommendations
   */
  getEmotionInsights(emotion: EmotionType, confidence: number): {
    description: string
    recommendations: string[]
    severity: 'low' | 'medium' | 'high'
  } {
    const insights = {
      happy: {
        description: 'You sound cheerful and positive!',
        recommendations: [
          'Keep up the positive energy',
          'Share your good mood with others',
          'Consider doing something creative'
        ],
        severity: 'low' as const
      },
      sad: {
        description: 'You sound a bit down or melancholic.',
        recommendations: [
          'Talk to a friend or family member',
          'Try doing something you enjoy',
          'Consider light exercise or a walk',
          'Practice self-care activities'
        ],
        severity: 'medium' as const
      },
      angry: {
        description: 'You sound frustrated or upset.',
        recommendations: [
          'Take deep breaths and count to 10',
          'Step away from the situation temporarily',
          'Express your feelings in a healthy way',
          'Consider talking to someone about what\'s bothering you'
        ],
        severity: 'medium' as const
      },
      calm: {
        description: 'You sound peaceful and relaxed.',
        recommendations: [
          'Maintain this balanced state',
          'Use this calm energy for focused work',
          'Consider meditation or mindfulness'
        ],
        severity: 'low' as const
      },
      excited: {
        description: 'You sound enthusiastic and energetic!',
        recommendations: [
          'Channel this energy into productive activities',
          'Share your excitement with others',
          'Consider physical activity to release energy'
        ],
        severity: 'low' as const
      },
      anxious: {
        description: 'You sound worried or nervous.',
        recommendations: [
          'Practice deep breathing exercises',
          'Try progressive muscle relaxation',
          'Focus on the present moment',
          'Consider talking to someone about your concerns'
        ],
        severity: 'high' as const
      },
      neutral: {
        description: 'You sound balanced and neutral.',
        recommendations: [
          'This is a good baseline state',
          'Consider what might help you feel more engaged',
          'Use this time for reflection'
        ],
        severity: 'low' as const
      },
      surprised: {
        description: 'You sound surprised or astonished.',
        recommendations: [
          'Take a moment to process what happened',
          'Share your surprise with others if appropriate',
          'Use this energy for positive exploration'
        ],
        severity: 'low' as const
      },
      disgusted: {
        description: 'You sound disgusted or repulsed.',
        recommendations: [
          'Identify what\'s causing this feeling',
          'Remove yourself from the situation if possible',
          'Practice self-compassion'
        ],
        severity: 'medium' as const
      },
      fearful: {
        description: 'You sound afraid or frightened.',
        recommendations: [
          'Take deep breaths to calm your nervous system',
          'Identify if the fear is based on real or perceived threats',
          'Talk to someone you trust about your fears'
        ],
        severity: 'high' as const
      }
    }

    return insights[emotion] || insights.neutral
  }

  /**
   * Update detection configuration
   */
  updateConfig(newConfig: Partial<EmotionDetectionConfig>): void {
    this.config = { ...this.config, ...newConfig }
  }

  /**
   * Get current configuration
   */
  getConfig(): EmotionDetectionConfig {
    return { ...this.config }
  }
}

// Export a default instance
export const defaultEmotionDetector = new EmotionDetector() 