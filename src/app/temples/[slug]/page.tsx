"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MapPin, Star, Calendar, Phone, Globe, Clock, ArrowLeft, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/lib/api";
import { slugify } from "@/lib/utils";

interface TemplePageProps {
  params: Promise<{ slug: string }>;
}

// Fallback temple data for when API is unavailable
const DEMO_TEMPLES = [
  {
    id: "1",
    name: "Pashupatinath Temple",
    slug: "pashupatinath",
    description: "One of the oldest and most sacred Hindu temples dedicated to Lord Shiva, located on the banks of the Bagmati River in Kathmandu, Nepal. This UNESCO World Heritage Site dates back to 400 AD and is the most important temple of Lord Shiva in the world. The temple complex includes numerous smaller shrines, ashrams, and the sacred Bagmati River where devotees perform last rites.",
    history: "Pashupatinath Temple's origins trace back to the 5th century, with references found in ancient Nepali texts. The current pagoda-style temple was built during the Lichhavi dynasty. Over centuries, it has been renovated by Malla kings and later rulers. It is considered one of the most sacred temples for Hindus worldwide and serves as the seat of Nepal's Hindu religious leadership.",
    religiousSignificance: "Pashupatinath is one of the Paadal Petra Sthalams and is considered the most sacred abode of Lord Shiva in the Himalayan region. Devotees believe that worshipping here grants moksha (liberation from the cycle of birth and death). The temple is especially crowded during Maha Shivaratri, Teej, and Bala Chaturdashi festivals.",
    type: "HINDU",
    address: "Kathmandu 44600, Nepal",
    city: "Kathmandu",
    district: "Kathmandu",
    region: "Bagmati",
    latitude: 27.7104,
    longitude: 85.3135,
    images: ["/images/temples/Pashupatinath.jpg"],
    mainDeity: "Lord Shiva (Pashupati)",
    establishedYear: 400,
    phone: "+977-1-4920148",
    website: "https://pashupatinath.org.np",
    openingHours: "4:00 AM - 7:00 PM",
    entryFee: 1000,
    amenities: ["Prayer Hall", "Bathing Ghat", "Priest Services", "Guided Tours", "Restrooms"],
    isFeatured: true,
    isVerified: true,
    rating: 4.8,
    reviewCount: 1250,
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-12-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Swayambhunath Temple",
    slug: "swayambhunath",
    description: "The ancient Stupa of Swayambhunath, also known as the Monkey Temple, sits atop a hill in the Kathmandu Valley. This UNESCO World Heritage Site is one of the most sacred Buddhist pilgrimage sites in Nepal. The stupa's iconic white dome and gilded spire adorned with the all-seeing eyes of Buddha dominate the skyline. The complex includes monasteries, shrines, and a museum.",
    history: "According to legend, the valley was once a lake, and the Bodhisattva Manjushri cut a gorge to drain the water, revealing a lotus flower that transformed into the stupa. Historical records suggest it was built by King Vrsadeva around 460 AD. The stupa has been destroyed and rebuilt multiple times due to earthquakes and natural wear.",
    religiousSignificance: "For Buddhists, circumambulating the stupa with prayer wheels spinning is believed to accumulate merit. The five Dhyani Buddhas depicted on the structure represent the five qualities of enlightened mind. Hindus also revere this site, believing it to be self-created (swayambhu).",
    type: "BUDDHIST",
    address: "Kathmandu 44620, Nepal",
    city: "Kathmandu",
    district: "Kathmandu",
    region: "Bagmati",
    latitude: 27.715,
    longitude: 85.291,
    images: ["/images/temples/Swayambhunath.jpg"],
    mainDeity: "Buddha (Dhyani Buddha)",
    establishedYear: 460,
    phone: "+977-1-4270740",
    website: "https://swayambhunath.org.np",
    openingHours: "Sun - Fri: 5:00 AM - 8:00 PM; Sat: 5:00 AM - 9:00 PM",
    entryFee: 200,
    amenities: ["Stupa Garden", "Prayer Wheels", "Monkey Area", "Viewpoint", "Museum", "Monastery"],
    isFeatured: true,
    isVerified: true,
    rating: 4.7,
    reviewCount: 980,
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-12-01T00:00:00Z",
  },
  {
    id: "3",
    name: "Boudhanath Stupa",
    slug: "boudhanath",
    description: "One of the largest spherical stupas in the world, Boudhanath is the spiritual heart of the Tibetan diaspora in Nepal. This UNESCO World Heritage Site features a massive mandala design and is surrounded by over 50 gompas (Tibetan monasteries). The air is filled with the sound of prayer flags and the scent of incense from countless butter lamps.",
    history: "The exact origins of Boudhanath are debated, but most scholars agree it was built sometime around the 5th or 6th century. After the Chinese invasion of Tibet in 1959, thousands of Tibetan refugees settled around Boudhanath, transforming it into one of the largest Tibetan communities outside Tibet. The stupa was severely damaged in the 2015 earthquake but has been meticulously restored.",
    religiousSignificance: "The stupa represents the mind of Buddha and is believed to contain relics of the Kassapa Buddha. Circumambulating (kora) the stupa while spinning prayer wheels and chanting mantras is a central practice. The structure embodies the Buddhist path to enlightenment with its 13 levels representing the stages to nirvana.",
    type: "BUDDHIST",
    address: "Boudhanath 44621, Nepal",
    city: "Kathmandu",
    district: "Kathmandu",
    region: "Bagmati",
    latitude: 27.72,
    longitude: 85.363,
    images: ["/images/temples/Boudhanath.jpg"],
    mainDeity: "Buddha (Dhyani Buddha)",
    establishedYear: 500,
    phone: "+977-1-4413779",
    website: "https://boudhanath.org",
    openingHours: "5:00 AM - 7:00 PM",
    entryFee: 400,
    amenities: ["Butter Lamp House", "Prayer Flags", "Tibetan Markets", "Monasteries", "Rooftop Cafés"],
    isFeatured: true,
    isVerified: true,
    rating: 4.9,
    reviewCount: 1500,
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-12-01T00:00:00Z",
  },
  {
    id: "4",
    name: "Lumbini",
    slug: "lumbini",
    description: "The birthplace of Siddhartha Gautama (Lord Buddha), Lumbini is a UNESCO World Heritage Site and one of the most important pilgrimage destinations in the world. The sacred garden contains the Maya Devi Temple, the Ashoka Pillar, and the sacred pool where Queen Maya Devi is said to have bathed before giving birth to Buddha.",
    history: "Emperor Ashoka visited Lumbini in 249 BC and erected a pillar to mark the birthplace of Buddha. The site was lost to jungle for centuries before being rediscovered in 1896 by a German archaeologist. Extensive excavations have revealed ancient monasteries, stupas, and artifacts dating back to the 3rd century BC.",
    religiousSignificance: "Lumbini is one of the four major Buddhist pilgrimage sites alongside Bodh Gaya, Sarnath, and Kushinagar. Buddhists believe that Queen Maya Devi gave birth to Siddhartha while grasping a sal tree branch in the Lumbini Garden. The site represents the very beginning of the Buddhist tradition.",
    type: "BUDDHIST",
    address: "Rupandehi District, Lumbini Province, Nepal",
    city: "Lumbini",
    district: "Rupandehi",
    region: "Lumbini",
    latitude: 27.4679,
    longitude: 83.2756,
    images: ["/images/temples/Lumbini.jpg"],
    mainDeity: "Buddha (Birth Place)",
    establishedYear: -563,
    phone: "+977-71-520020",
    website: "https://lumbini.gov.np",
    openingHours: "6:00 AM - 6:00 PM",
    entryFee: 200,
    amenities: ["Maya Devi Temple", "Sacred Garden", "Museum", "Monastic Zone", "Peace Pond"],
    isFeatured: true,
    isVerified: true,
    rating: 4.9,
    reviewCount: 2100,
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-12-01T00:00:00Z",
  },
  {
    id: "5",
    name: "Muktinath Temple",
    slug: "muktinath",
    description: "Perched at an altitude of 3,800 meters at the foot of the Thorong La pass in the Mustang district, Muktinath is one of the most sacred temples for both Hindus and Buddhists. The temple complex features 108 water spouts shaped like bull heads (Nandi) from which ice-cold spring water flows continuously, believed to cleanse sins and grant salvation.",
    history: "Muktinath has been a place of worship for over 2,000 years. The temple was originally a Buddhist site before being adopted by Hindus. Ancient texts including the Vishnu Purana reference this sacred place. It became accessible to mainstream tourism after the opening of the Thorong La trekking route and the construction of the Jomsom airstrip.",
    religiousSignificance: "Hindus believe that visiting Muktinath and bathing under all 108 spouts grants mukti (salvation/freedom from the cycle of rebirth). The five-faced murti of Lord Vishnu here is considered self-manifested (swayambhu). For Buddhists, the site is associated with Guru Rinpoche (Padmasambhava) and represents the element of sky.",
    type: "HINDU",
    address: "Mustang District, Gandaki Province, Nepal",
    city: "Muktinath",
    district: "Mustang",
    region: "Gandaki",
    latitude: 28.5851,
    longitude: 83.6183,
    images: ["/images/temples/Muktinath Temple.jpg"],
    mainDeity: "Lord Vishnu",
    establishedYear: -100,
    phone: "+977-69-550242",
    website: "https://muktinath.org",
    openingHours: "6:00 AM - 7:00 PM",
    entryFee: 15000,
    amenities: ["108 Water Spouts", "Jwala Mai Temple", "Kunda", "Monastery", "Viewpoint", "Guest Houses"],
    isFeatured: true,
    isVerified: true,
    rating: 4.6,
    reviewCount: 750,
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-12-01T00:00:00Z",
  },
];

