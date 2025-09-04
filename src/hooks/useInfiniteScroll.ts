import { useEffect, useRef } from "react";

function useInfiniteScroll({
  callbackFn,
  isLoading,
}: {
  callbackFn: () => void;
  isLoading: boolean;
}) {
  const loadMoreRef = useRef(null);
  // Infinite Scroll
  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !isLoading) {
          callbackFn();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(loadMoreRef.current);

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, [isLoading, callbackFn]);
  return loadMoreRef;
}

export default useInfiniteScroll;
