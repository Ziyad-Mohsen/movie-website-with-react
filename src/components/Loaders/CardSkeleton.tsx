function CardSkeleton() {
  return (
    <div className="relative min-w-48 min-h-64 rounded-2xl overflow-hidden bg-primary-shade-4 animate-pulse">
      <div className="absolute inset-0 bg-gradient-to-r from-primary-shade-4 via-primary-shade-3 to-primary-shade-4 opacity-60 animate-skeleton-shimmer" />
    </div>
  );
}

export default CardSkeleton;
