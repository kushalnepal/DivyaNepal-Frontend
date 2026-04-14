"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { Calendar, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const packages = {
  "1": {
    name: "Kathmandu Sacred Tour",
    price: 12500,
    duration: "3 Days 2 Nights",
  },
  "2": {
    name: "Lumbini Pilgrimage",
    price: 22000,
    duration: "4 Days 3 Nights",
  },
  "3": {
    name: "Muktinath Holy Journey",
    price: 39999,
    duration: "6 Days 5 Nights",
  },
};

function BookingForm() {
  const searchParams = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
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
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Your Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Travel Date *</label>
                      <Input
                        type="date"
                        value={formData.travelDate}
                        onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Number of Passengers *</label>
                      <Input
                        type="number"
                        min="1"
                        max="10"
                        value={formData.passengers}
                        onChange={(e) => setFormData({ ...formData, passengers: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="font-semibold mb-4">Traveler Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Full Name *</label>
                        <Input
                          placeholder="As per passport"
                          value={formData.guestName}
                          onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Email *</label>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          value={formData.guestEmail}
                          onChange={(e) => setFormData({ ...formData, guestEmail: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="text-sm font-medium mb-2 block">Phone Number *</label>
                      <Input
                        type="tel"
                        placeholder="+977 98XXXXXXXX"
                        value={formData.guestPhone}
                        onChange={(e) => setFormData({ ...formData, guestPhone: e.target.value })}
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
                      onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Confirm Booking
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-semibold text-lg">{pkg.name}</p>
                  <p className="text-sm text-muted-foreground flex items-center mt-1">
                    <Calendar className="w-4 h-4 mr-1" />
                    {pkg.duration}
                  </p>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">Price per person</span>
                    <span>NPR {pkg.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">Passengers</span>
                    <span>{formData.passengers}</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-saffron">
                      NPR {(pkg.price * parseInt(formData.passengers || "1")).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm font-medium mb-2">Whats Included:</p>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-success mr-2" />
                      Accommodation
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-success mr-2" />
                      Guide services
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-success mr-2" />
                      Airport transfer
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-success mr-2" />
                      Breakfast
                    </li>
                  </ul>
                </div>

                <p className="text-xs text-muted-foreground">
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
    <Suspense fallback={<div className="min-h-screen bg-cream flex items-center justify-center">Loading...</div>}>
      <BookingForm />
    </Suspense>
  );
}