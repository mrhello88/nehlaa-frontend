"use client"

import { motion } from "framer-motion"
import { Star, Sparkles, CheckCircle2 } from "lucide-react"
import { useLazyBackgroundImage } from "../../../../hooks/useLazyImage"

const TestimonialCard = ({ testimonial, index }) => {
  const { elementRef, backgroundImage, isLoaded } = useLazyBackgroundImage(testimonial.avatar, {
    placeholder: 'linear-gradient(135deg, rgba(0, 109, 119, 0.2) 0%, rgba(163, 230, 53, 0.2) 100%)'
  })

  return (
    <motion.div
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
            delay: index * 0.1,
          },
        },
      }}
      whileHover={{ 
        y: -15, 
        scale: 1.03,
        rotateY: 5,
        transition: { duration: 0.3 }
      }}
      className="group relative perspective-1000"
    >
      <motion.div 
        className="relative h-full bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/30 overflow-hidden flex flex-col"
        style={{
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
        whileHover={{
          rotateX: 5,
          rotateY: 5,
          boxShadow: "0 25px 50px rgba(0, 0, 0, 0.2)",
        }}
      >
        {/* Floating sparkles effect */}
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              animate={{
                y: [0, -20, 0],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2 + i * 0.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.3,
              }}
              style={{
                left: `${20 + i * 15}%`,
                top: `${10 + i * 10}%`,
              }}
            >
              <Sparkles className="w-3 h-3 text-accent/60" />
            </motion.div>
          ))}
        </motion.div>

        {/* Stars Rating */}
        <motion.div 
          className="flex items-center space-x-1 mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 + index * 0.1 }}
        >
          {[...Array(testimonial.rating)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, rotate: -180 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              transition={{ 
                delay: 0.3 + index * 0.1 + i * 0.05,
                type: "spring",
                stiffness: 200 
              }}
            >
              <Star 
                className="w-5 h-5 fill-yellow-400 text-yellow-400" 
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonial Text */}
        <motion.div className="flex-1 mb-6">
          <motion.p 
            className="text-gray-700 text-lg leading-relaxed font-medium italic"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
          >
            {`"${testimonial.text}"`}
          </motion.p>
        </motion.div>

        {/* Client Info */}
        <motion.div 
          className="flex items-center mt-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + index * 0.1 }}
        >
          {/* Avatar */}
          <motion.div 
            ref={elementRef}
            className="relative w-16 h-16 rounded-2xl overflow-hidden mr-4 shadow-lg flex-shrink-0"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            {/* Lazy-loaded Avatar */}
            <div 
              className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
              style={{
                backgroundImage,
              }}
            />
            
            {/* Loading placeholder */}
            {!isLoaded && (
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 animate-pulse flex items-center justify-center">
                <div className="w-8 h-8 bg-white/30 rounded-full" />
              </div>
            )}

            {/* Verification Badge */}
            <motion.div 
              className="absolute -top-1 -right-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center shadow-lg"
              animate={{ 
                scale: [1, 1.1, 1],
              }}
              transition={{ 
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut" 
              }}
            >
              <CheckCircle2 className="w-3 h-3 text-primary" />
            </motion.div>
          </motion.div>

          {/* Name and Role */}
          <div className="flex-1">
            <motion.h4 
              className="font-bold text-gray-900 text-lg"
              whileHover={{ scale: 1.02 }}
            >
              {testimonial.name}
            </motion.h4>
            <motion.p 
              className="text-gray-600 text-sm font-medium"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              {testimonial.role}
            </motion.p>
            <motion.p 
              className="text-accent text-sm font-semibold"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.7 + index * 0.1 }}
            >
              {testimonial.company}
            </motion.p>
          </div>
        </motion.div>

        {/* Glass reflection effect */}
        <motion.div 
          className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/20 to-transparent rounded-t-3xl"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  )
}

export default TestimonialCard 