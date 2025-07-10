"use client"

import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import { useLazyBackgroundImage } from "../../../hooks/useLazyImage"

const HeroSection = ({ heroRef, containerVariants, itemVariants, textRevealVariants, letterVariants }) => {
  // Lazy load the hero background image
  const { elementRef, backgroundImage, isLoaded } = useLazyBackgroundImage('/herosection.jpg', {
    placeholder: 'linear-gradient(135deg, rgba(0, 109, 119, 0.3) 0%, rgba(163, 230, 53, 0.2) 100%)'
  })

  return (
    <motion.section id="hero" ref={heroRef} className="relative min-h-screen flex items-center justify-start overflow-hidden py-16 md:pt-20 lg:pt-24">
      {/* Fallback Background */}
      <div className="hero-bg-fallback" />
      
      {/* Lazy-loaded Full-Size Background Image */}
      <motion.div
        ref={elementRef}
        className={`absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'} z-1 bg-center lg:bg-center md:bg-[70%_center]`}
        style={{
          backgroundImage,
        }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />

      {/* Loading placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/15 animate-pulse z-0" />
      )}

      {/* Gradient Overlay */}
      <div className="hero-overlay" />

      {/* Hero Content */}
      <div className="hero-content w-full px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-6 md:space-y-8 text-left max-w-2xl ml-0 lg:ml-0"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="inline-block">
            <span className="glass-mint inline-flex items-center px-6 py-3 rounded-full text-sm font-medium text-primary border border-accent/30 shadow-lg">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="w-3 h-3 bg-accent rounded-full mr-3"
              />
              AI-Powered Property Management
              <Sparkles className="w-4 h-4 ml-2 text-accent" />
            </span>
          </motion.div>
          
          {/* Main Title with Glow Effects */}
          <motion.div variants={textRevealVariants}>
            <motion.h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight mb-4">
              <motion.span 
                variants={letterVariants}
                className="block text-white"
                animate={{
                  textShadow: [
                    "0 0 20px rgba(255, 255, 255, 0.5)",
                    "0 0 40px rgba(255, 255, 255, 0.8)",
                    "0 0 20px rgba(255, 255, 255, 0.5)",
                  ],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
              >
                Transform Your
              </motion.span>
              <motion.span 
                variants={letterVariants}
                className="block text-accent"
                animate={{
                  textShadow: [
                    "0 0 20px rgba(163, 230, 53, 0.5)",
                    "0 0 40px rgba(163, 230, 53, 0.8)",
                    "0 0 20px rgba(163, 230, 53, 0.5)",
                  ],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
              >
                Property Business
              </motion.span>
              <motion.span 
                variants={letterVariants}
                className="block text-white"
                animate={{
                  textShadow: [
                    "0 0 20px rgba(255, 255, 255, 0.5)",
                    "0 0 40px rgba(255, 255, 255, 0.8)",
                    "0 0 20px rgba(255, 255, 255, 0.5)",
                  ],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
              >
                with AI
              </motion.span>
            </motion.h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p 
            variants={itemVariants}
            className="text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed font-light max-w-xl"
          >
            Revolutionary AI-powered platform that automates property management, 
            optimizes operations, and maximizes your ROI with intelligent insights.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-4">
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="group bg-accent hover:bg-accent/90 text-primary px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-2xl flex items-center justify-center"
            >
              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="mr-3"
              >
                🚀
              </motion.span>
              Start Free Trial
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                className="ml-3"
              >
                →
              </motion.div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="glass text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl border border-white/30"
            >
              Watch Demo
            </motion.button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-6 pt-8">
            {["🏆 Industry Leader", "⚡ 99.9% Uptime", "🔒 Enterprise Security"].map((item, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.1, y: -2 }}
                className="flex items-center text-white/80 font-medium"
              >
                <span className="text-accent mr-2">{item.split(' ')[0]}</span>
                <span>{item.substring(item.indexOf(' ') + 1)}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default HeroSection 