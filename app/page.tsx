'use client'

import { useState, useEffect } from 'react'
import VoiceRecorder from '@/components/VoiceRecorder'
import EmotionDisplay from '@/components/EmotionDisplay'
import EmotionDashboard from '@/components/EmotionDashboard'
import Header from '@/components/Header'
import { EmotionData, EmotionType } from '@/types/emotion'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Home() {
  const [currentEmotion, setCurrentEmotion] = useState<EmotionData | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [emotionHistory, setEmotionHistory] = useState<EmotionData[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleEmotionDetected = (emotionData: EmotionData) => {
    setCurrentEmotion(emotionData)
    setEmotionHistory(prev => [...prev, emotionData])
    setIsAnalyzing(false)
  }

  const handleRecordingStart = () => {
    setIsRecording(true)
    setIsAnalyzing(false)
    setCurrentEmotion(null)
  }

  const handleRecordingStop = () => {
    setIsRecording(false)
    setIsAnalyzing(true)
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            MoodMirror
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover your emotional patterns through the power of voice analysis. 
            Speak naturally and get instant insights into your mood.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Voice Recording Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="emotion-card">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                Voice Emotion Detection
              </h2>
              
              <VoiceRecorder
                onRecordingStart={handleRecordingStart}
                onRecordingStop={handleRecordingStop}
                onEmotionDetected={handleEmotionDetected}
                isRecording={isRecording}
                isAnalyzing={isAnalyzing}
              />
            </div>

            {currentEmotion && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <EmotionDisplay emotionData={currentEmotion} />
              </motion.div>
            )}
          </motion.div>

          {/* Emotion Dashboard Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <EmotionDashboard 
              emotionHistory={emotionHistory}
              currentEmotion={currentEmotion}
            />
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Why Choose MoodMirror?
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our advanced AI technology provides accurate emotion detection 
              with real-time feedback and comprehensive mood tracking.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
            <div className="emotion-card text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Analysis</h3>
              <p className="text-gray-600">
                Get instant emotion feedback as you speak with our advanced AI technology.
              </p>
            </div>

            <div className="emotion-card text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Mood Tracking</h3>
              <p className="text-gray-600">
                Track your emotional patterns over time and discover insights about your mood.
              </p>
            </div>

            <div className="emotion-card text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Privacy First</h3>
              <p className="text-gray-600">
                Your voice data is processed locally and never stored on our servers.
              </p>
            </div>
          </div>

          {/* Get Started CTA */}
          <div className="text-center">
            <Link 
              href="/features" 
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-lg font-semibold"
            >
              Learn More About Features
            </Link>
          </div>
        </motion.section>

        {/* Get Started Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Ready to Discover Your Emotional Patterns?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Start your journey to better emotional awareness today. 
              Our advanced AI technology is ready to help you understand your mood better.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => {
                  // Scroll to the voice recording section
                  document.querySelector('.emotion-card')?.scrollIntoView({ 
                    behavior: 'smooth' 
                  })
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-lg font-semibold"
              >
                Start Recording Now
              </button>
              <Link 
                href="/about" 
                className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300 text-lg font-semibold"
              >
                Learn More About Us
              </Link>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  )
} 