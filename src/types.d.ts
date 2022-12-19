export type Characters = {
  count: number;
  next?: string;
  previous?: string;
  results: Character[];
};
export type Character = {
  name: string;
  height: number;
  mass: string;
  birth_year: string;
  films: string[];
  url: string;
};
export type Films = {
  count: number;
  next?: string;
  previous?: string;
  results: Film[];
};
export type Film = {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  url: string;
};
