import Link from "next/link";
import { MapPin, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TempleCard } from "@/components/temples/temple-card";

const temples = [
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

const regions = ["All Regions", "Bagmati", "Lumbini", "Gandaki", "Madhesh", "Far-Western"];
const types = ["All Types", "HINDU", "BUDDHIST", "SACRED"];

export default function TemplesPage() {
  return (
    <div className="min-h-screen bg-cream">
      <section className="bg-saffron py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Sacred Temples of Nepal
          </h1>
          <p className="text-white/90 max-w-2xl">
            Discover the most revered Hindu and Buddhist sacred sites across Nepal
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-64 flex-shrink-0">
            <Card>
              <CardHeader>
                <h3 className="font-semibold flex items-center">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </h3>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Search</label>
                  <Input placeholder="Search temples..." />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Region</label>
                  <div className="space-y-2">
                    {regions.map((region) => (
                      <label key={region} className="flex items-center">
                        <input type="checkbox" className="mr-2 rounded border-gray-300" />
                        <span className="text-sm">{region}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Type</label>
                  <div className="space-y-2">
                    {types.map((type) => (
                      <label key={type} className="flex items-center">
                        <input type="checkbox" className="mr-2 rounded border-gray-300" />
                        <span className="text-sm">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Apply Filters
                </Button>
              </CardContent>
            </Card>
          </aside>

          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-muted-foreground">
                Showing {temples.length} temples
              </p>
              <select className="border rounded-md px-3 py-2 text-sm">
                <option>Sort by: Featured</option>
                <option>Sort by: Rating</option>
                <option>Sort by: Name</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {temples.map((temple) => (
                <TempleCard key={temple.id} temple={temple as any} />
              ))}
            </div>

            <div className="flex justify-center mt-12 gap-2">
              <Button variant="outline" disabled>Previous</Button>
              <Button variant="outline">1</Button>
              <Button variant="outline">2</Button>
              <Button variant="outline">3</Button>
              <Button variant="outline">Next</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}