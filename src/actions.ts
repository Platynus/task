import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Character, Film, Films, Characters } from "./types";

const endpoint = axios.create({
  baseURL: "https://swapi.dev/api",
});

const regex = /(\d+)\/$/;
export const getUrlID = (link: string | null | undefined): string => {
  if (!link) return "";
  const match = link.match(regex);
  return match ? match[1] : "";
};

export const getNextPageID = (link: string | null | undefined): string => {
  if (!link) return "";
  const tab = link?.split("=");
  return tab?.[1];
};
//MOVIES

const responseMovies = async () => {
  const { data } = await endpoint.get(`/films`);
  return data as Films;
};

export const getMoviesData = () => ({
  queryKey: ["/films/"],
  queryFn: responseMovies,
});
export const useMovies = () => {
  const data = useQuery<Films>({ ...getMoviesData() });

  return data;
};

const responseMovie = async (id: string) => {
  const { data } = await endpoint.get(`/films/${id}`);
  return data as Film;
};
export const useMovie = (id: string) => {
  const getData = (id: string) => ({
    queryKey: [`/film/`, id],
    queryFn: () => responseMovie(id),
  });
  const data = useQuery<Film>({ ...getData(id) });

  return data;
};

//CHARACTERS

const responseCharacters = async (page: string) => {
  const { data } = await endpoint.get(`/people`, { params: { page } });
  return data as Characters;
};
export const getCharacterData = (page: string) => ({
  queryKey: ["/characters/", page],
  queryFn: () => responseCharacters(page),
});
export const useCharacters = (page: string) => {
  const data = useQuery<Characters>({ ...getCharacterData(page) });

  return data;
};

const responseCharacter = async (id: string) => {
  const { data } = await endpoint.get(`/people/${id}`);
  return data as Character;
};
export const useCharacter = (id: string) => {
  const getData = (id: string) => ({
    queryKey: [`/character/`, id],
    queryFn: () => responseCharacter(id),
  });
  const data = useQuery<Character>({ ...getData(id) });

  return data;
};
