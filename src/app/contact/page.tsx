"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <section className="bg-saffron py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-white/90 max-w-2xl">
            Have questions? We&apos;d love to hear from you. Get in touch with our team.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            <p className="text-muted-foreground mb-8">
              Whether you have questions about booking a puja, need help planning your pilgrimage, 
              or want to become a service provider, we&apos;re here to help.
            </p>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-saffron/10 p-3 rounded-lg">
                  <MapPin className="w-6 h-6 text-saffron" />
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold">Address</h3>
                  <p className="text-muted-foreground">
                    Thamel, Kathmandu 44600<br />
                    Nepal
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-saffron/10 p-3 rounded-lg">
                  <Mail className="w-6 h-6 text-saffron" />
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-muted-foreground">info@divyanepal.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-saffron/10 p-3 rounded-lg">
                  <Phone className="w-6 h-6 text-saffron" />
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-muted-foreground">+977 1 234 5678</p>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="mt-8 h-64 bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Map will appear here</p>
            </div>
          </div>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Name</label>
                    <Input
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email</label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Phone (optional)</label>
                    <Input
                      type="tel"
                      placeholder="+977 98XXXXXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Subject</label>
                    <Input
                      placeholder="What is this about?"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Message</label>
                  <textarea
                    className="flex min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Tell us more about your inquiry..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}