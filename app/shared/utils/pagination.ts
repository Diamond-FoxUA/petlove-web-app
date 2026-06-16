export function generatePaginationRange(
  currentPage: number,
  totalPages: number,
  isMobile: boolean,
) {
  const current = currentPage;
  const last = totalPages;
  const rangeWithDots: (number | string)[] = [];

  const maxVisibleNumbers = isMobile ? 2 : 3;

  if (last <= maxVisibleNumbers) {
    for (let i = 1; i <= last; i++) {
      rangeWithDots.push(i);
    }
    return rangeWithDots;
  }

  const isFinalZone = isMobile ? current >= last - 1 : current >= last - 2;

  if (!isFinalZone) {
    for (let i = current; i < current + maxVisibleNumbers; i++) {
      if (i <= last) rangeWithDots.push(i);
    }

    if ((rangeWithDots[rangeWithDots.length - 1] as number) < last) {
      rangeWithDots.push("...");
    }
  } else {
    rangeWithDots.push("...");
    
    const startNumber = last - (maxVisibleNumbers - 1);
    for (let i = startNumber; i <= last; i++) {
      rangeWithDots.push(i);
    }
  }

  return rangeWithDots;
}
