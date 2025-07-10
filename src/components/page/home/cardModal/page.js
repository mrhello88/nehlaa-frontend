"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, ArrowRight, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"

const CardModal = ({ isOpen, onClose, feature }) => {
  // State for background image loading
  const [backgroundImage, setBackgroundImage] = useState('linear-gradient(135deg, rgba(0, 109, 119, 0.3) 0%, rgba(163, 230, 53, 0.3) 100%)')
  const [isLoaded, setIsLoaded] = useState(false)

  // Load image when modal opens or feature changes
  useEffect(() => {
    if (isOpen && feature?.image) {
      setIsLoaded(false)
      setBackgroundImage('linear-gradient(135deg, rgba(0, 109, 119, 0.3) 0%, rgba(163, 230, 53, 0.3) 100%)')
      
      const img = new Image()
      img.onload = () => {
        setBackgroundImage(`url(${feature.image})`)
        setIsLoaded(true)
      }
      img.onerror = () => {
        console.warn(`Failed to load image: ${feature.image}`)
        setIsLoaded(true)
      }
      img.src = feature.image
    }
  }, [isOpen, feature?.image])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!feature) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              duration: 0.4 
            }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lazy-loaded Background Image */}
            <div 
              className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
              style={{
                backgroundImage,
              }}
            />

            {/* Loading placeholder */}
            {!isLoaded && (
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 animate-pulse" />
            )}

            {/* Fallback gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30" />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-6 right-6 z-20 bg-white/10 backdrop-blur-md border border-white/20 text-white p-3 rounded-full hover:bg-white/20 transition-all duration-300 shadow-lg"
              style={{
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
              }}
            >
              <X className="w-6 h-6" />
            </motion.button>

            {/* Content Area with Glass Background */}
            <div className="relative z-10 h-full flex flex-col">
              {/* Top spacer to push content down */}
              <div className="flex-1 min-h-[40%]" />

              {/* Glass Content Container */}
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="bg-white/10 backdrop-blur-md border-t border-white/20 p-8 md:p-12"
                style={{
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                }}
              >
                {/* Feature Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  className="mb-6"
                >
                  <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center border border-accent/30">
                    <feature.icon className="w-8 h-8 text-accent" />
                  </div>
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="text-4xl md:text-5xl font-bold text-white mb-6"
                >
                  {feature.title}
                </motion.h2>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-3xl"
                >
                  {feature.description}
                </motion.p>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-accent hover:bg-accent/90 text-primary px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center shadow-lg group"
                  >
                    Get Started
                    <motion.div 
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                      className="ml-2"
                    >
                      <ArrowRight className="w-5 h-5 group-hover:text-primary/80 transition-colors" />
                    </motion.div>
                  </motion.button>

                  <motion.button
                    whileHover={{ 
                      scale: 1.05,
                      backgroundColor: "rgba(255, 255, 255, 0.15)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:border-accent/50 shadow-lg"
                    style={{
                      backdropFilter: "blur(16px)",
                      WebkitBackdropFilter: "blur(16px)",
                    }}
                  >
                    Learn More
                  </motion.button>
                </motion.div>

                {/* Decorative Elements */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="absolute top-8 right-8 opacity-20"
                >
                  <Sparkles className="w-8 h-8 text-accent" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CardModal 