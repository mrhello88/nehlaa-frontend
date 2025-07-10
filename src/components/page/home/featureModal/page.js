"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, ArrowRight, CheckCircle } from "lucide-react"
import { useEffect, useState } from "react"

// Custom scrollbar styles
const scrollbarStyles = `
  .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
  }
  
  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 10px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 10px;
    border: 2px solid transparent;
    background-clip: content-box;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
    background-clip: content-box;
  }
  
  .custom-scrollbar::-webkit-scrollbar-corner {
    background: transparent;
  }
`

const FeatureModal = ({ isOpen, onClose, showcaseItems, selectedShowcase }) => {
  // Get the selected item safely
  const selectedItem = showcaseItems?.[selectedShowcase]
  
  // State for background image loading
  const [backgroundImage, setBackgroundImage] = useState('linear-gradient(135deg, rgba(0, 109, 119, 0.2) 0%, rgba(163, 230, 53, 0.2) 100%)')
  const [isLoaded, setIsLoaded] = useState(false)

  // Load image when modal opens or selectedItem changes
  useEffect(() => {
    if (isOpen && selectedItem?.image) {
      setIsLoaded(false)
      setBackgroundImage('linear-gradient(135deg, rgba(0, 109, 119, 0.2) 0%, rgba(163, 230, 53, 0.2) 100%)')
      
      const img = new Image()
      img.onload = () => {
        setBackgroundImage(`url(${selectedItem.image})`)
        setIsLoaded(true)
      }
      img.onerror = () => {
        console.warn(`Failed to load image: ${selectedItem.image}`)
        setIsLoaded(true)
      }
      img.src = selectedItem.image
    }
  }, [isOpen, selectedItem?.image])

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

  // Inject custom scrollbar styles
  useEffect(() => {
    if (isOpen) {
      const styleElement = document.createElement('style')
      styleElement.textContent = scrollbarStyles
      document.head.appendChild(styleElement)
      
      return () => {
        document.head.removeChild(styleElement)
      }
    }
  }, [isOpen])

  if (!showcaseItems || selectedShowcase === null || selectedShowcase === undefined) return null
  if (!selectedItem) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-6xl h-[90vh] rounded-3xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lazy-loaded Background */}
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
            
            <div className="absolute inset-0 bg-black/50" />

            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 bg-white/10 backdrop-blur-md border border-white/20 text-white p-2 sm:p-3 rounded-full hover:bg-white/20 transition-all duration-300 shadow-lg"
              style={{
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
              }}
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.button>

            {/* Content Container */}
            <div className="relative z-10 h-full flex flex-col">
              {/* Mobile: Image Area (50% height) */}
              <div className="lg:hidden flex-shrink-0 p-4 sm:p-6 h-[50%] flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="w-full max-w-md"
                >
                  <div 
                    className={`aspect-video bg-cover bg-center bg-no-repeat rounded-xl shadow-2xl border-2 border-white/20 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                    style={{
                      backgroundImage,
                    }}
                  >
                    {!isLoaded && (
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 animate-pulse rounded-xl" />
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Desktop: Side-by-side layout */}
              <div className="hidden lg:flex h-full">
                {/* Left - Image Area (Desktop only) */}
                <div className="flex-1 p-8 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="w-full max-w-2xl"
                  >
                    <div 
                      className={`aspect-video bg-cover bg-center bg-no-repeat rounded-2xl shadow-2xl border-4 border-white/20 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                      style={{
                        backgroundImage,
                      }}
                    >
                      {!isLoaded && (
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 animate-pulse rounded-2xl" />
                      )}
                    </div>
                  </motion.div>
                </div>

                {/* Right - Content Area (Desktop) */}
                <div className="w-1/2 bg-white/10 backdrop-blur-md border-l border-white/20 flex flex-col h-full"
                  style={{
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                  }}
                >
                  {/* Scrollable Content */}
                  <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex-1 overflow-y-auto overflow-x-hidden p-8 xl:p-12 custom-scrollbar"
                    style={{ 
                      height: '100%',
                      maxHeight: '100%',
                      scrollBehavior: 'smooth'
                    }}
                  >
                    <div className="space-y-6 pb-8">
                      {/* Icon */}
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                        className="w-20 h-20 bg-accent/20 rounded-3xl flex items-center justify-center shadow-lg"
                      >
                        {(() => {
                          const IconComponent = selectedItem.icon;
                          return <IconComponent className="w-10 h-10 text-accent" />;
                        })()}
                      </motion.div>

                      {/* Title */}
                      <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-3xl xl:text-4xl font-bold text-white leading-tight"
                      >
                        {selectedItem.title}
                      </motion.h2>

                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="text-accent text-lg font-medium"
                      >
                        {selectedItem.subtitle}
                      </motion.p>

                      {/* Description */}
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="text-white/90 text-lg leading-relaxed"
                      >
                        {selectedItem.description}
                      </motion.p>

                      {/* Features List */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="space-y-3"
                      >
                        {selectedItem.features.map((feature, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.9 + index * 0.1 }}
                            className="flex items-start"
                          >
                            <CheckCircle className="w-5 h-5 text-accent mr-3 flex-shrink-0 mt-0.5" />
                            <span className="text-white/90 text-base">{feature}</span>
                          </motion.div>
                        ))}
                      </motion.div>

                      {/* Add some extra content to test scrolling */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.0 }}
                        className="space-y-4"
                      >
                        <h3 className="text-xl font-semibold text-white">Additional Benefits</h3>
                        <div className="space-y-2">
                          <div className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-accent mr-3 flex-shrink-0 mt-0.5" />
                            <span className="text-white/90 text-base">24/7 customer support</span>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-accent mr-3 flex-shrink-0 mt-0.5" />
                            <span className="text-white/90 text-base">Regular updates and improvements</span>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-accent mr-3 flex-shrink-0 mt-0.5" />
                            <span className="text-white/90 text-base">Seamless integration with existing systems</span>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-accent mr-3 flex-shrink-0 mt-0.5" />
                            <span className="text-white/90 text-base">Advanced security features</span>
                          </div>
                        </div>
                      </motion.div>

                      {/* Action Buttons */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2 }}
                        className="flex flex-col gap-4 pt-6"
                      >
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-accent hover:bg-accent/90 text-primary px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center shadow-lg group"
                        >
                          Try This Feature
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
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Mobile: Scrollable Content Area (50% height) */}
              <div className="lg:hidden h-[50%] bg-white/10 backdrop-blur-md border-t border-white/20 flex flex-col"
                style={{
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                }}
              >
                {/* Scrollable Content */}
                <motion.div
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex-1 overflow-y-auto p-4 sm:p-6"
                  onTouchStart={(e) => e.stopPropagation()}
                  onTouchMove={(e) => e.stopPropagation()}
                  onWheel={(e) => e.stopPropagation()}
                >
                  <div className="space-y-4 sm:space-y-5">
                    {/* Icon */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                      className="w-14 h-14 sm:w-16 sm:h-16 bg-accent/20 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-lg"
                    >
                      {(() => {
                        const IconComponent = selectedItem.icon;
                        return <IconComponent className="w-7 h-7 sm:w-8 sm:h-8 text-accent" />;
                      })()}
                    </motion.div>

                    {/* Title */}
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="text-xl sm:text-2xl font-bold text-white leading-tight"
                    >
                      {selectedItem.title}
                    </motion.h2>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="text-accent text-sm sm:text-base font-medium"
                    >
                      {selectedItem.subtitle}
                    </motion.p>

                    {/* Description */}
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className="text-white/90 text-sm sm:text-base leading-relaxed"
                    >
                      {selectedItem.description}
                    </motion.p>

                    {/* Features List */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="space-y-2 sm:space-y-3"
                    >
                      {selectedItem.features.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.9 + index * 0.1 }}
                          className="flex items-start"
                        >
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-accent mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-white/90 text-sm sm:text-base">{feature}</span>
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 }}
                      className="flex flex-col gap-3 pt-4 sm:pt-6 pb-4"
                    >
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-accent hover:bg-accent/90 text-primary px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base transition-all duration-300 flex items-center justify-center shadow-lg group"
                      >
                        Try This Feature
                        <motion.div 
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                          className="ml-2"
                        >
                          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:text-primary/80 transition-colors" />
                        </motion.div>
                      </motion.button>

                      <motion.button
                        whileHover={{ 
                          scale: 1.05,
                          backgroundColor: "rgba(255, 255, 255, 0.15)",
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base transition-all duration-300 hover:border-accent/50 shadow-lg"
                        style={{
                          backdropFilter: "blur(16px)",
                          WebkitBackdropFilter: "blur(16px)",
                        }}
                      >
                        Learn More
                      </motion.button>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default FeatureModal 