// Safe lookup: try API first, fall back to demo data
function findDemoTemple(slug: string) {
  if (!slug) return null;
  // Try exact slug match first
  const exact = DEMO_TEMPLES.find((t) => t.slug === slug);
  if (exact) return exact;
  // Try slugified name match (for legacy/alternate slugs)
  const normalized = slugify(slug);
  return DEMO_TEMPLES.find((t) => slugify(t.name) === normalized) || null;
}

export default function TemplePage({ params }: TemplePageProps) {
  const { slug } = use(params);
  const router = useRouter();
  const [temple, setTemple] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTemple() {
      // Validate slug format
      const slugRegex = /^[a-z0-9]+(-[a-z0-9]+)*$/;
      if (!slug || !slugRegex.test(slug)) {
        setError("Invalid temple URL");
        setLoading(false);
        return;
      }

      try {
        const data = await api.temples.get(slug);
        if (!data || data.error) {
          throw new Error("Temple not found in API");
        }
        setTemple(data);
      } catch (err: any) {
        // Fallback: try demo data
        const demoTemple = findDemoTemple(slug);
        if (demoTemple) {
          setTemple(demoTemple);
        } else {
          setError(err.message || "Temple not found");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchTemple();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-saffron"></div>
      </div>
    );
  }

  if (error || !temple) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-cream py-20 px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">🕉️</div>
          <h1 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">
            Temple Not Found
          </h1>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            The temple you are looking for does not exist. It may have been
            removed or the URL might be incorrect.
          </p>
          <Link href="/temples">
            <Button size="lg" className="bg-saffron text-white hover:bg-saffron-dark">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Explore Temples
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="relative h-[400px]">
        <Image
          src={temple.images?.[0] || "/images/temples/Pashupatinath.jpg"}
          alt={temple.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute top-4 left-4">
          <Link href="/temples">
            <Button variant="outline" className="bg-white/90">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Temples
            </Button>
          </Link>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-2">
              {temple.isFeatured && (
                <span className="bg-saffron px-2 py-1 text-xs font-semibold text-white rounded">
                  Featured
                </span>
              )}
              {temple.isVerified && (
                <span className="bg-emerald-600 px-2 py-1 text-xs font-semibold text-white rounded">
                  ✓ Verified
                </span>
              )}
              <span className="bg-brown/80 px-2 py-1 text-xs font-semibold text-white rounded">
                {temple.type}
              </span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">
              {temple.name}
            </h1>
            <div className="flex items-center text-white/90">
              <MapPin className="w-5 h-5 mr-2" />
              {temple.city}, {temple.district}, {temple.region}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">About {temple.name}</h2>
                <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                  {temple.description || "Detailed description is coming soon."}
                </p>
              </CardContent>
            </Card>

            {temple.history && (
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4">History</h2>
                  <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                    {temple.history}
                  </p>
                </CardContent>
              </Card>
            )}

            {temple.religiousSignificance && (
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4">Religious Significance</h2>
                  <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                    {temple.religiousSignificance}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 font-semibold">
                      {temple.rating?.toFixed(1)}
                    </span>
                  </div>
                  <span className="text-muted-foreground">
                    ({temple.reviewCount} reviews)
                  </span>
                </div>

                {temple.mainDeity && (
                  <div>
                    <p className="text-sm text-muted-foreground">Main Deity</p>
                    <p className="font-medium">{temple.mainDeity}</p>
                  </div>
                )}

                {temple.openingHours && (
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-muted-foreground" />
                    <span>{temple.openingHours}</span>
                  </div>
                )}

                {temple.entryFee && (
                  <div>
                    <p className="text-sm text-muted-foreground">Entry Fee</p>
                    <p className="font-medium">NPR {temple.entryFee}</p>
                  </div>
                )}

                {temple.phone && (
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-2 text-muted-foreground" />
                    <a href={`tel:${temple.phone}`} className="hover:text-saffron">
                      {temple.phone}
                    </a>
                  </div>
                )}

                {temple.website && (
                  <div className="flex items-center">
                    <Globe className="w-5 h-5 mr-2 text-muted-foreground" />
                    <a href={temple.website} target="_blank" rel="noopener noreferrer" className="hover:text-saffron">
                      Visit Website
                    </a>
                  </div>
                )}

                {temple.amenities && (
                  <div>
                    <p className="text-sm text-muted-foreground">Amenities</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {temple.amenities.map((amenity: string, i: number) => (
                        <span key={i} className="bg-saffron/10 text-saffron text-xs px-2 py-1 rounded-full">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 space-y-4">
                <Link href={`/booking?temple=${temple.id}`} className="block">
                  <Button className="w-full bg-saffron text-white hover:bg-saffron-dark">
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Puja
                  </Button>
                </Link>
                <Link href="/packages" className="block">
                  <Button variant="outline" className="w-full">
                    View Packages
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}