"use client"

import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import { useLazyBackgroundImage } from "../../../../hooks/useLazyImage"

const ShowcaseCard = ({ item, index, onSelectShowcase }) => {
  const { elementRef, backgroundImage, isLoaded } = useLazyBackgroundImage(item.image, {
    placeholder: `linear-gradient(135deg, rgba(0, 109, 119, 0.2) 0%, rgba(163, 230, 53, 0.2) 100%)`
  })

  return (
    <motion.div
      key={item.id}
      variants={{
        hidden: { opacity: 0, y: 50, scale: 0.9 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
            delay: index * 0.1,
          },
        },
      }}
      whileHover={{
        y: -10,
        scale: 1.05,
        rotateY: 5,
        transition: { duration: 0.3 }
      }}
      onClick={() => onSelectShowcase(index)}
      className="group relative cursor-pointer perspective-1000"
    >
      <motion.div
        ref={elementRef}
        className={`relative h-80 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br ${item.color}`}
        whileHover={{ rotateX: 5 }}
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

        {/* Fallback Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />

        {/* Content */}
        <div className="relative z-10 p-6 h-full flex flex-col justify-between">
          {/* Icon */}
          <motion.div
            whileHover={{ rotate: 360, scale: 1.2 }}
            transition={{ duration: 0.6 }}
            className="w-16 h-16 bg-black/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 shadow-lg"
          >
            <item.icon className="w-8 h-8 text-white" />
          </motion.div>

          {/* Text Content */}
          <div className="flex-1 flex flex-col justify-end">
            <motion.p 
              className="text-white/90 text-sm font-medium mb-2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {item.subtitle}
            </motion.p>
            <motion.h3 
              className="text-white text-xl font-bold mb-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              {item.title}
            </motion.h3>

            {/* Interactive Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-black/30 backdrop-blur-md border border-white/30 text-white px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 hover:bg-black/40 shadow-lg w-fit flex items-center group/btn"
            >
              Explore
              <motion.div 
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                className="ml-2"
              >
                <ArrowRight className="w-4 h-4 group-hover/btn:text-accent transition-colors" />
              </motion.div>
            </motion.button>
          </div>

          {/* Hover Particles */}
          <motion.div 
            initial={{ opacity: 0 }} 
            whileHover={{ opacity: 1 }} 
            className="absolute top-4 right-4"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Sparkles className="w-6 h-6 text-white/60" />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ShowcaseCard 