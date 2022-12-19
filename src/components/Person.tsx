import React from "react";
import { useCharacter } from "../actions";
interface Props {
  id: string;
}
export const PersonComponent = ({ id }: Props) => {
  const { data, isError, isLoading } = useCharacter(id);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  return <div>{data.name}</div>;
};
