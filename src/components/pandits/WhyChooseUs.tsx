"use client";

import { motion } from "framer-motion";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: "🕉️",
    title: "Verified Pandits",
    description:
      "All our pandits are verified with authentic credentials and decades of experience in Vedic traditions.",
  },
  {
    icon: "💻",
    title: "Online Consultation",
    description:
      "Connect with pandits from the comfort of your home through secure video and chat consultations.",
  },
  {
    icon: "🔒",
    title: "Secure Booking",
    description:
      "End-to-end encrypted booking system with secure payment gateways for worry-free transactions.",
  },
  {
    icon: "🕯️",
    title: "Authentic Ritual Guidance",
    description:
      "Experience traditional rituals performed exactly as prescribed in ancient scriptures and texts.",
  },
  {
    icon: "📖",
    title: "Scriptural Expertise",
    description:
      "Deep knowledge of Vedas, Puranas, and Shastras passed down through generations of learned scholars.",
  },
  {
    icon: "🌟",
    title: "Personalized Remedies",
    description:
      "Customized mantras, pujas, and gemstone recommendations based on your unique kundali.",
  },
];

export function WhyChooseUsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-saffron font-semibold text-sm tracking-widest uppercase mb-2">
              Our Advantage
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Divya Nepal Pandits?
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-saffron to-gold mx-auto mb-6" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We connect you with the most experienced and trusted pandits across Nepal, ensuring your spiritual needs are met with authenticity and care.
            </p>
          </motion.div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="group relative p-8 rounded-2xl border border-border bg-card hover:border-saffron/30 hover:shadow-xl transition-all duration-500 hover:bg-gradient-to-br hover:from-white hover:to-saffron/5">
                {/* Decorative corner accent */}
                <div
                  className="absolute top-0 right-0 w-20 h-20 bg-saffron/5 rounded-bl-full transition-all duration-500 group-hover:bg-saffron/10"
                  aria-hidden="true"
                />

                {/* Icon */}
                <div className="relative mb-5">
                  <span className="text-4xl">{feature.icon}</span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-saffron transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}