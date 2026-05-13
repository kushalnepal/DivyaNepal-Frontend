"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Calendar,
  Check,
  Clock,
  Tag,
  Star,
  User,
  PhoneCall,
  Moon,
  Sun,
  MapPin,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

// ============ DATA ============

interface Package {
  id: string;
  name: string;
  slug: string;
  description: string;
  duration: string;
  category: string;
  price: number;
  discountPrice?: number;
  temples: string[];
  includes: string[];
}

interface Pandit {
  id: string;
  name: string;
  specialization: string;
  experience: string;
  rating: number;
  reviewCount: number;
  fee: number;
}

const packages: Record<string, Package> = {
  "1": {
    id: "1",
    name: "Kathmandu Sacred Tour",
    slug: "kathmandu-sacred-tour",
    description:
      "Explore the spiritual heart of Kathmandu with visits to Pashupatinath, Swayambhunath, and Boudhanath.",
    duration: "3 Days 2 Nights",
    price: 15000,
    discountPrice: 12500,
    category: "Spiritual",
    temples: ["Pashupatinath", "Swayambhunath", "Boudhanath"],
    includes: ["AC accommodation", "Guide", "Airport transfer", "Breakfast"],
  },
  "2": {
    id: "2",
    name: "Lumbini Pilgrimage",
    slug: "lumbini-pilgrimage",
    description:
      "Journey to the birthplace of Lord Buddha and explore the sacred gardens of Lumbini.",
    duration: "4 Days 3 Nights",
    price: 25000,
    discountPrice: 22000,
    category: "Pilgrimage",
    temples: ["Lumbini Garden", "Mayadevi Temple", "Ashoka Pillar"],
    includes: ["AC accommodation", "Guide", "Flights", "All meals"],
  },
  "3": {
    id: "3",
    name: "Muktinath Holy Journey",
    slug: "muktinath-holy-journey",
    description:
      "A transformative journey to the sacred Muktinath temple in the Himalayas.",
    duration: "6 Days 5 Nights",
    price: 45000,
    discountPrice: 39999,
    category: "Pilgrimage",
    temples: ["Muktinath", "Jwala Mai", "Dharma Chakra"],
    includes: ["AC accommodation", "4x4 jeep", "Guide", "All meals", "Porter"],
  },
  "4": {
    id: "4",
    name: "Janakpur & Mithila Tour",
    slug: "janakpur-mithila-tour",
    description:
      "Explore the land of Goddess Sita and discover Mithila culture.",
    duration: "3 Days 2 Nights",
    price: 12000,
    discountPrice: 9999,
    category: "Cultural",
    temples: ["Janaki Temple", "Dhaneshwar Sthan"],
    includes: ["Hotel", "Guide", "Train", "Breakfast"],
  },
  "5": {
    id: "5",
    name: "Hindu Golden Triangle",
    slug: "hindu-golden-triangle",
    description:
      "Visit the most sacred Hindu temples across three major regions.",
    duration: "5 Days 4 Nights",
    price: 35000,
    discountPrice: 29999,
    category: "Spiritual",
    temples: ["Pashupatinath", "Muktinath", "Manakamana"],
    includes: ["AC accommodation", "Private vehicle", "Guide", "All meals"],
  },
  "6": {
    id: "6",
    name: "Budget Pilgrimage",
    slug: "budget-pilgrimage",
    description: "An affordable spiritual journey for devotees on a budget.",
    duration: "5 Days 4 Nights",
    price: 15000,
    discountPrice: 12999,
    category: "Budget",
    temples: ["Pashupatinath", "Swayambhunath", "Boudhanath"],
    includes: ["Standard hotel", "Shared vehicle", "Basic meals"],
  },
};

