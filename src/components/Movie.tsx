import React from "react";
import { useMovie } from "../actions";
interface Props {
  id: string;
}
export const MovieComponent = ({ id }: Props) => {
  const { data, isError, isLoading } = useMovie(id);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  return <div>{data.title}</div>;
};
