"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Star, Clock, MessageCircle, Phone, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { PanditAvatar } from "./PanditAvatar";
import { useState } from "react";

interface Pandit {
  id: string;
  name: string;
  specialization: string;
  experience: string;
  rating: number;
  reviewCount: number;
  isOnline: boolean;
  fee: number;
  avatarColor: string;
  languages: string[];
  image: string;
}

const pandits: Pandit[] = [
  {
    id: "1",
    name: "Pandit Ram Sharma",
    specialization: "Vedic Astrology",
    experience: "25+ years",
    rating: 4.9,
    reviewCount: 1280,
    isOnline: true,
    fee: 2500,
    avatarColor: "#FF9933",
    languages: ["Nepali", "Hindi", "English"],
    image: "/images/pandits/random pandits/akshat-jhingran-YlM-YEcuj6g-unsplash.jpg",
  },
  {
    id: "2",
    name: "Acharya Krishna Joshi",
    specialization: "Kundali Matching",
    experience: "20+ years",
    rating: 4.8,
    reviewCount: 950,
    isOnline: true,
    fee: 3000,
    avatarColor: "#C62828",
    languages: ["Nepali", "Sanskrit"],
    image: "/images/pandits/random pandits/alisha-limbu-DQ2PQUcPgdQ-unsplash.jpg",
  },
  {
    id: "3",
    name: "Guru Mahadev Bhatt",
    specialization: "Graha Shanti & Rudrabhishek",
    experience: "30+ years",
    rating: 4.9,
    reviewCount: 1540,
    isOnline: true,
    fee: 5000,
    avatarColor: "#1B5E20",
    languages: ["Nepali", "Hindi"],
    image: "/images/pandits/random pandits/arto-suraj-tx3bAYBvcx8-unsplash.jpg",
  },
  {
    id: "4",
    name: "Pandit Suresh Adhikari",
    specialization: "Temple Rituals",
    experience: "18+ years",
    rating: 4.7,
    reviewCount: 720,
    isOnline: false,
    fee: 2000,
    avatarColor: "#4A148C",
    languages: ["Nepali", "English"],
    image: "/images/pandits/random pandits/olivier-guillard-ps3HTqoWxD8-unsplash.jpg",
  },
  {
    id: "5",
    name: "Acharya Binod Nepal",
    specialization: "Marriage & Griha Pravesh Puja",
    experience: "22+ years",
    rating: 4.8,
    reviewCount: 1100,
    isOnline: true,
    fee: 3500,
    avatarColor: "#E65100",
    languages: ["Nepali", "Hindi", "English"],
    image: "/images/pandits/random pandits/samrat-khadka-0vQlbw5Fu6g-unsplash.jpg",
  },
  {
    id: "6",
    name: "Pandit Gopal Prasad",
    specialization: "Vedic Astrology & Remedial Puja",
    experience: "28+ years",
    rating: 4.9,
    reviewCount: 1450,
    isOnline: true,
    fee: 4000,
    avatarColor: "#00695C",
    languages: ["Nepali", "Hindi", "English"],
    image: "/images/pandits/random pandits/church-of-the-king-t20gLkbP2hI-unsplash.jpg",
  },
];

function PanditImage({
  src,
  name,
  size,
}: {
  src: string;
  name: string;
  size: number;
}) {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return <PanditAvatar name={name} size={size} />;
  }

  return (
    <>
      <Image
        src={src}
        alt={name}
        width={size}
        height={size}
        className="w-full h-full object-cover"
        onError={() => setImageError(true)}
        unoptimized
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-full" />
    </>
  );
}

export function PanditCard({ pandit, index }: { pandit: Pandit; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Card
        className={cn(
          "group relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
        )}
      >
        {/* Decorative top accent */}
        <div
          className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-saffron via-gold to-saffron opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          aria-hidden="true"
        />

        {/* Subtle mandala-inspired background patterns */}
        <div
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-saffron/5 blur-3xl group-hover:bg-saffron/10 transition-colors duration-500"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-gold/5 blur-3xl group-hover:bg-gold/10 transition-colors duration-500"
          aria-hidden="true"
        />

        <div className="relative p-6">
          {/* Online status badge */}
          <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
            <span
              className={cn(
                "flex h-3 w-3 rounded-full",
                pandit.isOnline ? "bg-green-500" : "bg-gray-400"
              )}
            >
              <span
                className={cn(
                  "inline-flex h-full w-full rounded-full",
                  pandit.isOnline ? "animate-ping bg-green-400/40" : ""
                )}
              />
            </span>
            <span className="text-xs font-medium text-muted-foreground">
              {pandit.isOnline ? "Online" : "Offline"}
            </span>
          </div>

          {/* Photo Avatar with SVG fallback */}
          <div className="flex justify-center mb-4">
            <div
              className={cn(
                "relative h-20 w-20 border-4 border-white shadow-lg transition-transform duration-500 group-hover:scale-105 overflow-hidden rounded-full"
              )}
            >
              <PanditImage
                src={pandit.image}
                name={pandit.name}
                size={80}
              />
            </div>
          </div>

          {/* Name & Specialization */}
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold text-foreground mb-1">
              {pandit.name}
            </h3>
            <p className="text-sm text-saffron font-medium">
              {pandit.specialization}
            </p>
          </div>

          {/* Om divider */}
          <div className="flex items-center justify-center gap-2 my-4">
            <div className="flex-1 h-px bg-border" />
            <span className="text-saffron font-semibold text-xs tracking-widest">
              ॐ
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Details */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Experience</span>
              <span className="font-medium text-foreground">
                {pandit.experience}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Rating</span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{pandit.rating}</span>
                <span className="text-muted-foreground">
                  ({pandit.reviewCount})
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Languages</span>
              <span className="font-medium text-foreground">
                {pandit.languages.join(", ")}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-1">
                <Clock className="w-4 h-4" />
                Consultation Fee
              </span>
              <span className="font-bold text-saffron text-base">
                NPR {pandit.fee.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            <Link href={`/booking?pandit=${pandit.id}`} className="flex-1">
              <Button className="w-full" size="lg">
                <Calendar className="w-4 h-4 mr-2" />
                Book Now
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="flex-1 border-saffron text-saffron hover:bg-saffron hover:text-white"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-warm-brown text-warm-brown hover:bg-warm-brown hover:text-white"
            >
              <Phone className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export { pandits };