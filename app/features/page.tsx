'use client'

import { motion } from 'framer-motion'
import Header from '@/components/Header'
import { ArrowRight, Brain, Shield, BarChart3, Zap, Users, Heart } from 'lucide-react'

export default function FeaturesPage() {
  const features = [
    {
      icon: Brain,
      title: 'Advanced AI Emotion Detection',
      description: 'Powered by state-of-the-art machine learning algorithms that analyze voice patterns, pitch, rhythm, and spectral features for accurate emotion recognition.',
      benefits: ['Real-time analysis', 'Context-aware detection', 'Continuous learning']
    },
    {
      icon: Shield,
      title: 'Privacy-First Approach',
      description: 'Your voice data is processed locally and never stored on our servers. All analysis happens in real-time with complete privacy protection.',
      benefits: ['Local processing', 'No data storage', 'End-to-end encryption']
    },
    {
      icon: BarChart3,
      title: 'Comprehensive Mood Tracking',
      description: 'Track your emotional patterns over time with detailed analytics, trends, and insights to better understand your mental wellness journey.',
      benefits: ['Historical data', 'Trend analysis', 'Personalized insights']
    },
    {
      icon: Zap,
      title: 'Real-Time Feedback',
      description: 'Get instant emotion feedback as you speak, with immediate insights and recommendations to help you understand and manage your emotional state.',
      benefits: ['Instant results', 'Live feedback', 'Actionable insights']
    },
    {
      icon: Users,
      title: 'Multi-Platform Support',
      description: 'Access MoodMirror from any device - desktop, tablet, or mobile. Your data syncs seamlessly across all platforms.',
      benefits: ['Cross-platform', 'Cloud sync', 'Offline capability']
    },
    {
      icon: Heart,
      title: 'Wellness Recommendations',
      description: 'Receive personalized recommendations based on your emotional patterns, helping you develop healthier habits and emotional awareness.',
      benefits: ['Personalized tips', 'Wellness guidance', 'Progress tracking']
    }
  ]

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Features
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the powerful capabilities that make MoodMirror the most advanced 
            voice emotion detection platform available.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="emotion-card p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <ul className="space-y-2">
                {feature.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-500">
                    <ArrowRight className="w-4 h-4 mr-2 text-blue-500" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Technology Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Cutting-Edge Technology
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Built with the latest advancements in AI, machine learning, and audio processing.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold text-lg">ML</span>
              </div>
              <h3 className="font-semibold mb-2">Machine Learning</h3>
              <p className="text-sm text-gray-600">Advanced neural networks trained on diverse voice patterns</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-purple-600 font-bold text-lg">AI</span>
              </div>
              <h3 className="font-semibold mb-2">Artificial Intelligence</h3>
              <p className="text-sm text-gray-600">Context-aware emotion analysis with natural language processing</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-green-600 font-bold text-lg">API</span>
              </div>
              <h3 className="font-semibold mb-2">Real-time API</h3>
              <p className="text-sm text-gray-600">Lightning-fast processing with sub-second response times</p>
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Ready to Experience the Future of Emotion Detection?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join thousands of users who are already discovering their emotional patterns 
            and improving their mental wellness with MoodMirror.
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-lg font-semibold">
            Get Started Now
          </button>
        </motion.div>
      </main>
    </div>
  )
}
