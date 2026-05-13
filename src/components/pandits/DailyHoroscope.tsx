"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

interface Horoscope {
  sign: string;
  icon: string;
  element: string;
  dateRange: string;
  summary: string;
  mood: string;
  luckyColor: string;
  luckyNumber: number;
  rating: number;
}

const horoscopes: Horoscope[] = [
  {
    sign: "Aries",
    icon: "♈",
    element: "Fire",
    dateRange: "Mar 21 - Apr 19",
    summary: "Today brings unexpected opportunities in your career. Trust your instincts and take bold action.",
    mood: "Energetic",
    luckyColor: "Red",
    luckyNumber: 7,
    rating: 4.5,
  },
  {
    sign: "Taurus",
    icon: "♉",
    element: "Earth",
    dateRange: "Apr 20 - May 20",
    summary: "Financial matters look promising today. A long-awaited reward for your patience is on its way.",
    mood: "Grounded",
    luckyColor: "Green",
    luckyNumber: 4,
    rating: 4.2,
  },
  {
    sign: "Gemini",
    icon: "♊",
    element: "Air",
    dateRange: "May 21 - Jun 20",
    summary: "Communication is key today. A meaningful conversation could change your perspective entirely.",
    mood: "Curious",
    luckyColor: "Yellow",
    luckyNumber: 9,
    rating: 4.8,
  },
  {
    sign: "Cancer",
    icon: "♋",
    element: "Water",
    dateRange: "Jun 21 - Jul 22",
    summary: "Emotional connections deepen today. Spend quality time with loved ones for spiritual growth.",
    mood: "Nurturing",
    luckyColor: "Silver",
    luckyNumber: 2,
    rating: 4.1,
  },
];

export function DailyHoroscopeSection() {
  return (
    <section className="py-16 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-saffron font-semibold text-sm tracking-widest uppercase mb-2">
              Daily Guidance
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Today's Horoscope Preview
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get a glimpse of what the stars have in store for you. Consult our pandits for detailed readings.
            </p>
          </motion.div>
        </div>

        {/* Horoscope Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {horoscopes.map((horoscope, index) => (
            <motion.div
              key={horoscope.sign}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardContent className="p-6">
                  {/* Zodiac icon */}
                  <div className="text-center mb-4">
                    <span className="text-5xl">{horoscope.icon}</span>
                    <h3 className="text-lg font-bold text-foreground mt-2">
                      {horoscope.sign}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {horoscope.dateRange}
                    </p>
                  </div>

                  {/* Rating */}
                  <div className="flex justify-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "w-4 h-4",
                          i < Math.floor(horoscope.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-border fill-border"
                        )}
                      />
                    ))}
                    <span className="text-xs text-muted-foreground ml-1">
                      {horoscope.rating}
                    </span>
                  </div>

                  {/* Summary */}
                  <p className="text-sm text-muted-foreground text-center mb-4 line-clamp-3">
                    {horoscope.summary}
                  </p>

                  {/* Details */}
                  <div className="space-y-2 text-xs border-t border-border pt-3">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Element</span>
                      <span className="font-medium text-foreground">
                        {horoscope.element}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Mood</span>
                      <span className="font-medium text-foreground">
                        {horoscope.mood}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Lucky Color</span>
                      <span
                        className="font-medium text-foreground"
                        style={{ color: horoscope.luckyColor }}
                      >
                        {horoscope.luckyColor}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Lucky Number</span>
                      <span className="font-bold text-saffron">
                        {horoscope.luckyNumber}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}