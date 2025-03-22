'use client'
import Image from "next/image"
import Link from "next/link"
import { Code, Play, Braces, Zap, PenTool, MessageSquare } from "lucide-react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { TextRevealCard } from "@/components/ui/text-reveal" // Removed unused TextReveal
import SwipeButton from "@/components/animata/button/swipe-button" // Add this import

// Highlight text component
const HighlightedText = ({ children }: { children: React.ReactNode }) => (
  <span className="relative">
    <span className="relative z-10">{children}</span>
    <motion.span
      initial={{ width: "0%" }}
      whileInView={{ width: "100%" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="absolute bottom-0 left-0 h-[10px] bg-purple-400/30 -z-10"
    />
  </span>
)

// Grid background component
const GridBackground = () => (
  <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px] motion-safe:animate-grid-fade pointer-events-none" />
)

const VideoThumbnail = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoId = "1htGgH5MfgTQX5l9ujcu0MJizIhQ-pYHr"
  // Use the proper embed URL format
  const videoUrl = `https://drive.google.com/file/d/${videoId}/preview`
  
  return (
    <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden shadow-xl">
      {!isPlaying ? (
        <div
          className="cursor-pointer w-full h-full group"
          onClick={() => setIsPlaying(true)}
        >
          {/* Gradient Background as Placeholder */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
              <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-xl transform group-hover:scale-110 transition-transform mb-4">
                <svg
                  className="w-12 h-12 text-purple-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white text-shadow">Algorithm Visualization Demo</h3>
              <p className="text-white/80 text-shadow-sm">Click to play the video</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative w-full h-full">
          <iframe
            className="w-full h-full absolute inset-0"
            src={videoUrl}
            allow="autoplay; encrypted-media"
            allowFullScreen
            loading="lazy"
          />
          <button 
            onClick={() => setIsPlaying(false)}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}

export default function Home() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null // or a loading spinner
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-500 py-16 md:py-24 overflow-hidden">
        <GridBackground />
        <div className="container mx-auto px-6 text-center relative">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4 max-w-4xl mx-auto"
          >
            <HighlightedText>Visualize algorithms.</HighlightedText>
            <br />
            <HighlightedText>Understand DSA effortlessly.</HighlightedText>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto"
          >
            With Algoviz, you can visualize data structures and algorithms in real-time with{" "}
            <span className="underline">AI-powered optimization suggestions</span> to enhance your understanding.
          </motion.p>
          <Link href="/signup">
            <button className="bg-white text-purple-600 font-medium px-8 py-3 rounded-md shadow-lg hover:shadow-xl transition duration-300">
              Get Started
            </button>
          </Link>

          {/* <div className="flex justify-center mt-12 space-x-2">
            {[1, 2, 3, 4, 5, 6].map((dot, index) => (
              <div key={index} className={`h-2 w-2 rounded-full ${index === 0 ? "bg-white" : "bg-white/50"}`}></div>
            ))}
          </div> */}

          <p className="text-green text-sm tracking-widest mt-8 font-large font-bold">USED BY THOUSANDS OF DEVELOPERS</p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16"
          >
            <TextRevealCard className="mb-8">
              <p className="text-white/80 text-sm tracking-wider">
                TRUSTED BY THESE INNOVATIVE COMPANIES
              </p>
            </TextRevealCard>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg"
                  alt="Meta"
                  width={120}
                  height={40}
                  className="w-24 h-24 object-contain opacity-90 hover:opacity-100 transition-opacity"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
                  alt="Microsoft"
                  width={120}
                  height={40}
                  className="w-24 h-24 object-contain opacity-90 hover:opacity-100 transition-opacity"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                  alt="Apple"
                  width={120}
                  height={40}
                  className="w-24 h-24 object-contain opacity-90 hover:opacity-100 transition-opacity"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg"
                  alt="Tesla"
                  width={120}
                  height={40}
                  className="w-24 h-24 object-contain opacity-90 hover:opacity-100 transition-opacity"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
                  alt="Amazon"
                  width={120}
                  height={40}
                  className="w-24 h-24 object-contain opacity-90 hover:opacity-100 transition-opacity"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="max-w-lg">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Learning algorithms is challenging. Understanding code execution is complex. Algoviz makes DSA{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                  simple
                </span>
                .
              </h2>
              <p className="text-gray-600 mb-8">
                Our high-quality visualization platform is intuitive and powerful. We give you access to real-time
                algorithm visualization, multiple language support, and AI-powered optimization suggestions for your
                code.
              </p>
              <Link href="/dashboard">
                <button className="bg-blue-600 text-white font-medium px-8 py-3 rounded-md shadow-lg hover:bg-blue-700 transition duration-300">
                  Start Visualizing
                </button>
              </Link>
            </div>
            <div className="relative">
              <VideoThumbnail />

              {/* Arrow SVG (Kept unchanged) */}
              <div className="absolute -left-16 top-1/2 transform -translate-y-1/2 hidden md:block">
                <svg
                  width="120"
                  height="80"
                  viewBox="0 0 120 80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0,40 Q30,0 120,30" stroke="#7C3AED" strokeWidth="3" fill="none" />
                  <polygon points="110,30 120,30 115,20" fill="#7C3AED" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <p className="text-purple-600 font-medium tracking-wider mb-4">ALGOVIZ PLATFORM BENEFITS</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 max-w-3xl mx-auto">
            Powerful visualization. Intuitive interface. AI-powered suggestions.
          </h2>
          <Link href="/signup">
            <button className="bg-blue-600 text-white font-medium px-8 py-3 rounded-md shadow-lg hover:bg-blue-700 transition duration-300 mb-16">
              Create Free Account
            </button>
          </Link>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Benefit 1 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <Code className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Multiple language support</h3>
              <p className="text-gray-600">
                Visualize algorithms in JavaScript, Python, Java, C++, and more with our powerful editor.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <Play className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Real-time visualization</h3>
              <p className="text-gray-600">
                See your algorithms come to life as you code with our D3.js powered visualization engine.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <Braces className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Pre-defined algorithms</h3>
              <p className="text-gray-600">
                Access a library of common algorithms and data structures to learn from and modify.
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <Zap className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">AI-powered suggestions</h3>
              <p className="text-gray-600">
                Get real-time optimization suggestions powered by Mistral AI to improve your code.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section id="testimonials" className="py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-6">
          <TextRevealCard className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              <HighlightedText>Loved by developers worldwide</HighlightedText>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See what our community has to say about their experience with Algoviz
            </p>
          </TextRevealCard>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Johnson",
                role: "Senior Developer, TechCorp",
                quote: "Yes they do beautiful visualizations. Yes they have clean code. But the thing that makes them so special is how easy they are to work with. Can you have it all? Apparently with Algoviz."
              },
              {
                name: "Sarah Chen",
                role: "CS Professor, Tech University",
                quote: "Algoviz continues to deliver clean, elegant visualizations—perfectly executed and always intuitive. It's transformed how I teach algorithms to my students."
              },
              {
                name: "Michael Torres",
                role: "Bootcamp Instructor, CodeAcademy",
                quote: "The algorithm visualizations you designed are perfect. Our latest courses have our highest completion rates ever and we're seeing a 20% understanding rate increase!"
              },
              {
                name: "Emma Wilson",
                role: "Lead Developer, StartupX",
                quote: "The AI suggestions have helped us optimize our algorithms significantly. It's like having a senior developer reviewing your code in real-time."
              },
              {
                name: "David Park",
                role: "Software Architect, TechGiant",
                quote: "The visualization capabilities are unmatched. We use Algoviz for both teaching new hires and optimizing production code."
              },
              {
                name: "Lisa Rodriguez",
                role: "Tech Lead, InnovateCo",
                quote: "Finally, a tool that makes complex algorithms easy to understand. The real-time visualization has become an essential part of our development process."
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              >
                <p className="text-gray-700 mb-6 text-lg italic">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="border-t border-gray-100 pt-4">
                  <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                  <p className="text-purple-600 text-sm">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="case-studies" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-purple-600 font-medium tracking-wider mb-4">CASE STUDIES</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">See how others are using Algoviz</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover how educators, developers, and companies are leveraging Algoviz to improve algorithm
              understanding and development.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Case Study 1 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg">
              <div className="relative h-64 bg-gradient-to-br from-purple-500/10 to-blue-500/10">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-purple-600 text-6xl opacity-20">
                    <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 bg-purple-600 text-white px-4 py-2 text-sm font-medium">
                  CASE STUDY
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Tech University</h3>
                <p className="text-gray-600 mb-4">
                  How a leading university improved algorithm comprehension by 40% using Algoviz in their CS curriculum.
                </p>
                <Link href="#" className="text-purple-600 font-medium hover:underline">
                  Read more →
                </Link>
              </div>
            </div>

            {/* Case Study 2 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg">
              <div className="relative h-64 bg-gradient-to-br from-blue-500/10 to-indigo-500/10">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-blue-600 text-6xl opacity-20">
                    <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 bg-blue-600 text-white px-4 py-2 text-sm font-medium">
                  CASE STUDY
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">DevTeam Solutions</h3>
                <p className="text-gray-600 mb-4">
                  How a development team used Algoviz to optimize their sorting algorithms and improved performance by 30%.
                </p>
                <Link href="#" className="text-purple-600 font-medium hover:underline">
                  Read more →
                </Link>
              </div>
            </div>

            {/* Case Study 3 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg">
              <div className="relative h-64 bg-gradient-to-br from-indigo-500/10 to-purple-500/10">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-indigo-600 text-6xl opacity-20">
                    <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 bg-indigo-600 text-white px-4 py-2 text-sm font-medium">
                  CASE STUDY
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">CodeCamp Bootcamp</h3>
                <p className="text-gray-600 mb-4">
                  How a coding bootcamp integrated Algoviz into their curriculum and saw student satisfaction increase by 45%.
                </p>
                <Link href="#" className="text-purple-600 font-medium hover:underline">
                  Read more →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 md:py-24">
        <div className="container mx-auto px-6 text-center">
          <p className="text-purple-600 font-medium tracking-wider mb-4">HOW DOES ALGOVIZ WORK?</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 max-w-3xl mx-auto">
            Take your algorithm understanding from ordinary to extraordinary in just a few steps.
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-purple-100 border-2 border-purple-600 flex items-center justify-center mb-6">
                <PenTool className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">1. Select your algorithm</h3>
              <p className="text-gray-600">
                Choose from our library of pre-defined algorithms or create your own from scratch.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-purple-100 border-2 border-purple-600 flex items-center justify-center mb-6">
                <Code className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">2. Write or modify code</h3>
              <p className="text-gray-600">
                Use our Monaco editor to write or modify the algorithm in your preferred programming language.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-purple-100 border-2 border-purple-600 flex items-center justify-center mb-6">
                <Play className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">3. Visualize execution</h3>
              <p className="text-gray-600">
                Watch your algorithm come to life with our D3.js powered visualization engine in real-time.
              </p>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-purple-100 border-2 border-purple-600 flex items-center justify-center mb-6">
                <MessageSquare className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">4. Get AI suggestions</h3>
              <p className="text-gray-600">
                Receive real-time optimization suggestions from our Mistral AI model to improve your code.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Ready to start visualizing algorithms?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of developers who are already using Algoviz to master data structures and algorithms.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/signup">
              <button className="bg-white text-purple-600 font-medium px-8 py-3 rounded-md shadow-lg hover:shadow-xl transition duration-300">
                Create Free Account
              </button>
            </Link>
            <Link href="/login">
              <button className="bg-transparent border-2 border-white text-white font-medium px-8 py-3 rounded-md hover:bg-white/10 transition duration-300">
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="relative bg-gray-900 text-white py-12 overflow-hidden">
        <GridBackground />
        <div className="container mx-auto px-6 relative">
          <div className="grid md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Link
                href="/"
                className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400"
              >
                Algoviz.
              </Link>
              <p className="mt-4 text-gray-400">Visualize algorithms. Understand DSA effortlessly.</p>
            </motion.div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Case Studies
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">&copy; {new Date().getFullYear()} Algoviz. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

