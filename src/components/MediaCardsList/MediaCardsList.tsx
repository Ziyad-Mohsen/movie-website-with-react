import { MediaTypes } from "../../constants/enums";
import type { Media } from "../../types/globals";
import MediaCard from "../ui/Cards/MediaCard";

interface MediaCardsListProps {
  mediaList: Media[] | null;
  mediaType?: MediaTypes;
  loading?: boolean;
  loadingFallback?: React.ReactNode;
  error?: string | null;
  errorFallback?: React.ReactNode;
}

function MediaCardsList({
  mediaList,
  mediaType,
  loading = false,
  loadingFallback,
  error,
  errorFallback,
}: MediaCardsListProps) {
  if (error) return errorFallback;

  if (loading) return loadingFallback;

  return (
    <div className="flex gap-5 overflow-x-scroll media-scroller scrollbar-hide">
      {mediaList &&
        mediaList?.map((media) => {
          return (
            <MediaCard
              key={media.id}
              media={media}
              type={mediaType ? mediaType : media.media_type}
            />
          );
        })}
    </div>
  );
}

export default MediaCardsList;
