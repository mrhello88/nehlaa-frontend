"use client"

import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import { useLazyBackgroundImage } from "../../../../hooks/useLazyImage"

const FeatureCard = ({ feature, index, onOpenModal, cardHoverVariants }) => {
  const { elementRef, backgroundImage, isLoaded } = useLazyBackgroundImage(feature.image, {
    placeholder: 'linear-gradient(135deg, rgba(0, 109, 119, 0.2) 0%, rgba(163, 230, 53, 0.2) 100%)'
  })

  return (
    <motion.div
      key={index}
      variants={{
        hidden: { opacity: 0, y: 100, scale: 0.8 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
            delay: feature.delay,
          },
        },
      }}
      whileHover="hover"
      className="group relative perspective-1000"
    >
      <motion.div
        ref={elementRef}
        variants={cardHoverVariants}
        className="relative h-96 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform-style-3d"
      >
        {/* Lazy-loaded Image Background */}
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

        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
          {/* Title */}
          <motion.h3
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold text-white mb-4 group-hover:text-accent transition-colors"
          >
            {feature.title}
          </motion.h3>

          {/* Glass Background Button */}
          <motion.button
            whileHover={{
              scale: 1.02,
              backgroundColor: "rgba(224, 242, 241, 0.15)",
              backdropFilter: "blur(20px)",
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onOpenModal(feature)}
            className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-2 rounded-full font-medium text-sm transition-all duration-300 hover:border-accent/50 hover:bg-white/15 shadow-lg w-fit flex items-center group/btn"
            style={{
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
            }}
          >
            Learn More About This Feature
            <motion.div 
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              className="ml-2"
            >
              <ArrowRight className="w-4 h-4 group-hover/btn:text-accent transition-colors" />
            </motion.div>
          </motion.button>

          {/* Hover Effect Particles */}
          <motion.div initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} className="absolute top-4 right-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Sparkles className="w-6 h-6 text-accent" />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default FeatureCard 