const pandits: Record<string, Pandit> = {
  "1": {
    id: "1",
    name: "Pandit Ram Sharma",
    specialization: "Vedic Astrology",
    experience: "25+ years",
    rating: 4.9,
    reviewCount: 1280,
    fee: 2500,
  },
  "2": {
    id: "2",
    name: "Acharya Krishna Joshi",
    specialization: "Kundali Matching",
    experience: "20+ years",
    rating: 4.8,
    reviewCount: 950,
    fee: 3000,
  },
  "3": {
    id: "3",
    name: "Guru Mahadev Bhatt",
    specialization: "Graha Shanti & Rudrabhishek",
    experience: "30+ years",
    rating: 4.9,
    reviewCount: 1540,
    fee: 5000,
  },
  "4": {
    id: "4",
    name: "Pandit Suresh Adhikari",
    specialization: "Temple Rituals",
    experience: "18+ years",
    rating: 4.7,
    reviewCount: 720,
    fee: 2000,
  },
  "5": {
    id: "5",
    name: "Acharya Binod Nepal",
    specialization: "Marriage & Griha Pravesh Puja",
    experience: "22+ years",
    rating: 4.8,
    reviewCount: 1100,
    fee: 3500,
  },
  "6": {
    id: "6",
    name: "Pandit Gopal Prasad",
    specialization: "Vedic Astrology & Remedial Puja",
    experience: "28+ years",
    rating: 4.9,
    reviewCount: 1450,
    fee: 4000,
  },
};

// ============ ASTROLOGER BOOKING FORM ============

