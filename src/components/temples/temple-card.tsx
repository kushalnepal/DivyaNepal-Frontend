"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Temple } from "@/types";

interface TempleCardProps {
  temple: Temple;
}

export function TempleCard({ temple }: TempleCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="relative aspect-[4/3]">
        <Image
          src={temple.images[0] || "/placeholder-temple.jpg"}
          alt={temple.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {temple.isFeatured && (
          <span className="absolute top-2 right-2 bg-saffron px-2 py-1 text-xs font-semibold text-white">
            Featured
          </span>
        )}
        {temple.isVerified && (
          <span className="absolute top-2 left-2 bg-success px-2 py-1 text-xs font-semibold text-white">
            Verified
          </span>
        )}
      </div>
      <CardHeader>
        <h3 className="text-xl font-semibold line-clamp-1">{temple.name}</h3>
        <div className="flex items-center text-muted-foreground">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{temple.city}, {temple.district}</span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {temple.description}
        </p>
        {temple.mainDeity && (
          <p className="mt-2 text-sm">
            <span className="font-medium">Deity:</span> {temple.mainDeity}
          </p>
        )}
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="ml-1 text-sm font-medium">{temple.rating.toFixed(1)}</span>
          <span className="text-sm text-muted-foreground">({temple.reviewCount})</span>
        </div>
        <Link href={`/temples/${temple.slug}`}>
          <Button size="sm">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}