import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import {
  useCharacters,
  getUrlID,
  getNextPageID,
  getCharacterData,
} from "../../actions";
import { useState } from "react";
import { QueryClient, dehydrate } from "@tanstack/react-query";

const Characters: NextPage = () => {
  const [page, setPage] = useState<string>("1");

  const { data, isError, isLoading, isSuccess } = useCharacters(page);

  if (data && isSuccess) {
    const { count, next, previous, results } = data;
    return (
      <div>
        <h3>Characters</h3>
        <div>{isLoading && <p>Loading...</p>}</div>
        <div>{isError && <p>Error</p>}</div>
        <div>
          {isSuccess &&
            results.map((character) => (
              <ul key={getUrlID(character.url)}>
                <Link href={`/characters/${getUrlID(character.url)}`}>
                  {character.name}
                </Link>
              </ul>
            ))}
        </div>
        {previous && (
          <button onClick={() => setPage(getNextPageID(previous))}>
            Prev Page
          </button>
        )}
        {next && (
          <button onClick={() => setPage(getNextPageID(next))}>
            Next Page
          </button>
        )}
      </div>
    );
  } else {
    return <div>loading</div>;
  }
};
export const getServersideProps: GetServerSideProps = async (ctx) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({ ...getCharacterData("1") });
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Characters;
