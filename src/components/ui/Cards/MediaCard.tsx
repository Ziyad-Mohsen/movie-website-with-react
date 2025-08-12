import type { Media } from "../../../types/globals";
import { image_base_url } from "../../../lib/api";
import { Link } from "react-router-dom";
import { MediaTypes, Routes } from "../../../constants/enums";
import StarsRating from "../../StarsRating/StarsRating";

type MediaType = MediaTypes;

type MediaCardProps = {
  media: Media;
  type: MediaType;
};

function MediaCard({ media, type = MediaTypes.MOVIE }: MediaCardProps) {
  return (
    <Link
      to={`${type === MediaTypes.MOVIE ? Routes.MOVIES : Routes.SERIES}/${
        media.id
      }`}
      className="relative group p-5 min-w-48 min-h-64 bg-center bg-cover rounded-2xl overflow-hidden"
      style={{
        backgroundImage: `url("${image_base_url + media.poster_path}")`,
      }}
    >
      <div
        className="absolute top-1/2 -right-full rotate-20 group-hover:top-0 group-hover:right-0 group-hover:rotate-0 w-full h-full z-2 transition-all duration-200 bg-cover bg-center"
        style={{
          backgroundImage: `url("${image_base_url + media.backdrop_path}")`,
        }}
      ></div>
      <div className="hidden group-hover:block absolute top-0 left-0 w-full h-full bg-black/70 z-3">
        <div className="absolute bottom-0 p-3 flex flex-col">
          <div className="font-bold">
            {media.name ? media.name : media.title}
          </div>
          <span className="text-gray-400">{media.media_type}</span>
          <div className="flex items-center">
            <StarsRating rating={media.vote_average} size={14} />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default MediaCard;