function AstrologerBookingForm({ pandit }: { pandit: Pandit }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    consultationDate: "",
    preferredTime: "morning",
    consultationType: "video",
    questions: "",
  });

  const consultationTypes = [
    { value: "video", label: "📹 Video Call" },
    { value: "chat", label: "💬 Chat / Text" },
    { value: "phone", label: "📞 Phone Call" },
  ];

  const timeSlots = [
    { value: "morning", label: "🌅 Morning (6 AM - 12 PM)" },
    { value: "afternoon", label: "☀️ Afternoon (12 PM - 5 PM)" },
    { value: "evening", label: "🌙 Evening (5 PM - 9 PM)" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Astrologer booking submitted:", { pandit, ...formData });
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="bg-gradient-to-r from-saffron to-gold py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Book Consultation with {pandit.name}
          </h1>
          <p className="text-white/90 max-w-2xl mx-auto">
            Connect with our verified astrologer for personalized spiritual
            guidance
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Booking Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-saffron" />
                    Consultation Details
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Pandit Banner */}
                <div className="mb-6 p-4 bg-saffron/5 border border-saffron/20 rounded-lg flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-saffron/20 flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6 text-saffron" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">
                      {pandit.name}
                    </h3>
                    <p className="text-sm text-saffron">
                      {pandit.specialization}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {pandit.experience} experience &bull; {pandit.rating}{" "}
                      ★ ({pandit.reviewCount} reviews)
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Info */}
                  <div>
                    <h3 className="text-sm font-semibold mb-3 flex items-center gap-1.5">
                      <User className="w-4 h-4 text-saffron" />
                      Your Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">
                          Full Name *
                        </label>
                        <Input
                          placeholder="Your full name"
                          value={formData.fullName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              fullName: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">
                          Email *
                        </label>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="text-sm font-medium mb-1.5 block">
                        Phone Number *
                      </label>
                      <Input
                        type="tel"
                        placeholder="+977 98XXXXXXXX"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="border-t pt-4" />

                  {/* Consultation Schedule */}
                  <div>
                    <h3 className="text-sm font-semibold mb-3 flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-saffron" />
                      Consultation Schedule
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">
                          Preferred Date *
                        </label>
                        <Input
                          type="date"
                          value={formData.consultationDate}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              consultationDate: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">
                          Preferred Time *
                        </label>
                        <select
                          value={formData.preferredTime}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              preferredTime: e.target.value,
                            })
                          }
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        >
                          {timeSlots.map((slot) => (
                            <option key={slot.value} value={slot.value}>
                              {slot.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="text-sm font-medium mb-1.5 block">
                        Consultation Type *
                      </label>
                      <select
                        value={formData.consultationType}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            consultationType: e.target.value,
                          })
                        }
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      >
                        {consultationTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <label className="text-sm font-medium mb-1.5 block">
                      Questions or Topics (optional)
                    </label>
                    <textarea
                      className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      placeholder="Mention specific questions about your kundali, marriage, career, etc."
                      value={formData.questions}
                      onChange={(e) =>
                        setFormData({ ...formData, questions: e.target.value })
                      }
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    <PhoneCall className="w-4 h-4 mr-2" />
                    Confirm Astrologer Consultation
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Right: Summary */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Consultation Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-saffron/20 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-saffron" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">{pandit.name}</p>
                    <p className="text-sm text-saffron">
                      {pandit.specialization}
                    </p>
                  </div>
                </div>

                <div className="border-t pt-3" />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Experience</span>
                    <span className="font-medium">{pandit.experience}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Rating</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{pandit.rating}</span>
                      <span className="text-muted-foreground">
                        ({pandit.reviewCount})
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-3" />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Consultation Fee
                    </span>
                    <span className="font-bold text-saffron">
                      NPR {pandit.fee.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Consultation Type
                    </span>
                    <span className="font-medium capitalize">
                      {formData.consultationType === "video"
                        ? "Video Call"
                        : formData.consultationType === "chat"
                        ? "Chat / Text"
                        : "Phone Call"}
                    </span>
                  </div>
                  {formData.consultationDate && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Date</span>
                      <span className="font-medium">
                        {new Date(
                          formData.consultationDate + "T00:00:00"
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  )}
                </div>

                <div className="border-t pt-3" />

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-saffron">
                    NPR {pandit.fee.toLocaleString()}
                  </span>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-medium mb-2 flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-success" />
                    What&apos;s Included
                  </p>
                  <ul className="text-sm space-y-1.5">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-success shrink-0" />
                      <span className="text-muted-foreground">
                        1-on-1 Personalized Session
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-success shrink-0" />
                      <span className="text-muted-foreground">
                        Kundali Analysis & Reading
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-success shrink-0" />
                      <span className="text-muted-foreground">
                        Gemstone & Remedy Guidance
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-success shrink-0" />
                      <span className="text-muted-foreground">
                        7 Days Follow-up Support
                      </span>
                    </li>
                  </ul>
                </div>

                <p className="text-xs text-muted-foreground text-center">
                  You won&apos;t be charged until the pandit confirms.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ PACKAGE BOOKING FORM ============

function PackageBookingForm({
  pkg,
  defaultPkg,
}: {
  pkg: Package | null;
  defaultPkg: Package;
}) {
  const activePkg = pkg || defaultPkg;
  const [formData, setFormData] = useState({
    travelDate: "",
    passengers: "1",
    guestName: "",
    guestEmail: "",
    guestPhone: "",
    specialRequests: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Booking submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="bg-gradient-to-r from-saffron to-gold py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Book Your Spiritual Journey
          </h1>
          <p className="text-white/90 max-w-2xl mx-auto">
            Fill in the details below and we&apos;ll confirm your booking shortly
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Booking Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>
                  <div className="flex items-center justify-between">
                    <span>Your Details</span>
                    <Link
                      href="/packages"
                      className="text-sm text-saffron hover:underline"
                    >
                      Change Package
                    </Link>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Selected Package Banner */}
                <div className="mb-6 p-4 bg-saffron/5 border border-saffron/20 rounded-lg">
                  <h3 className="font-bold text-foreground">
                    {activePkg.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    <Clock className="w-3 h-3 inline mr-1" />
                    {activePkg.duration} &bull; {activePkg.category}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">
                        Travel Date *
                      </label>
                      <Input
                        type="date"
                        value={formData.travelDate}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            travelDate: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">
                        Number of Passengers *
                      </label>
                      <Input
                        type="number"
                        min="1"
                        max="10"
                        value={formData.passengers}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            passengers: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="font-semibold mb-4">Traveler Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">
                          Full Name *
                        </label>
                        <Input
                          placeholder="As per passport"
                          value={formData.guestName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              guestName: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">
                          Email *
                        </label>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          value={formData.guestEmail}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              guestEmail: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="text-sm font-medium mb-1.5 block">
                        Phone Number *
                      </label>
                      <Input
                        type="tel"
                        placeholder="+977 98XXXXXXXX"
                        value={formData.guestPhone}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            guestPhone: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <label className="text-sm font-medium mb-2 block">
                      Special Requests (optional)
                    </label>
                    <textarea
                      className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      placeholder="Any dietary requirements, accessibility needs, or special arrangements..."
                      value={formData.specialRequests}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          specialRequests: e.target.value,
                        })
                      }
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Confirm Booking
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Right: Package Summary */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-semibold text-lg">{activePkg.name}</p>
                  <p className="text-sm text-muted-foreground flex items-center mt-1">
                    <Clock className="w-4 h-4 mr-1" />
                    {activePkg.duration}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    {activePkg.category}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium mb-1.5">Temples Visited</p>
                  <div className="flex flex-wrap gap-1.5">
                    {activePkg.temples.map((temple) => (
                      <span
                        key={temple}
                        className="bg-saffron/10 text-saffron text-xs px-2 py-1 rounded-full"
                      >
                        {temple}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Price per person
                    </span>
                    {activePkg.discountPrice ? (
                      <>
                        <span className="text-muted-foreground line-through text-sm">
                          NPR {activePkg.price.toLocaleString()}
                        </span>
                        <span className="font-semibold text-saffron">
                          NPR {activePkg.discountPrice.toLocaleString()}
                        </span>
                      </>
                    ) : (
                      <span className="font-semibold">
                        NPR {activePkg.price.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Passengers</span>
                    <span className="font-medium">{formData.passengers}</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-saffron">
                      NPR{" "}
                      {(
                        (activePkg.discountPrice || activePkg.price) *
                        parseInt(formData.passengers || "1")
                      ).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-medium mb-2 flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-success" />
                    What&apos;s Included
                  </p>
                  <ul className="text-sm space-y-1.5">
                    {activePkg.includes.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-success shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white/60 p-3 rounded-lg border border-border/50">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {activePkg.description}
                  </p>
                </div>

                <p className="text-xs text-muted-foreground text-center">
                  You won&apos;t be charged until we confirm your booking.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ BOOKING MODE TOGGLE ============

function BookingModeToggle() {
  const [mode, setMode] = useState<"astrologer" | "package">("astrologer");

  return (
    <div className="flex justify-center mb-8">
      <div className="inline-flex bg-white rounded-xl p-1 shadow-md border border-border">
        <button
          onClick={() => setMode("astrologer")}
          className={cn(
            "px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-2",
            mode === "astrologer"
              ? "bg-saffron text-white shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <User className="w-4 h-4" />
          Online Astrologer
        </button>
        <button
          onClick={() => setMode("package")}
          className={cn(
            "px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-2",
            mode === "package"
              ? "bg-saffron text-white shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <MapPin className="w-4 h-4" />
          Temple Packages
        </button>
      </div>
    </div>
  );
}

// ============ MAIN BOOKING PAGE ============

function BookingContent() {
  const searchParams = useSearchParams();
  const packageId = searchParams.get("package");
  const panditId = searchParams.get("pandit");

  const pkg = packageId
    ? packages[packageId as keyof typeof packages] || null
    : null;
  const pandit = panditId
    ? pandits[panditId as keyof typeof pandits] || null
    : null;

  const defaultPkg = packages["1"];

  // If a specific item is in the URL, use it; otherwise let user pick via toggle
  const hasUrlParam = !!pkg || !!pandit;

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Toggle */}
        <BookingModeToggle />

        {hasUrlParam ? (
          // Direct link: show the specific form
          pandit ? (
            <AstrologerBookingForm pandit={pandit} />
          ) : pkg ? (
            <PackageBookingForm pkg={pkg} defaultPkg={defaultPkg} />
          ) : null
        ) : (
          // No URL param yet — show default + a "Featured" section
          <div className="text-center py-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">
              Choose Your Booking Type
            </h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
              Book an online astrologer consultation or a guided temple
              pilgrimage package
            </p>

            {/* Featured Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Astrologer preview */}
              <Card className="group hover:shadow-xl transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-saffron to-gold rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-saffron/30">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Online Astrologer</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    1-on-1 consultation with verified pandits — astrology, kundali
                    matching, remedies, and spiritual guidance.
                  </p>
                  <Link href="/booking?pandit=1">
                    <Button className="bg-saffron text-white hover:bg-saffron-dark">
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Astrologer
                    </Button>
                  </Link>
                  <div className="mt-3 flex items-center justify-center gap-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-muted-foreground">
                      4.9 avg rating • From NPR 2,500
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Package preview */}
              <Card className="group hover:shadow-xl transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-saffron/10 to-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-saffron/30">
                    <MapPin className="w-8 h-8 text-saffron" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Temple Packages</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Curated multi-day pilgrimage packages with AC stay,
                    professional guides, and full meals.
                  </p>
                  <Link href="/booking?package=1">
                    <Button className="bg-saffron text-white hover:bg-saffron-dark">
                      <MapPin className="w-4 h-4 mr-2" />
                      Explore Packages
                    </Button>
                  </Link>
                  <div className="mt-3 flex items-center justify-center gap-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-muted-foreground">
                      6 packages • NPR 9,999 – 45,000
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick peek at top astrologers */}
            <div className="mt-16">
              <h3 className="text-xl font-bold mb-6 text-center">
                <span className="text-saffron">Top Astrologers</span> Available
                Now
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { id: "1", name: "Pandit Ram Sharma", spec: "Vedic Astrology", fee: 2500, rating: 4.9, online: true },
                  { id: "2", name: "Acharya Krishna Joshi", spec: "Kundali Matching", fee: 3000, rating: 4.8, online: true },
                  { id: "3", name: "Guru Mahadev Bhatt", spec: "Graha Shanti", fee: 5000, rating: 4.9, online: true },
                ].map((p) => (
                  <Link key={p.id} href={`/booking?pandit=${p.id}`}>
                    <Card className="hover:shadow-lg transition-shadow p-4 text-center">
                      <div className="w-14 h-14 rounded-full bg-saffron/20 flex items-center justify-center mx-auto mb-3">
                        <User className="w-6 h-6 text-saffron" />
                      </div>
                      <h4 className="font-semibold">{p.name}</h4>
                      <p className="text-xs text-saffron">{p.spec}</p>
                      <div className="flex items-center justify-center gap-1 mt-1">
                        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{p.rating}</span>
                      </div>
                      <p className="text-sm font-medium mt-1">
                        NPR {p.fee.toLocaleString()}
                      </p>
                      {p.online && (
                        <span className="inline-flex items-center gap-1 text-xs text-emerald-600 mt-1">
                          <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                          Online
                        </span>
                      )}
                    </Card>
                  </Link>
                ))}
              </div>
              <div className="text-center mt-6">
                <Link href="/">
                  <Button variant="outline">
                    View All Astrologers
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero — shared for both modes */}
      <section className="bg-gradient-to-r from-saffron to-gold py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Book Your Spiritual Journey
          </h1>
          <p className="text-white/90 max-w-2xl mx-auto">
            Whether you seek divine guidance or a sacred pilgrimage, we have
            you covered
          </p>
        </div>
      </section>

      <Suspense
        fallback={
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-saffron"></div>
          </div>
        }
      >
        <BookingContent />
      </Suspense>
    </div>
  );
}