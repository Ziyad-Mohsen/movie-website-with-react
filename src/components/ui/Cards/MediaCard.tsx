import type { Media } from "../../../types/globals";
import { image_base_url } from "../../../lib/api";
import { Link } from "react-router-dom";
import { MediaTypes, Routes } from "../../../constants/enums";
import StarsRating from "../../StarsRating/StarsRating";
import FALLBACK_IMAGE from "/poster-not-found.jpeg";

type MediaType = MediaTypes;

type MediaCardProps = {
  media: Media;
  type: MediaType;
};

function MediaCard({ media, type = MediaTypes.MOVIE }: MediaCardProps) {
  const posterUrl = media.poster_path
    ? image_base_url + media.poster_path
    : FALLBACK_IMAGE;

  const backdropUrl = media.backdrop_path
    ? image_base_url + media.backdrop_path
    : posterUrl;

  return (
    <Link
      to={`${type === MediaTypes.MOVIE ? Routes.MOVIES : Routes.SERIES}/${
        media.id
      }`}
      className="group flex flex-col items-center"
    >
      <div className="relative bg-secondary-shade-4 min-w-48 w-48 min-h-64 h-48 rounded-2xl overflow-hidden">
        {/* Main Poster */}
        <img
          src={posterUrl}
          alt={media.title || media.name}
          loading="lazy"
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
          }}
        />

        {/* Hover Backdrop */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <img
            src={backdropUrl}
            alt={`${media.title || media.name} backdrop`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70 flex flex-col justify-end p-3">
            <div className="font-bold text-white text-sm">
              {media.overview.length >= 60
                ? media.overview.slice(0, 60).trim() + "..."
                : media.overview}
            </div>
            <span className="text-gray-400">{media.media_type}</span>
            <div className="flex items-center">
              <StarsRating rating={media.vote_average} size={14} />
            </div>
          </div>
        </div>
      </div>

      {/* Title */}
      <h2 className="font-bold p-2 text-center group-hover:text-primary transition-colors">
        {media.title ? media.title : media.name}
      </h2>
    </Link>
  );
}

export default MediaCard;
