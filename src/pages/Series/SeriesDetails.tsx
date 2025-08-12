import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type {
  TMDBImagesResponse,
  TMDPCreditsResponse,
  Media,
  TvSeries,
} from "../../types/globals";
import Header from "../../components/Header/Header";
import {
  getMediaCredits,
  getMediaImages,
  getSimilarMedia,
  image_base_url,
} from "../../lib/api";
import StarsRating from "../../components/StarsRating/StarsRating";
import Button from "../../components/ui/Button/Button";
import { FaPlay } from "react-icons/fa";
import { MediaTypes } from "../../constants/enums";
import CollectionCard from "../../components/ui/Cards/CollectionCard";
import Avatar from "../../components/ui/Avatar/Avatar";
import MediaCard from "../../components/ui/Cards/MediaCard";
import TopProgressBarLoader from "../../components/Loaders/TopProgressBarLoader";
import { useSeriesStore } from "../../store/series/useSeriesStore";

function SeriesDetails() {
  const { seriesId } = useParams();
  const [series, setSeries] = useState<TvSeries | null>(null);
  const [sereisImages, setSeriesImages] = useState<TMDBImagesResponse | null>(
    null
  );
  const [seriesCredits, setSeriesCredits] =
    useState<TMDPCreditsResponse | null>(null);
  const [similarSeries, setSimilarSeries] = useState<Media[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { fetchSeriesDetails } = useSeriesStore();

  const getSeries = async () => {
    try {
      setIsLoading(true);
      if (seriesId) {
        const resSeries = await fetchSeriesDetails(seriesId);
        const resSeriesImages = await getMediaImages(seriesId, MediaTypes.TV);
        const resSeriesCredits = await getMediaCredits(seriesId, MediaTypes.TV);
        const resSimilarSeries = await getSimilarMedia(seriesId, MediaTypes.TV);

        setSeries(resSeries);
        setSeriesImages(resSeriesImages);
        setSeriesCredits(resSeriesCredits);
        setSimilarSeries(resSimilarSeries);
      }
    } catch (error) {
      console.log("Error in getting series in series details page: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (seriesId) {
      getSeries();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seriesId]);

  if (isLoading) return <TopProgressBarLoader />;

  return (
    <>
      <Header />
      <main>
        <div
          className="min-h-screen bg-center bg-cover flex flex-col justify-end py-section"
          style={{
            backgroundImage: `url(${image_base_url + series?.backdrop_path})`,
          }}
        >
          <div className="overlay" />
          {/* Series info */}
          <div className="flex items-end max-md:flex-col max-md:items-center max-md:gap-5 container z-1">
            <div className="flex flex-col flex-1 gap-2 justify-center">
              <h1 className="title-1-bold">{series?.name}</h1>
              <p>{series?.overview}</p>
              <div className="flex gap-2">
                <StarsRating rating={series?.vote_average} size={24} />
                <Button>like</Button>
                <Button>dislike</Button>
              </div>
            </div>
            <div className="flex flex-col items-center flex-1">
              <div className="w-50 mb-5 overflow-hidden rounded-lg shadow-xl max-md:hidden">
                <img
                  className="object-cover object-center"
                  src={image_base_url + series?.poster_path}
                  alt={series?.name}
                />
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="fill"
                  size="lg"
                  color="primary"
                  iconLeft={<FaPlay className="max-lg:hidden" />}
                  className="rounded-md"
                >
                  Watch Now
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  color="primary"
                  className="rounded-md"
                >
                  Preview
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* Series images */}
        <div className="relative flex container overflow-scroll no-scrollbar gap-5 -mt-5 z-2">
          {sereisImages?.backdrops.slice(0, 5).map((image) => (
            <img
              className="w-90 border-1 border-primary rounded-lg"
              src={image_base_url + image.file_path}
            />
          ))}
        </div>
        <div className="container">
          <div className="py-5">
            <h3 className="title-3-bold mb-5">Generes</h3>
            <div className="flex gap-5 items-center">
              {series?.genres.map((genere) => (
                <CollectionCard collection={genere.name} />
              ))}
            </div>
          </div>
          <div className="py-5">
            <h3 className="title-3-bold mb-5">Characters</h3>
            <div className="media-scroller no-scrollbar">
              {seriesCredits?.cast.map((cast) => {
                return (
                  <div>
                    <Avatar
                      src={
                        cast.profile_path && image_base_url + cast.profile_path
                      }
                      size="lg"
                    />
                    <div className="max-w-[10ch] overflow-hidden text-center">
                      <p>{cast.name}</p>
                    </div>
                    <div className="max-w-[10ch] overflow-hidden text-center text-neutral-gray">
                      <p>{cast.character}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="py-5">
            <h3 className="title-3-bold mb-5">Crew</h3>
            <div className="media-scroller no-scrollbar">
              {seriesCredits?.crew.slice(0, 20).map((crew) => {
                return (
                  <div>
                    <Avatar
                      src={
                        crew.profile_path && image_base_url + crew.profile_path
                      }
                      size="lg"
                    />
                    <div className="max-w-[10ch] overflow-hidden text-center">
                      <p>{crew.name}</p>
                    </div>
                    <div className="max-w-[10ch] overflow-hidden text-center text-neutral-gray">
                      <p>{crew.job}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="py-5">
            <h3 className="title-3-bold mb-5">Similar to "{series?.name}"</h3>
            <div className="media-scroller no-scrollbar">
              {similarSeries?.map((series) => (
                <MediaCard
                  media={series}
                  type={MediaTypes.TV}
                  key={series.id}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default SeriesDetails;
