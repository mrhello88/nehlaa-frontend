"use client"

import { motion } from "framer-motion"
import { ArrowRight, CheckCircle, Shield, Globe, Zap } from "lucide-react"

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  const textRevealVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20,
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <footer id="footer" className="py-32 relative overflow-hidden">
      {/* Full Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/cta-section.jpg')`,
        }}
      />
      
      {/* Dark Overlay for Text Readability */}
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* CTA Content - Centered */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
            <motion.h2 variants={textRevealVariants} className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8">
              Ready to Revolutionize
              <motion.span
                animate={{
                  textShadow: [
                    "0 0 20px rgba(163, 230, 53, 0.5)",
                    "0 0 40px rgba(163, 230, 53, 0.8)",
                    "0 0 20px rgba(163, 230, 53, 0.5)",
                  ],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="block text-accent"
              >
                Your Property Business?
              </motion.span>
            </motion.h2>

            <motion.p variants={itemVariants} className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed font-light max-w-3xl mx-auto">
              Join the future of property management with Nahlaa&apos;s revolutionary AI platform
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 mb-12 justify-center">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 25px 50px rgba(163, 230, 53, 0.4)",
                  y: -5,
                }}
                whileTap={{ scale: 0.95 }}
                className="group bg-accent hover:bg-accent/90 text-primary px-12 py-6 rounded-2xl font-black text-xl transition-all duration-300 shadow-2xl flex items-center justify-center"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Zap className="mr-4 w-7 h-7" />
                </motion.div>
                Start Your Revolution
                <motion.div
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                >
                  <ArrowRight className="ml-4 w-7 h-7" />
                </motion.div>
              </motion.button>

              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  y: -5,
                }}
                whileTap={{ scale: 0.95 }}
                className="glass text-white px-12 py-6 rounded-2xl font-black text-xl transition-all duration-300 shadow-xl border-2 border-white/30"
              >
                Schedule Demo
              </motion.button>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-8 text-white/90 justify-center mb-16">
              {[
                { icon: CheckCircle, text: "Free 30-day trial" },
                { icon: Shield, text: "Enterprise security" },
                { icon: Globe, text: "Global support" },
              ].map((item, index) => (
                <motion.div key={index} whileHover={{ scale: 1.1, y: -2 }} className="flex items-center group">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear", delay: index * 2 }}
                  >
                    <item.icon className="w-6 h-6 text-accent mr-3" />
                  </motion.div>
                  <span className="font-semibold text-lg group-hover:text-accent transition-colors">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Footer Bottom */}
            <motion.div 
              variants={itemVariants}
              className="border-t border-white/20 pt-8 mt-16"
            >
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                {/* Logo */}
                <div className="flex items-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center mr-3 shadow-lg"
                  >
                    <Zap className="w-7 h-7 text-primary" />
                  </motion.div>
                  <span className="text-3xl font-black text-white">
                    Nahlaa
                  </span>
                </div>

                {/* Copyright */}
                <div className="text-white/70 text-center md:text-right">
                  <p className="mb-2">© 2024 Nahlaa. All rights reserved.</p>
                  <p className="text-sm">Revolutionizing property management with AI</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 