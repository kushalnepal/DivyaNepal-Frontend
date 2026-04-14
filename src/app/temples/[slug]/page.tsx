"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, Calendar, Phone, Globe, Clock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/lib/api";

interface TemplePageProps {
  params: Promise<{ slug: string }>;
}

export default function TemplePage({ params }: TemplePageProps) {
  const { slug } = use(params);
  const router = useRouter();
  const [temple, setTemple] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTemple() {
      try {
        const data = await api.temples.get(slug);
        setTemple(data);
      } catch (err: any) {
        setError(err.message || "Temple not found");
      } finally {
        setLoading(false);
      }
    }
    fetchTemple();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-saffron"></div>
      </div>
    );
  }

  if (error || !temple) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Temple not found</h1>
        <p className="text-muted-foreground mb-4">{error || "This temple does not exist"}</p>
        <Link href="/temples">
          <Button>Browse All Temples</Button>
        </Link>
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
                <span className="bg-saffron px-2 py-1 text-xs font-semibold text-white">Featured</span>
              )}
              {temple.isVerified && (
                <span className="bg-green-600 px-2 py-1 text-xs font-semibold text-white">Verified</span>
              )}
              <span className="bg-brown/80 px-2 py-1 text-xs font-semibold text-white">{temple.type}</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">{temple.name}</h1>
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
                <h2 className="text-2xl font-bold mb-4">About</h2>
                <p className="text-muted-foreground whitespace-pre-line">{temple.description}</p>
              </CardContent>
            </Card>

            {temple.history && (
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4">History</h2>
                  <p className="text-muted-foreground whitespace-pre-line">{temple.history}</p>
                </CardContent>
              </Card>
            )}

            {temple.religiousSignificance && (
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4">Religious Significance</h2>
                  <p className="text-muted-foreground whitespace-pre-line">{temple.religiousSignificance}</p>
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
                    <span className="ml-1 font-semibold">{temple.rating?.toFixed(1)}</span>
                  </div>
                  <span className="text-muted-foreground">({temple.reviewCount} reviews)</span>
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
                    <a href={`tel:${temple.phone}`} className="hover:text-saffron">{temple.phone}</a>
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
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 space-y-4">
                <Link href={`/booking?temple=${temple.id}`} className="block">
                  <Button className="w-full">
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