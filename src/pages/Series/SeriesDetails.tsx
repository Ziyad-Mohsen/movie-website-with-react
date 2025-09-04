import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import { image_base_url } from "../../lib/api";
import StarsRating from "../../components/StarsRating/StarsRating";
import Button from "../../components/ui/Button/Button";
import { FaPlay } from "react-icons/fa";
import { MediaTypes } from "../../constants/enums";
import CollectionCard from "../../components/ui/Cards/CollectionCard";
import Avatar from "../../components/ui/Avatar/Avatar";
import TopProgressBarLoader from "../../components/Loaders/TopProgressBarLoader";
import CardSkeletonList from "../../components/Loaders/CardSkeletonList";
import Error from "../../components/Error/Error";
import Spinner from "../../components/Loaders/Spinner";
import MediaCardsList from "../../components/MediaCardsList/MediaCardsList";
import { useSeriesDetailsStore } from "../../store/series/useSeriesDetailsStore";
import { SlLike, SlDislike } from "react-icons/sl";

function SeriesDetails() {
  const { seriesId } = useParams();
  const {
    series: { data: series, loading: seriesLoading, error: seriesError },
    seriesImages: {
      data: seriesImages,
      loading: loadingImages,
      error: seriesImagesError,
    },
    seriesCredits: {
      data: seriesCredits,
      loading: loadingCredits,
      error: seriesCreditsError,
    },
    similarSeries: {
      data: similarSeries,
      loading: loadingSimilar,
      error: similarSeriesError,
    },
    getSeriesDetails,
    getSeriesImages,
    getSeriesCredits,
    getSimilarSeries,
  } = useSeriesDetailsStore();

  const getData = () => {
    if (seriesId) {
      getSeriesDetails(seriesId);
      getSeriesImages(seriesId);
      getSeriesCredits(seriesId);
      getSimilarSeries(seriesId, 1);
    }
  };

  useEffect(() => {
    if (seriesId) {
      getData();
      window.scroll(0, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seriesId]);

  if (seriesLoading) return <TopProgressBarLoader />;

  if (seriesError)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Error message={seriesError} retry={getData} />
      </div>
    );

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
                <Button variant="outline" color="primary" size="icon">
                  <SlLike />
                </Button>
                <Button variant="outline" color="primary" size="icon">
                  <SlDislike />
                </Button>
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
          {loadingImages ? (
            <Spinner />
          ) : seriesImagesError ? (
            <Error
              message={seriesImagesError}
              retry={seriesId ? () => getSeriesImages(seriesId) : undefined}
            />
          ) : (
            seriesImages?.backdrops
              ?.slice(0, 5)
              .map((image) => (
                <img
                  key={image.file_path}
                  className="w-90 border-1 border-primary rounded-lg"
                  src={image_base_url + image.file_path}
                />
              ))
          )}
        </div>
        <div className="container">
          {/* Generes */}
          <div className="py-5">
            <h3 className="title-3-bold mb-5">Generes</h3>
            <div className="flex gap-5 items-center">
              {series?.genres?.map((genere) => (
                <CollectionCard key={genere.id} collection={genere.name} />
              ))}
            </div>
          </div>
          {/* Credits */}
          {loadingCredits ? (
            <Spinner />
          ) : seriesCreditsError ? (
            <Error
              message={seriesCreditsError}
              retry={seriesId ? () => getSeriesCredits(seriesId) : undefined}
            />
          ) : (
            <>
              <div className="py-5">
                <h3 className="title-3-bold mb-5">Characters</h3>
                <div className="media-scroller no-scrollbar">
                  {seriesCredits?.cast?.map((cast) => {
                    return (
                      <div key={cast.id}>
                        <Avatar
                          src={
                            cast.profile_path &&
                            image_base_url + cast.profile_path
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
                  {seriesCredits?.crew?.slice(0, 20).map((crew) => {
                    return (
                      <div key={crew.credit_id}>
                        <Avatar
                          src={
                            crew.profile_path &&
                            image_base_url + crew.profile_path
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
            </>
          )}
          {/* Similar series */}
          <div className="py-5">
            <h3 className="title-3-bold mb-5">Similar to "{series?.name}"</h3>
            <MediaCardsList
              mediaList={similarSeries}
              mediaType={MediaTypes.TV}
              loading={loadingSimilar}
              loadingFallback={<CardSkeletonList />}
              error={similarSeriesError}
              errorFallback={
                <Error
                  message={similarSeriesError ?? undefined}
                  retry={
                    seriesId ? () => getSimilarSeries(seriesId, 1) : undefined
                  }
                />
              }
            />
          </div>
        </div>
      </main>
    </>
  );
}

export default SeriesDetails;
