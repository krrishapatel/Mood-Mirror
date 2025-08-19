import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MoodMirror - Voice Emotion Detection',
  description: 'Real-time voice emotion detection and mood tracking platform. Discover your emotional patterns through voice analysis.',
  keywords: ['voice emotion detection', 'mood tracking', 'AI emotion analysis', 'wellness', 'mental health'],
  authors: [{ name: 'MoodMirror Team' }],
  openGraph: {
    title: 'MoodMirror - Voice Emotion Detection',
    description: 'Real-time voice emotion detection and mood tracking platform',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
          {children}
        </div>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
      </body>
    </html>
  )
} 