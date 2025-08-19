'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mic, MicOff, Square, Play, Pause } from 'lucide-react'
import { EmotionData } from '@/types/emotion'
import toast from 'react-hot-toast'

interface VoiceRecorderProps {
  onRecordingStart: () => void
  onRecordingStop: () => void
  onEmotionDetected: (emotionData: EmotionData) => void
  isRecording: boolean
  isAnalyzing: boolean
}

export default function VoiceRecorder({
  onRecordingStart,
  onRecordingStop,
  onEmotionDetected,
  isRecording,
  isAnalyzing
}: VoiceRecorderProps) {
  const [isMicAvailable, setIsMicAvailable] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [audioLevel, setAudioLevel] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null)
  const animationFrameRef = useRef<number>()
  const timerRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    checkMicrophonePermission()
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  const checkMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      setIsMicAvailable(true)
      stream.getTracks().forEach(track => track.stop())
    } catch (error) {
      console.error('Microphone permission denied:', error)
      setIsMicAvailable(false)
      toast.error('Microphone access is required for emotion detection')
    }
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      })

      // Set up audio analysis
      audioContextRef.current = new AudioContext()
      analyserRef.current = audioContextRef.current.createAnalyser()
      analyserRef.current.fftSize = 256
      
      microphoneRef.current = audioContextRef.current.createMediaStreamSource(stream)
      microphoneRef.current.connect(analyserRef.current)

      // Start audio level monitoring
      updateAudioLevel()

      // Set up MediaRecorder
      mediaRecorderRef.current = new MediaRecorder(stream)
      audioChunksRef.current = []

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data)
      }

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' })
        await analyzeEmotion(audioBlob)
      }

      // Start recording
      mediaRecorderRef.current.start()
      onRecordingStart()

      // Start timer
      setRecordingTime(0)
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1)
      }, 1000)

    } catch (error) {
      console.error('Error starting recording:', error)
      toast.error('Failed to start recording. Please check microphone permissions.')
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop()
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop())
    }

    if (microphoneRef.current) {
      microphoneRef.current.disconnect()
    }

    if (audioContextRef.current) {
      audioContextRef.current.close()
    }

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }

    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    setAudioLevel(0)
    onRecordingStop()
  }

  const updateAudioLevel = () => {
    if (!analyserRef.current) return

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount)
    analyserRef.current.getByteFrequencyData(dataArray)

    const average = dataArray.reduce((a, b) => a + b) / dataArray.length
    setAudioLevel(average)

    animationFrameRef.current = requestAnimationFrame(updateAudioLevel)
  }

  const analyzeEmotion = async (audioBlob: Blob) => {
    // Simulate emotion detection - in a real app, this would call an AI service
    const emotions = ['happy', 'sad', 'angry', 'calm', 'excited', 'anxious', 'neutral'] as const
    const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)]
    const confidence = Math.random() * 0.4 + 0.6 // 60-100% confidence

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    const emotionData: EmotionData = {
      emotion: randomEmotion,
      confidence,
      timestamp: new Date(),
      audioDuration: recordingTime
    }

    onEmotionDetected(emotionData)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  if (!isMicAvailable) {
    return (
      <div className="text-center py-8">
        <MicOff className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <p className="text-gray-600 mb-4">Microphone access is required</p>
        <button
          onClick={checkMicrophonePermission}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Enable Microphone
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Recording Status */}
      <div className="text-center">
        {isRecording && (
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="inline-block"
          >
            <div className="w-4 h-4 bg-red-500 rounded-full recording-pulse"></div>
          </motion.div>
        )}
        <p className="text-sm text-gray-600 mt-2">
          {isRecording ? 'Recording...' : isAnalyzing ? 'Analyzing emotion...' : 'Ready to record'}
        </p>
      </div>

      {/* Audio Level Visualization */}
      {isRecording && (
        <div className="flex justify-center items-end space-x-1 h-20">
          {Array.from({ length: 20 }, (_, i) => (
            <motion.div
              key={i}
              animate={{
                height: Math.max(4, (audioLevel / 255) * 60 * Math.random())
              }}
              transition={{ duration: 0.1 }}
              className="w-1 bg-gradient-to-t from-blue-500 to-purple-600 rounded-full"
            />
          ))}
        </div>
      )}

      {/* Recording Timer */}
      {isRecording && (
        <div className="text-center">
          <span className="text-2xl font-mono font-bold text-gray-800">
            {formatTime(recordingTime)}
          </span>
        </div>
      )}

      {/* Control Buttons */}
      <div className="flex justify-center space-x-4">
        {!isRecording ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startRecording}
            disabled={isAnalyzing}
            className="bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white p-4 rounded-full transition-colors"
          >
            <Mic className="w-6 h-6" />
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={stopRecording}
            className="bg-gray-500 hover:bg-gray-600 text-white p-4 rounded-full transition-colors"
          >
            <Square className="w-6 h-6" />
          </motion.button>
        )}
      </div>

      {/* Instructions */}
      <div className="text-center text-sm text-gray-600">
        <p>Click the microphone to start recording</p>
        <p>Speak naturally for best emotion detection</p>
        <p>Recording will automatically analyze your voice</p>
      </div>
    </div>
  )
} 