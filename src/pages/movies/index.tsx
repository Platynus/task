import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import styles from "../../styles/Layout.module.css";
import { useMovies, getUrlID, getMoviesData } from "../../actions";
import { QueryClient, dehydrate } from "@tanstack/react-query";

const Movies: NextPage = () => {
  const { data, isError, isLoading, isSuccess } = useMovies();
  return (
    <div className={styles.container}>
      <h3>Films</h3>
      <div>{isLoading && <p>Loading...</p>}</div>
      <div>{isError && <p>Error</p>}</div>
      <div>
        {isSuccess &&
          data.results.map((films, i) => (
            <Link key={i} href={`/movies/${i}`}>
              <a>
                <div>{films.title}</div>
              </a>
            </Link>
          ))}
      </div>
    </div>
  );
};

export const getServersideProps: GetServerSideProps = async (ctx) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({ ...getMoviesData() });
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Movies;
