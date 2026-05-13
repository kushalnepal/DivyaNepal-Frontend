"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { Calendar, Check, Clock, MapPin, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

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

const packages: Record<string, Package> = {
  "1": {
    id: "1",
    name: "Kathmandu Sacred Tour",
    slug: "kathmandu-sacred-tour",
    description: "Explore the spiritual heart of Kathmandu with visits to Pashupatinath, Swayambhunath, and Boudhanath.",
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
    description: "Journey to the birthplace of Lord Buddha and explore the sacred gardens of Lumbini.",
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
    description: "A transformative journey to the sacred Muktinath temple in the Himalayas.",
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
    description: "Explore the land of Goddess Sita and discover Mithila culture.",
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
    description: "Visit the most sacred Hindu temples across three major regions.",
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

function BookingForm() {
  const searchParams = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  );
  const packageId = searchParams.get("package") || "1";
  const pkg = packages[packageId as keyof typeof packages] || packages["1"];

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
      <section className="bg-saffron py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Book Your Spiritual Journey
          </h1>
          <p className="text-white/90 max-w-2xl">
            Fill in the details below and we&apos;ll confirm your booking shortly
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Your Details</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Selected package banner */}
                <div className="mb-6 p-4 bg-saffron/5 border border-saffron/20 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-foreground">{pkg.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        <Clock className="w-3 h-3 inline mr-1" />
                        {pkg.duration} &bull; {pkg.category}
                      </p>
                    </div>
                    <Link href="/packages" className="text-sm text-saffron hover:underline">
                      Change Package
                    </Link>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Travel Date *
                      </label>
                      <Input
                        type="date"
                        value={formData.travelDate}
                        onChange={(e) =>
                          setFormData({ ...formData, travelDate: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Number of Passengers *
                      </label>
                      <Input
                        type="number"
                        min="1"
                        max="10"
                        value={formData.passengers}
                        onChange={(e) =>
                          setFormData({ ...formData, passengers: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="font-semibold mb-4">Traveler Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Full Name *
                        </label>
                        <Input
                          placeholder="As per passport"
                          value={formData.guestName}
                          onChange={(e) =>
                            setFormData({ ...formData, guestName: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Email *
                        </label>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          value={formData.guestEmail}
                          onChange={(e) =>
                            setFormData({ ...formData, guestEmail: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="text-sm font-medium mb-2 block">
                        Phone Number *
                      </label>
                      <Input
                        type="tel"
                        placeholder="+977 98XXXXXXXX"
                        value={formData.guestPhone}
                        onChange={(e) =>
                          setFormData({ ...formData, guestPhone: e.target.value })
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
                        setFormData({ ...formData, specialRequests: e.target.value })
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

          {/* Booking Summary — Now Dynamic */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Package Name & Duration */}
                <div>
                  <p className="font-semibold text-lg">{pkg.name}</p>
                  <p className="text-sm text-muted-foreground flex items-center mt-1">
                    <Clock className="w-4 h-4 mr-1" />
                    {pkg.duration}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    {pkg.category}
                  </p>
                </div>

                {/* Temples Visited */}
                <div>
                  <p className="text-sm font-medium mb-1.5">Temples Visited</p>
                  <div className="flex flex-wrap gap-1.5">
                    {pkg.temples.map((temple) => (
                      <span
                        key={temple}
                        className="bg-saffron/10 text-saffron text-xs px-2 py-1 rounded-full"
                      >
                        {temple}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pricing */}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Price per person</span>
                    {pkg.discountPrice ? (
                      <>
                        <span className="text-muted-foreground line-through text-sm">
                          NPR {pkg.price.toLocaleString()}
                        </span>
                        <span className="font-semibold text-saffron">
                          NPR {pkg.discountPrice.toLocaleString()}
                        </span>
                      </>
                    ) : (
                      <span className="font-semibold">
                        NPR {pkg.price.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Passengers</span>
                    <span className="font-medium">
                      {formData.passengers}
                    </span>
                  </div>
                </div>

                {/* Total */}
                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-saffron">
                      NPR
                      {(pkg.discountPrice
                        ? pkg.discountPrice
                        : pkg.price *
                          parseInt(formData.passengers || "1")).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Dynamic "Whats Included" — now driven by package data */}
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-medium mb-2 flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-success" />
                    What&apos;s Included
                  </p>
                  <ul className="text-sm space-y-1.5">
                    {pkg.includes.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-success shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Description */}
                <div className="bg-white/60 p-3 rounded-lg border border-border/50">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {pkg.description}
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

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-cream flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-saffron"></div>
        </div>
      }
    >
      <BookingForm />
    </Suspense>
  );
}