import clsx from "clsx";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

function StarsRating({
  rating = 0,
  size = 20,
  className,
}: {
  rating?: number;
  size?: number;
  className?: string;
}) {
  // Convert TMDb's 10-point rating to 5 stars
  const starsOutOfFive = (rating / 10) * 5;

  // Calculate full, half, and empty stars
  const fullStars = Math.floor(starsOutOfFive);
  const hasHalfStar =
    starsOutOfFive - fullStars >= 0.25 && starsOutOfFive - fullStars < 0.75;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={clsx("flex items-center gap-1", className)}>
      {/* Full stars */}
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`full-${i}`} className="text-yellow-400" size={size} />
      ))}

      {/* Half star */}
      {hasHalfStar && <FaStarHalfAlt className="text-yellow-400" size={size} />}

      {/* Empty stars */}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={`empty-${i}`} className="text-gray-300" size={size} />
      ))}

      {/* Numeric rating */}
      <span className="ml-2 text-sm text-gray-500">{rating.toFixed(1)}/10</span>
    </div>
  );
}

export default StarsRating;
