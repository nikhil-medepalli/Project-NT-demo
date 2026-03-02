"use client";
import { motion } from 'motion/react';

const CoreDifference = () => {

    const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };
    
  return (
    <section className="px-8 py-24 bg-background" id="manifesto">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              { title: "Leave-Day Optimization", desc: "Our routing logic ensures you spend time experiencing, not just transiting. We make every day of your PTO count." },
              { title: "Human Travel Experts", desc: "No AI hallucinations. No generic templates. Real strategists with deep, localized knowledge of India craft your exact itinerary." },
              { title: "Zero Booking Clutter", desc: "We don't sell flights. We don't push affiliate hotels. We provide pure, unbiased travel strategy and execution plans." }
            ].map((feature, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeUp}
                whileHover={{ y: -5, borderColor: 'var(--card)' }}
                className="bg-card border border-border p-8 rounded-lg transition-colors duration-300"
              >
                <div className="w-10 h-10 mb-6 rounded bg-card border border-[#1A1D24] flex items-center justify-center text-primary">
                  {/* Placeholder for an icon like Lucide React */}
                  0{idx + 1}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
  )
}
export default CoreDifference