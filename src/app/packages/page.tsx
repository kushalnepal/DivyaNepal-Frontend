import Link from "next/link";
import { Clock, MapPin, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const packages = [
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
];

const categories = ["All", "Spiritual", "Pilgrimage", "Cultural", "Budget"];

export default function PackagesPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <section className="bg-saffron py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Spiritual Packages
          </h1>
          <p className="text-white/90 max-w-2xl">
            Curated pilgrimage experiences designed for your spiritual journey
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Button key={category} variant={category === "All" ? "default" : "outline"}>
              {category}
            </Button>
          ))}
        </div>

        {/* Package Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <Card key={pkg.id} className="hover:shadow-lg transition-shadow flex flex-col">
              <div className="h-48 bg-saffron/10 flex items-center justify-center">
                <MapPin className="w-12 h-12 text-saffron" />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{pkg.name}</CardTitle>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <Clock className="w-4 h-4 mr-1" />
                      {pkg.duration}
                    </div>
                  </div>
                  <span className="bg-saffron/20 text-saffron px-2 py-1 text-xs rounded-full">
                    {pkg.category}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground mb-4">{pkg.description}</p>
                
                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">Temples visited:</p>
                  <div className="flex flex-wrap gap-1">
                    {pkg.temples.map((temple) => (
                      <span
                        key={temple}
                        className="bg-muted text-muted-foreground px-2 py-1 text-xs rounded"
                      >
                        {temple}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Includes:</p>
                  <div className="flex flex-wrap gap-1">
                    {pkg.includes.map((item) => (
                      <span
                        key={item}
                        className="bg-success/10 text-success px-2 py-1 text-xs rounded"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardContent>
                <div className="flex items-baseline mb-4">
                  <span className="text-2xl font-bold">
                    NPR {pkg.discountPrice?.toLocaleString()}
                  </span>
                  {pkg.discountPrice && (
                    <span className="text-sm text-muted-foreground line-through ml-2">
                      NPR {pkg.price.toLocaleString()}
                    </span>
                  )}
                  <span className="text-sm text-muted-foreground ml-1">/person</span>
                </div>
                <Link href={`/booking?package=${pkg.id}`}>
                  <Button className="w-full">
                    Book Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}