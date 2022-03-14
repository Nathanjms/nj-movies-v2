export const perPage = () => {
  if (window.screen.availWidth >= 1020) return 8;
  if (480 < window.screen.availWidth && window.screen.availWidth < 1020)
    return 6;
  return 4;
};
