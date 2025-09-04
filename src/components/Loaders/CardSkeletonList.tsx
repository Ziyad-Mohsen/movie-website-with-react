import React from "react";
import CardSkeleton from "./CardSkeleton";

interface MediaCardsSkeletonProps {
  cardsCount?: number;
  listElement?: React.ReactNode;
}

function CardSkeletonList({
  cardsCount = 10,
  listElement = <CardSkeleton />,
}: MediaCardsSkeletonProps) {
  return (
    <div className="flex gap-5 overflow-x-scroll scrollbar-hide">
      {[...new Array(cardsCount)].map((_, idx) =>
        React.cloneElement(listElement as React.ReactElement, { key: idx })
      )}
    </div>
  );
}

export default CardSkeletonList;
