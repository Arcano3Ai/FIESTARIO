import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  maxStars?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  reviewCount?: number;
  className?: string;
}

export function RatingStars({
  rating,
  maxStars = 5,
  size = "md",
  showValue = true,
  reviewCount,
  className,
}: RatingStarsProps) {
  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base font-semibold",
  };

  return (
    <div className={cn("inline-flex items-center gap-1.5", className)}>
      <div className="flex items-center text-amber-400">
        {Array.from({ length: maxStars }).map((_, i) => {
          const filled = i < Math.floor(rating);
          return (
            <Star
              key={i}
              className={cn(
                iconSizes[size],
                filled ? "fill-amber-400 text-amber-400" : "fill-transparent text-gray-300"
              )}
            />
          );
        })}
      </div>
      {showValue && (
        <span className={cn("font-medium text-fiestario-carbon", textSizes[size])}>
          {rating.toFixed(1)}
        </span>
      )}
      {reviewCount !== undefined && (
        <span className="text-xs text-fiestario-stone">
          ({reviewCount} {reviewCount === 1 ? "reseña" : "reseñas"})
        </span>
      )}
    </div>
  );
}
