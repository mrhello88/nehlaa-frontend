"use client"

import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useRef, useState } from "react"
import {
  Building2,
  Camera,
  TrendingUp,
  BarChart3,
  ArrowRight,
  CheckCircle,
  Users,
  Calendar,
  DollarSign,
  Eye,
  Sparkles,
  Zap,
  Target,
  Globe,
  Shield,
  Rocket,
  TreePine,
  Flower2,
  Leaf,
  X,
} from "lucide-react"
import CardModal from "./cardModal/page"
import FeatureModal from "./featureModal/page"
import FeatureCard from "./cards/FeatureCard"
import ShowcaseCard from "./cards/ShowcaseCard"
import TestimonialCard from "./cards/TestimonialCard"

const HomePage = () => {
  const containerRef = useRef(null)
  const heroRef = useRef(null)
  const [selectedFeature, setSelectedFeature] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedShowcase, setSelectedShowcase] = useState(0)
  const [isShowcaseExpanded, setIsShowcaseExpanded] = useState(false)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const springScrollY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const heroY = useTransform(springScrollY, [0, 1], ["0%", "50%"])
  const heroOpacity = useTransform(springScrollY, [0, 0.5], [1, 0])
  const heroScale = useTransform(springScrollY, [0, 0.5], [1, 0.8])

  // Modal functions
  const openModal = (feature) => {
    setSelectedFeature(feature)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedFeature(null)
  }

  // Showcase functions
  const selectShowcase = (index) => {
    setSelectedShowcase(index)
    setIsShowcaseExpanded(true)
  }

  const closeShowcase = () => {
    setIsShowcaseExpanded(false)
  }

  // Floating orbs animation
  const orbVariants = {
    animate: {
      y: [0, -30, 0],
      x: [0, 15, 0],
      scale: [1, 1.1, 1],
      transition: {
        duration: 8,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  const features = [
    {
      icon: Building2,
      title: "Portfolio Management",
      image: "/card-1.jpg",
      description: "AI-powered portfolio optimization with predictive maintenance, automated tenant screening, and intelligent property analytics. Streamline your operations with smart automation that learns from your data to maximize efficiency and profitability across your entire property portfolio.",
      gradient: "from-primary via-primary/80 to-accent/20",
      delay: 0.1,
    },
    {
      icon: Camera,
      title: "Virtual Tours",
      image: "/card-2.jpg",
      description: "Immersive 3D virtual tours with AI-guided personalization and real-time booking integration. Create stunning interactive experiences that engage potential tenants and reduce vacancy times while providing convenient remote viewing capabilities.",
      gradient: "from-accent via-accent/80 to-primary/20",
      delay: 0.2,
    },
    {
      icon: TrendingUp,
      title: "Smart Marketing",
      image: "/card-3.jpg",
      description: "Dynamic marketing campaigns with machine learning optimization and multi-channel automation. Reach the right tenants at the right time with personalized messaging that adapts to market conditions and maximizes your property's visibility.",
      gradient: "from-primary via-accent/60 to-primary/20",
      delay: 0.3,
    },
  ]

  const showcaseItems = [
    {
      id: 0,
      title: "AI Dashboard",
      subtitle: "Real-time Intelligence",
      description: "Experience the power of AI-driven insights with our comprehensive dashboard that provides real-time analytics, predictive maintenance alerts, and intelligent recommendations for your property portfolio.",
      image: "/show-case-1.jpg",
      icon: BarChart3,
      features: ["Real-time Analytics", "Predictive Insights", "Smart Recommendations", "Performance Metrics"],
      color: "from-primary to-accent",
    },
    {
      id: 1,
      title: "Property Management",
      subtitle: "Streamlined Operations",
      description: "Revolutionize your property management with automated workflows, tenant screening, maintenance scheduling, and comprehensive portfolio oversight all in one intelligent platform.",
      image: "/show-case-2.jpg",
      icon: Building2,
      features: ["Automated Workflows", "Tenant Screening", "Maintenance Scheduling", "Portfolio Overview"],
      color: "from-accent to-primary",
    },
    {
      id: 2,
      title: "Virtual Tours",
      subtitle: "Immersive Experiences",
      description: "Create stunning 3D virtual tours that engage potential tenants with interactive walkthroughs, AR features, and personalized viewing experiences that convert browsers into tenants.",
      image: "/show-case-3.jpg",
      icon: Camera,
      features: ["3D Walkthroughs", "AR Integration", "Interactive Elements", "Booking System"],
      color: "from-primary via-accent/60 to-primary",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "Property Manager",
      company: "Elite Properties Group",
      avatar: "/testimonial-1.jpg",
      rating: 5,
      text: "Nahlaa has completely transformed our property management operations. The AI insights increased occupancy by 35% while reducing maintenance costs."
    },
    {
      name: "Michael Chen",
      role: "Real Estate Developer",
      company: "Urban Dynamics LLC",
      avatar: "/testimonial-2.jpg",
      rating: 5,
      text: "The virtual tour feature revolutionized our sales process. We&apos;re closing deals 40% faster with confident remote buyers."
    },
    {
      name: "Jessica Rodriguez",
      role: "Portfolio Director",
      company: "Premier Living Solutions",
      avatar: "/testimonial-3.jpg",
      rating: 5,
      text: "Nahlaa&apos;s predictive maintenance and automated screening dramatically improved tenant quality. ROI was immediate and substantial."
    },
  ]


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

  const cardHoverVariants = {
    hover: {
      y: -20,
      scale: 1.05,
      rotateX: 5,
      rotateY: 5,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
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

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }



  return (
    <div ref={containerRef} className="min-h-screen relative overflow-hidden">
        {/* Hero Section */}
       <motion.section id="hero" ref={heroRef} className="relative min-h-screen flex items-center justify-start overflow-hidden py-16 md:pt-20 lg:pt-24">
         {/* Fallback Background */}
         <div className="hero-bg-fallback" />
         
         {/* Full-Size Background Image */}
         <motion.div
           className="hero-bg-fullsize"
           initial={{ scale: 1.1 }}
           animate={{ scale: 1 }}
           transition={{ duration: 2, ease: "easeOut" }}
         />

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
            
             {/* Main Title */}
            <motion.h1 
               variants={itemVariants} 
               className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 md:mb-8 leading-tight"
               style={{
                 textShadow: "0 0 30px rgba(255, 255, 255, 0.5), 0 0 60px rgba(255, 255, 255, 0.3), 0 0 90px rgba(255, 255, 255, 0.1)"
               }}
             >
              <motion.span
                animate={{
                  textShadow: [
                    "0 0 30px rgba(255, 255, 255, 0.5), 0 0 60px rgba(255, 255, 255, 0.3)",
                    "0 0 40px rgba(255, 255, 255, 0.7), 0 0 80px rgba(255, 255, 255, 0.4)",
                    "0 0 30px rgba(255, 255, 255, 0.5), 0 0 60px rgba(255, 255, 255, 0.3)"
                  ]
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              Transform Your
              </motion.span>
               <motion.span 
                 className="block gradient-text"
                 animate={{
                   textShadow: [
                     "0 0 30px rgba(163, 230, 53, 0.6), 0 0 60px rgba(163, 230, 53, 0.4)",
                     "0 0 50px rgba(163, 230, 53, 0.8), 0 0 90px rgba(163, 230, 53, 0.5)",
                     "0 0 30px rgba(163, 230, 53, 0.6), 0 0 60px rgba(163, 230, 53, 0.4)"
                   ]
                 }}
                 transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
               >
                Property Business
              </motion.span>
              <motion.span
                animate={{
                  textShadow: [
                    "0 0 30px rgba(255, 255, 255, 0.5), 0 0 60px rgba(255, 255, 255, 0.3)",
                    "0 0 40px rgba(255, 255, 255, 0.7), 0 0 80px rgba(255, 255, 255, 0.4)",
                    "0 0 30px rgba(255, 255, 255, 0.5), 0 0 60px rgba(255, 255, 255, 0.3)"
                  ]
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
              >
              with AI
              </motion.span>
            </motion.h1>
            
             {/* Description */}
            <motion.p 
               variants={itemVariants}
               className="text-lg sm:text-xl text-white/90 mb-8 md:mb-12 leading-relaxed"
            >
              Nahlaa revolutionizes property management with intelligent automation, 
              predictive analytics, and seamless tenant experiences that drive results.
            </motion.p>
            
             {/* CTA Buttons */}
             <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
               <motion.button
                 whileHover={{
                   scale: 1.05,
                   boxShadow: "0 20px 40px rgba(0, 109, 119, 0.3)",
                 }}
                 whileTap={{ scale: 0.95 }}
                 className="group bg-primary hover:bg-primary/90 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-bold text-lg sm:text-xl transition-all duration-300 flex items-center shadow-2xl w-full sm:w-auto justify-center sm:justify-start"
               >
                 Book a Demo
            <motion.div 
                   animate={{ x: [0, 5, 0] }}
                   transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                 >
                   <ArrowRight className="ml-3 w-5 h-5 sm:w-6 sm:h-6" />
                 </motion.div>
               </motion.button>

               <motion.button
                 whileHover={{
                   scale: 1.05,
                   backgroundColor: "rgba(224, 242, 241, 0.1)",
                 }}
                 whileTap={{ scale: 0.95 }}
                 className="glass-mint text-white px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-bold text-lg sm:text-xl transition-all duration-300 hover:border-accent/40 shadow-xl w-full sm:w-auto text-center"
               >
                Explore Features
               </motion.button>
             </motion.div>

             {/* Trust Indicators */}
             <motion.div variants={itemVariants} className="flex flex-wrap gap-8 text-white/80 mt-8">
               {[
                 { icon: CheckCircle, text: "Free 30-day trial" },
                 { icon: Shield, text: "Enterprise security" },
                 { icon: Users, text: "10,000+ properties" },
               ].map((item, index) => (
                 <motion.div key={index} whileHover={{ scale: 1.1, y: -2 }} className="flex items-center group">
                   <item.icon className="w-5 h-5 text-accent mr-3" />
                   <span className="font-medium group-hover:text-accent transition-colors">{item.text}</span>
                 </motion.div>
               ))}
            </motion.div>
          </motion.div>
         </div>
          
         {/* Scroll Indicator */}
          <motion.div 
           animate={{ y: [0, 10, 0] }}
           transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
           className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
         >
           <div className="glass-mint p-3 rounded-full">
             <ArrowRight className="w-6 h-6 text-accent rotate-90" />
            </div>
          </motion.div>
       </motion.section>

      {/* Feature Pillars Section */}
      <section id="features" className="py-32 relative section-bg-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="text-center mb-20"
          >
            <motion.h2 variants={textRevealVariants} className="text-5xl md:text-7xl font-black text-gray-900 mb-8">
              Next-Gen Features for
              <motion.span
                animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                className="block gradient-text"
                style={{
                  backgroundSize: "200% 200%",
                }}
              >
                Smart Property Management
              </motion.span>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-2xl text-gray-600 max-w-4xl mx-auto font-light">
              Cutting-edge AI technology that revolutionizes every aspect of property management
            </motion.p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <FeatureCard 
                key={index}
                feature={feature}
                index={index}
                onOpenModal={openModal}
                cardHoverVariants={cardHoverVariants}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Product Showcase Section */}
      <section id="showcase" className="py-32 testimonials-bg relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-20"
          >
            <motion.h2 variants={textRevealVariants} className="text-5xl md:text-7xl font-black text-gray-900 mb-8">
              See Nahlaa in
              <span className="block gradient-text">Action</span>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-2xl text-gray-600 max-w-4xl mx-auto font-light">
              Experience the power of AI-driven property management through our intuitive interface
            </motion.p>
          </motion.div>
          
          {/* Interactive Showcase Grid */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          >
            {showcaseItems.map((item, index) => (
              <ShowcaseCard 
                key={item.id}
                item={item}
                index={index}
                onSelectShowcase={selectShowcase}
              />
            ))}
          </motion.div>
          
          {/* Expanded Showcase Modal */}
          <FeatureModal 
            isOpen={isShowcaseExpanded}
            onClose={closeShowcase}
            showcaseItems={showcaseItems}
            selectedShowcase={selectedShowcase}
          />
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-32 testimonials-bg relative overflow-hidden">
        {/* Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-32 h-32 bg-accent/5 rounded-full blur-xl"
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: i * 2,
              }}
              style={{
                left: `${20 + i * 15}%`,
                top: `${10 + i * 20}%`,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="text-center mb-20"
          >
            <motion.h2 variants={textRevealVariants} className="text-5xl md:text-7xl font-black text-gray-900 mb-8">
              What Our Clients
              <motion.span
                animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                className="block gradient-text"
                style={{
                  backgroundSize: "200% 200%",
                }}
              >
                Are Saying
              </motion.span>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-2xl text-gray-600 max-w-4xl mx-auto font-light">
              Discover how Nahlaa is transforming property management for industry leaders
            </motion.p>
          </motion.div>
            
            <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <TestimonialCard 
                key={index}
                testimonial={testimonial}
                index={index}
              />
            ))}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mt-20"
          >
            <motion.div variants={itemVariants}>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(0, 109, 119, 0.3)",
                  y: -5,
                }}
                whileTap={{ scale: 0.95 }}
                className="group bg-primary hover:bg-primary/90 text-white px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-300 shadow-2xl flex items-center mx-auto"
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="mr-4"
                >
                  <Users className="w-6 h-6" />
                </motion.div>
                Join Our Success Stories
                <motion.div
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  className="ml-4"
                >
                  <ArrowRight className="w-6 h-6" />
                </motion.div>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>



      {/* Card Modal */}
      <CardModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        feature={selectedFeature}
      />
    </div>
  )
}

export default HomePage
