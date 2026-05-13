"use client";

import { motion } from "framer-motion";

interface Badge {
  icon: string;
  title: string;
  description: string;
}

const badges: Badge[] = [
  {
    icon: "✅",
    title: "Verified Pandits",
    description: "All pandit credentials verified and authenticated",
  },
  {
    icon: "💻",
    title: "Online Consultation",
    description: "Seamless video & chat consultations available",
  },
  {
    icon: "🔒",
    title: "Secure Booking",
    description: "100% secure and encrypted payment system",
  },
  {
    icon: "🕯️",
    title: "Authentic Rituals",
    description: "Traditional Vedic ritual guidance guaranteed",
  },
];

export function TrustBadges() {
  return (
    <div className="py-10 bg-gradient-to-b from-white via-cream/50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group text-center p-6 rounded-2xl border border-border hover:border-saffron/40 hover:bg-white/80 hover:shadow-lg transition-all duration-300"
            >
              {/* Icon */}
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {badge.icon}
              </div>

              {/* Title */}
              <h4 className="text-base font-bold text-foreground mb-1">
                {badge.title}
              </h4>

              {/* Description */}
              <p className="text-xs text-muted-foreground leading-relaxed">
                {badge.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}