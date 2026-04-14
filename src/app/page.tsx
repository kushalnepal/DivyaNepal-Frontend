import Image from "next/image";
import Link from "next/link";
import { Search, MapPin, Calendar, Star, ArrowRight, Heart, Award, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TempleCard } from "@/components/temples/temple-card";

const featuredTemples = [
  {
    id: "1",
    name: "Pashupatinath Temple",
    slug: "pashupatinath",
    description: "One of the oldest and most sacred Hindu temples dedicated to Lord Shiva, located on the banks of the Bagmati River.",
    city: "Kathmandu",
    district: "Kathmandu",
    region: "Bagmati",
    type: "HINDU" as const,
    images: ["/images/temples/Pashupatinath.jpg"],
    mainDeity: "Lord Pashupatinath",
    isFeatured: true,
    isVerified: true,
    rating: 4.8,
    reviewCount: 1250,
  },
  {
    id: "2",
    name: "Swayambhunath Temple",
    slug: "swayambhunath",
    description: "The oldest Buddhist stupa in Nepal, also known as the Monkey Temple, offering panoramic views of the Kathmandu Valley.",
    city: "Kathmandu",
    district: "Kathmandu",
    region: "Bagmati",
    type: "SACRED" as const,
    images: ["/images/temples/Swayambhunath.jpg"],
    mainDeity: "Buddha",
    isFeatured: true,
    isVerified: true,
    rating: 4.7,
    reviewCount: 980,
  },
  {
    id: "3",
    name: "Boudhanath Stupa",
    slug: "boudhanath",
    description: "One of the largest spherical stupas in the world and a UNESCO World Heritage Site.",
    city: "Kathmandu",
    district: "Kathmandu",
    region: "Bagmati",
    type: "BUDDHIST" as const,
    images: ["/images/temples/Boudhanath.jpg"],
    mainDeity: "Buddha",
    isFeatured: true,
    isVerified: true,
    rating: 4.9,
    reviewCount: 1500,
  },
  {
    id: "4",
    name: "Lumbini",
    slug: "lumbini",
    description: "The birthplace of Lord Buddha, a UNESCO World Heritage Site and major pilgrimage destination.",
    city: "Lumbini",
    district: "Rupandehi",
    region: "Lumbini",
    type: "BUDDHIST" as const,
    images: ["/images/temples/Lumbini.jpg"],
    mainDeity: "Buddha",
    isFeatured: true,
    isVerified: true,
    rating: 4.9,
    reviewCount: 2100,
  },
  {
    id: "5",
    name: "Muktinath Temple",
    slug: "muktinath",
    description: "A sacred pilgrimage site for both Hindus and Buddhists, located at an altitude of 3,800 meters.",
    city: "Muktinath",
    district: "Mustang",
    region: "Gandaki",
    type: "HINDU" as const,
    images: ["/images/temples/Muktinath Temple.jpg"],
    mainDeity: "Lord Vishnu",
    isFeatured: true,
    isVerified: true,
    rating: 4.6,
    reviewCount: 750,
  },
];

const features = [
  {
    icon: Award,
    title: "Verified Temples",
    description: "All temples verified by local authorities",
  },
  {
    icon: Calendar,
    title: "Easy Booking",
    description: "Book pujas and packages in minutes",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock assistance for pilgrims",
  },
  {
    icon: Heart,
    title: "Authentic Experience",
    description: "Traditional rituals and ceremonies",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center">
        <Image
          src="/images/temples/Pashupatinath.jpg"
          alt="Pashupatinath Temple"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <p className="text-2xl text-yellow-400 italic font-serif tracking-widest mb-2">अतिथि देवो भवः</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Your Spiritual Journey to Nepal
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Discover sacred temples, book divine pujas, and experience the wisdom of ancient dharma
          </p>
          
          {/* Search Box */}
          <div className="bg-white rounded-lg p-4 shadow-xl max-w-2xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-3 text-gray-400" />
                <Input
                  placeholder="Search temples, destinations..."
                  className="pl-10 h-12"
                />
              </div>
              <Link href="/temples">
                <Button size="lg" className="h-12 px-8">
                  <Search className="w-5 h-5 mr-2" />
                  Search
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-saffron/10 mb-4">
                  <feature.icon className="w-8 h-8 text-saffron" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Temples */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Sacred Destinations</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore the most revered temples and pilgrimage sites in Nepal
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTemples.slice(0, 6).map((temple) => (
              <TempleCard key={temple.id} temple={temple as any} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/temples">
              <Button size="lg" variant="outline">
                View All Temples
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Packages */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Packages</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Curated pilgrimage experiences for your spiritual journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Kathmandu Sacred Tour",
                duration: "3 Days 2 Nights",
                price: 15000,
                temples: 5,
              },
              {
                name: "Lumbini Pilgrimage",
                duration: "4 Days 3 Nights",
                price: 25000,
                temples: 4,
              },
              {
                name: "Muktinath Holy Journey",
                duration: "6 Days 5 Nights",
                price: 45000,
                temples: 6,
              },
            ].map((pkg, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <h3 className="text-xl font-semibold">{pkg.name}</h3>
                  <p className="text-muted-foreground">{pkg.duration}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Visit {pkg.temples} sacred temples with guided tours and comfortable accommodation
                  </p>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold">NPR {pkg.price.toLocaleString()}</span>
                    <span className="text-muted-foreground ml-1">/person</span>
                  </div>
                </CardContent>
                <CardContent>
                  <Link href={`/booking?package=${index + 1}`}>
                    <Button className="w-full">Book Now</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/packages">
              <Button size="lg" variant="outline">
                View All Packages
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-saffron">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#3E2723] mb-4">
            Begin Your Spiritual Journey
          </h2>
          <p className="text-xl text-[#3E2723]/90 mb-8">
            Let us help you plan the perfect pilgrimage to Nepal&apos;s sacred lands
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-saffron">
                Contact Us
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/temples">
              <Button size="lg" variant="outline" className="text-warm-brown border-warm-brown bg-transparent hover:bg-warm-brown hover:text-white">
                Explore Temples
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Pilgrims Say</h2>
            <p className="text-lg text-muted-foreground">
              Stories from our community of seekers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Priya Sharma",
                location: "Mumbai, India",
                text: "An amazing experience! The booking was seamless and the guides were very knowledgeable.",
                rating: 5,
              },
              {
                name: "Raj Patel",
                location: "Delhi, India",
                text: "Made my pilgrimage to Pashupatinath so much easier. Highly recommended!",
                rating: 5,
              },
              {
                name: "Anna Williams",
                location: "London, UK",
                text: "Beautiful platform. Could explore temples virtually before visiting. The package was perfect.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">&ldquo;{testimonial.text}&rdquo;</p>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}