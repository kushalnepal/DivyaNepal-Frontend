"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Temple } from "@/types";

interface TempleCardProps {
  temple: Temple;
}

export function TempleCard({ temple }: TempleCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 group/card">
      {/* Image container with hover zoom */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={temple.images[0] || "/images/temples/Pashupatinath.jpg"}
          alt={temple.name}
          fill
          className="object-cover transition-transform duration-500 group-hover/card:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />

        {/* Badges */}
        {temple.isFeatured && (
          <span className="absolute top-2 right-2 bg-saffron px-2 py-1 text-xs font-semibold text-white rounded">
            Featured
          </span>
        )}
        {temple.isVerified && (
          <span className="absolute top-2 left-2 bg-emerald-600 px-2 py-1 text-xs font-semibold text-white rounded">
            ✓ Verified
          </span>
        )}
      </div>

      {/* Content */}
      <CardHeader className="pb-3">
        <h3 className="text-xl font-bold text-foreground line-clamp-1 group-hover/card:text-saffron transition-colors duration-300">
          {temple.name}
        </h3>
        <div className="flex items-center text-muted-foreground">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">
            {temple.city}, {temple.district}
          </span>
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {temple.description}
        </p>
        {temple.mainDeity && (
          <p className="mt-2 text-sm">
            <span className="font-medium text-foreground">Deity:</span>{" "}
            <span className="text-saffron">{temple.mainDeity}</span>
          </p>
        )}
      </CardContent>

      {/* Footer with rating and View Details button */}
      <CardFooter className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-semibold text-foreground">
            {temple.rating.toFixed(1)}
          </span>
          <span className="text-xs text-muted-foreground">
            ({temple.reviewCount})
          </span>
        </div>

        {/* "View Details" Button — Spiritual Styling */}
        <Link href={`/temples/${temple.slug}`} passHref>
          <Button
            size="sm"
            className="
              relative overflow-hidden
              bg-gradient-to-r from-saffron to-gold
              text-white font-semibold
              hover:from-saffron-dark hover:to-saffron
              transition-all duration-300
              hover:shadow-lg hover:shadow-saffron/30
              hover:scale-105
              active:scale-95
              focus-visible:ring-2 focus-visible:ring-saffron focus-visible:ring-offset-2
              disabled:opacity-50 disabled:cursor-not-allowed
              text-sm
            "
          >
            <span className="relative flex items-center gap-1">
              View Details
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/card:translate-x-0.5" />
            </span>
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}