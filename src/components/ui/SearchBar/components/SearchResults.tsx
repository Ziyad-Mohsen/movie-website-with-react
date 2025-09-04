import { BiSearch, BiMovie, BiTv, BiUser, BiStar } from "react-icons/bi";
import { motion } from "motion/react";
import type { Media } from "../../../../types/globals";
import { MediaTypes } from "../../../../constants/enums";
import Spinner from "../../../Loaders/Spinner";
import Error from "../../../Error/Error";
import { image_base_url } from "../../../../lib/api";
import notFoundPoster from "/poster-not-found.jpeg";

interface SearchResultsProps {
  results: Media[];
  loading: boolean;
  error: string | null;
  selectedIndex: number;
  onErrorRetry?: () => void;
  onResultClick: (result: Media) => void;
}

function SearchResults({
  results,
  loading,
  error,
  selectedIndex,
  onErrorRetry,
  onResultClick,
}: SearchResultsProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case MediaTypes.MOVIE:
        return <BiMovie className="text-blue-400" />;
      case MediaTypes.TV:
        return <BiTv className="text-green-400" />;
      case MediaTypes.PERSON:
        return <BiUser className="text-purple-400" />;
      default:
        return <BiSearch />;
    }
  };

  const getTypeLabel = (type: MediaTypes) => {
    switch (type) {
      case MediaTypes.MOVIE:
        return "Movie";
      case MediaTypes.TV:
        return "Series";
      case MediaTypes.PERSON:
        return "Person";
      default:
        return type;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-3 bg-gray-900 border border-gray-700 rounded-lg shadow-xl max-h-96 overflow-y-auto no-scrollbar"
    >
      {loading ? (
        <Spinner />
      ) : error ? (
        <Error message={error} retry={onErrorRetry} />
      ) : results.length > 0 ? (
        <div className="py-2">
          {results.map((result, index) => (
            <motion.div
              key={result.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onResultClick(result)}
              className={`flex gap-5 px-4 py-3 cursor-pointer transition-colors ${
                index === selectedIndex
                  ? "bg-primary-shade-2/20 border-l-2 border-primary"
                  : "hover:bg-gray-800"
              }`}
            >
              <div>
                <img
                  src={image_base_url + result.poster_path}
                  className="w-15"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = notFoundPoster;
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <div className="text-white font-medium truncate">
                    {result.title || result.name}
                  </div>
                  {result.vote_average && (
                    <span className="text-sm text-gray-400">
                      ({result.vote_average})
                    </span>
                  )}
                  {result.vote_average && (
                    <div className="flex items-center gap-1 text-yellow-400">
                      <BiStar size={14} />
                      <span className="text-sm">
                        {result.vote_average.toFixed(1)}
                      </span>
                    </div>
                  )}
                </div>
                {result.overview && (
                  <div className="text-sm text-gray-400 line-clamp-2">
                    {result.overview}
                  </div>
                )}
                <div className="flex items-center gap-2 mt-2">
                  <div>{getTypeIcon(result.media_type)}</div>
                  <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
                    {getTypeLabel(result.media_type)}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="px-4 py-8 text-center text-gray-400">
          <BiSearch size={24} className="mx-auto mb-2 opacity-50" />
          <p>No results found</p>
          <p className="text-sm mt-1">
            Try different keywords or check another category
          </p>
        </div>
      )}
    </motion.div>
  );
}

export default SearchResults;
