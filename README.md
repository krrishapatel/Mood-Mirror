# MoodMirror - Voice Emotion Detection Platform

A real-time voice emotion detection and mood tracking web application that analyzes your voice to detect emotions and provide insights into your emotional patterns.

## 🌟 Features

### Core Functionality
- **Real-time Voice Recording**: Capture audio through your microphone with visual feedback
- **Emotion Detection**: AI-powered analysis of voice patterns to detect emotions
- **Confidence Scoring**: Shows how confident the AI is in its emotion detection
- **Mood Tracking**: Historical tracking of your emotional patterns over time
- **Visual Feedback**: Beautiful animations and visual indicators for emotions

### Emotion Types Detected
- 😊 Happy - Cheerful and positive
- 😢 Sad - Down or melancholic
- 😠 Angry - Frustrated or upset
- 😌 Calm - Peaceful and relaxed
- 🤩 Excited - Enthusiastic and energetic
- 😰 Anxious - Worried or nervous
- 😐 Neutral - Balanced and neutral

### Dashboard Features
- **Emotion Distribution**: Visual breakdown of detected emotions
- **Mood Trends**: Track if your mood is improving, declining, or stable
- **Confidence Analytics**: Monitor the accuracy of emotion detection
- **Recent History**: Quick view of your latest emotion recordings
- **Insights & Recommendations**: Personalized suggestions based on your patterns

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- Modern web browser with microphone support
- HTTPS connection (required for microphone access)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd moodmirror-voice-emotion
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### First Time Setup
1. Allow microphone permissions when prompted
2. Click the microphone button to start recording
3. Speak naturally for 10-30 seconds
4. View your emotion analysis results
5. Explore the dashboard for insights

## 🛠️ Technical Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons

### Audio Processing
- **Web Audio API** - Real-time audio capture and analysis
- **MediaRecorder API** - Audio recording functionality
- **AudioContext** - Audio processing and visualization

### State Management
- **React Hooks** - Local state management
- **Zustand** - Global state (planned for future features)

## 📁 Project Structure

```
moodmirror-voice-emotion/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page
├── components/            # React components
│   ├── Header.tsx         # Navigation header
│   ├── VoiceRecorder.tsx  # Audio recording interface
│   ├── EmotionDisplay.tsx # Emotion results display
│   └── EmotionDashboard.tsx # Analytics dashboard
├── types/                 # TypeScript type definitions
│   └── emotion.ts         # Emotion-related types
├── public/               # Static assets
└── package.json          # Dependencies and scripts
```

## 🎯 Core Components

### VoiceRecorder
- Handles microphone permissions
- Real-time audio capture
- Audio level visualization
- Recording timer
- Emotion analysis trigger

### EmotionDisplay
- Shows detected emotion with icons
- Confidence score visualization
- Recording metadata
- Action buttons (save, share)

### EmotionDashboard
- Emotion statistics and trends
- Historical data visualization
- Insights and recommendations
- Time-based filtering

## 🔮 Future Enhancements

### Planned Features
- **User Authentication**: Personal accounts and data persistence
- **Advanced Analytics**: Detailed emotion pattern analysis
- **Social Features**: Share emotions with friends
- **Wellness Integration**: Meditation and breathing exercises
- **Professional Tools**: Public speaking and interview practice
- **Multi-language Support**: Emotion detection in different languages

### AI Improvements
- **Real AI Integration**: Connect to actual emotion detection APIs
- **Custom Models**: Train models on user-specific data
- **Context Awareness**: Consider conversation context
- **Emotion Intensity**: Detect emotion strength levels

## 🎨 Design System

### Color Palette
- **Primary**: Blue gradient (#0ea5e9 to #8b5cf6)
- **Emotions**: 
  - Happy: #fbbf24 (Yellow)
  - Sad: #3b82f6 (Blue)
  - Angry: #ef4444 (Red)
  - Calm: #10b981 (Green)
  - Excited: #f97316 (Orange)
  - Anxious: #8b5cf6 (Purple)
  - Neutral: #6b7280 (Gray)

### Animations
- **Recording Pulse**: Animated recording indicator
- **Audio Waves**: Real-time audio level visualization
- **Emotion Transitions**: Smooth emotion display animations
- **Dashboard Loading**: Progressive data loading animations

## 🔒 Privacy & Security

### Data Handling
- **Local Processing**: Audio is processed locally in the browser
- **No Server Storage**: Voice recordings are not stored on servers
- **Optional Persistence**: Users can choose to save data locally
- **HTTPS Required**: Secure connection for microphone access

### Privacy Features
- Microphone permissions clearly explained
- No tracking or analytics without consent
- Local storage only for user preferences
- Clear data deletion options

## 🐛 Troubleshooting

### Common Issues

**Microphone not working:**
- Check browser permissions
- Ensure HTTPS connection
- Try refreshing the page
- Check if microphone is in use by other applications

**No emotion detected:**
- Speak clearly and naturally
- Ensure quiet environment
- Record for at least 10 seconds
- Check microphone quality

**Page not loading:**
- Clear browser cache
- Check internet connection
- Ensure Node.js version is 18+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- **Web Audio API** for audio processing capabilities
- **Framer Motion** for smooth animations
- **Tailwind CSS** for beautiful styling
- **Lucide** for beautiful icons
- **Next.js** for the amazing React framework

---

**MoodMirror** - Discover your emotional patterns through the power of voice analysis. 🎤✨ 
