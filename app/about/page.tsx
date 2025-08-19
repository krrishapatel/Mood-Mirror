'use client'

import { motion } from 'framer-motion'
import Header from '@/components/Header'
import { Users, Target, Award, Lightbulb, Heart, Globe, Zap, Shield } from 'lucide-react'

export default function AboutPage() {
  const stats = [
    { number: '10K+', label: 'Active Users', icon: Users },
    { number: '95%', label: 'Accuracy Rate', icon: Target },
    { number: '24/7', label: 'Availability', icon: Zap },
    { number: '100%', label: 'Privacy First', icon: Shield }
  ]

  const team = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Chief AI Scientist',
      bio: 'Leading researcher in emotion recognition with 15+ years in machine learning and computational linguistics.',
      avatar: 'SC'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Head of Engineering',
      bio: 'Full-stack developer and system architect with expertise in real-time audio processing and scalable systems.',
      avatar: 'MR'
    },
    {
      name: 'Dr. Emily Watson',
      role: 'Clinical Psychologist',
      bio: 'Specialist in digital mental health and user experience design for wellness applications.',
      avatar: 'EW'
    },
    {
      name: 'Alex Kim',
      role: 'Product Manager',
      bio: 'Passionate about creating intuitive user experiences and driving product innovation in mental wellness.',
      avatar: 'AK'
    }
  ]

  const values = [
    {
      icon: Heart,
      title: 'Empathy First',
      description: 'We believe technology should understand and support human emotions, not replace them.'
    },
    {
      icon: Shield,
      title: 'Privacy & Security',
      description: 'Your data belongs to you. We process everything locally and never store personal information.'
    },
    {
      icon: Target,
      title: 'Accuracy & Reliability',
      description: 'We continuously improve our AI models to provide the most accurate emotion detection possible.'
    },
    {
      icon: Globe,
      title: 'Accessibility',
      description: 'Mental wellness tools should be available to everyone, regardless of background or location.'
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
            About MoodMirror
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're on a mission to revolutionize mental wellness through advanced AI-powered 
            voice emotion detection, making emotional awareness accessible to everyone.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                At MoodMirror, we believe that understanding our emotions is the first step 
                toward better mental health. Our advanced AI technology provides real-time 
                insights into emotional patterns, helping users develop greater self-awareness 
                and emotional intelligence.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                We're committed to making mental wellness tools accessible, accurate, and 
                privacy-focused. By combining cutting-edge machine learning with user-centered 
                design, we're creating a platform that truly understands and supports your 
                emotional journey.
              </p>
              <div className="flex items-center space-x-4">
                <Lightbulb className="w-8 h-8 text-yellow-500" />
                <span className="text-lg font-semibold text-gray-800">
                  "Technology that understands the human heart"
                </span>
              </div>
            </div>
            <div className="emotion-card p-8 text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Vision 2030</h3>
              <p className="text-gray-600 mb-6">
                To become the world's leading platform for emotional intelligence and mental wellness, 
                helping millions of people understand and manage their emotions effectively.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">1M+</div>
                  <div className="text-gray-500">Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">50+</div>
                  <div className="text-gray-500">Countries</div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Stats Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="emotion-card p-6 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The passionate individuals behind MoodMirror, combining expertise in AI, 
              psychology, engineering, and user experience design.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="emotion-card p-6 text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">{member.avatar}</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{member.name}</h3>
                <p className="text-blue-600 text-sm mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Values Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at MoodMirror.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
                className="emotion-card p-6"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                    <value.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Story Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mb-20"
        >
          <div className="emotion-card p-8 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Story</h2>
              <p className="text-gray-600">
                How MoodMirror came to be and where we're headed.
              </p>
            </div>
            
            <div className="space-y-6 text-gray-600">
              <p>
                MoodMirror was born from a simple observation: while technology has advanced 
                tremendously in understanding human behavior, it often fails to grasp the 
                nuances of human emotion. Our founder, Dr. Sarah Chen, experienced this 
                firsthand when working on AI systems that could recognize faces but couldn't 
                understand the emotions behind them.
              </p>
              <p>
                In 2022, after years of research in emotion recognition and computational 
                linguistics, our team came together with a shared vision: to create technology 
                that truly understands human emotions. We started with voice analysis because 
                the human voice carries rich emotional information that's often overlooked.
              </p>
              <p>
                Today, MoodMirror represents the culmination of that vision - a platform that 
                combines cutting-edge AI with deep understanding of human psychology, all while 
                maintaining the highest standards of privacy and user experience.
              </p>
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Join Us on This Journey
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Whether you're a user, developer, or mental health professional, 
            there's a place for you in the MoodMirror community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold">
              Try MoodMirror
            </button>
            <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300 font-semibold">
              Join Our Team
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
