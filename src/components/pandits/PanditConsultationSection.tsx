"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Clock, PhoneCall, Shield, Sparkles } from "lucide-react";
import { PanditCard } from "./PanditCard";
import { pandits } from "./PanditCard";
import { WhyChooseUsSection } from "./WhyChooseUs";
import { TrustBadges } from "./TrustBadges";
import Link from "next/link";

export function PanditConsultationSection() {
  return (
    <section className="w-full">
      {/* Trust Badges - Top */}
      <TrustBadges />

      {/* Main Consultation Section */}
      <div className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            {/* Decorative Om */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-block mb-4"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-saffron to-gold flex items-center justify-center text-3xl shadow-lg shadow-saffron/20">
                ॐ
              </div>
            </motion.div>

            <p className="text-saffron font-semibold text-sm tracking-[0.2em] uppercase mb-3">
              Spiritual Guidance
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              <span className="text-saffron">Connect with</span> Verified{" "}
              <span className="text-saffron">Online Pandits</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Book online consultations for astrology, pujas, kundali matching, spiritual
              guidance, and religious rituals from experienced pandits across Nepal.
            </p>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-8 mt-10"
            >
              {[
                { label: "Verified Pandits", value: "50+" },
                { label: "Consultations Done", value: "10K+" },
                { label: "Rituals Available", value: "25+" },
                { label: "Languages Supported", value: "8+" },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center px-4 py-2"
                >
                  <span className="text-2xl md:text-3xl font-bold text-saffron">
                    {stat.value}
                  </span>
                  <span className="text-sm text-muted-foreground mt-1">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
            {["All", "Online Now", "Vedic Astrology", "Puja & Rituals", "Kundali"].map(
              (filter, idx) => (
                <Button
                  key={filter}
                  variant={idx === 0 ? "default" : "outline"}
                  className={`rounded-full transition-all duration-300 ${
                    idx === 0
                      ? "bg-saffron text-white hover:bg-saffron-dark"
                      : "border-saffron/30 text-saffron hover:bg-saffron hover:text-white"
                  }`}
                  size="sm"
                >
                  {filter}
                </Button>
              )
            )}
          </motion.div>

          {/* Pandit Cards Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          >
            {pandits.map((pandit, index) => (
              <PanditCard key={pandit.id} pandit={pandit} index={index} />
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center"
          >
            <p className="text-muted-foreground mb-6 text-lg">
              Can&apos;t find the right pandit? Let us help you find the perfect match.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/booking">
                <Button size="lg" className="bg-saffron text-white hover:bg-saffron-dark px-8">
                  <PhoneCall className="w-5 h-5 mr-2" />
                  Get Personalized Recommendation
                </Button>
              </Link>
              <Link href="/temples">
                <Button size="lg" variant="outline" className="border-saffron text-saffron hover:bg-saffron hover:text-white px-8">
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Explore Temples
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Why Choose Us */}
      <WhyChooseUsSection />

      {/* Divider decorative section */}
      <div className="py-16 bg-gradient-to-r from-saffron/5 via-gold/5 to-saffron/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center items-center gap-6 text-center"
          >
            {[
              { icon: <Clock className="w-6 h-6" />, text: "24/7 Availability" },
              { icon: <Shield className="w-6 h-6" />, text: "Privacy Guaranteed" },
              { icon: <Sparkles className="w-6 h-6" />, text: "Genuine Remedies" },
              { icon: <PhoneCall className="w-6 h-6" />, text: "Instant Connect" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 bg-white/80 px-6 py-4 rounded-full shadow-sm border border-border/50"
              >
                <span className="text-saffron">{item.icon}</span>
                <span className="text-sm font-medium text-foreground">{item.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}