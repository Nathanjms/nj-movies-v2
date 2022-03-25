export const perPage = () => {
  if (window.screen.availWidth >= 1020) return 8;
  if (480 < window.screen.availWidth && window.screen.availWidth < 1020)
    return 6;
  return 4;
};

interface validMovieOrderColumnObject {
  name: string;
  value: validMovieOrderColumn;
}

export type validMovieOrderColumn = "created_at" | "title" | "seen_at";

export const moviesOrderColumnsArray: validMovieOrderColumnObject[] = [
  {
    name: "Creation Date",
    value: "created_at",
  },
  {
    name: "Name",
    value: "title",
  },
  {
    name: "Watched Date",
    value: "seen_at",
  },
];

export type validMovieOrderBy = "asc" | "desc";
