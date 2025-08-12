export function getMiddle(n: number): number[] | null {
  if (n <= 0) return null;

  if (n % 2 === 0) {
    const mid1 = n / 2;
    const mid2 = mid1 + 1;
    return [mid1, mid2];
  } else {
    return [Math.ceil(n / 2)];
  }
}

export function getFiveStarsRating(rating: number) {
  const fiveBasedRating = (rating / 10) * 5;
  const numberOfStars = Math.round(fiveBasedRating);
  return numberOfStars;
}

export function getMediaDurationTime(runtime: number | undefined) {
  if (!runtime) {
    return 0;
  }
  const hours = Math.floor(runtime / 60);
  const minutes = runtime - hours * 60;
  return `${hours}h ${minutes}m`;
}
