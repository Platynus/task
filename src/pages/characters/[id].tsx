import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { getUrlID, useCharacter, useMovies } from "../../actions";
import { MovieComponent } from "../../components/Movie";
import styles from "../../styles/Layout.module.css";

const Character: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { data: characters, isError, isLoading, isSuccess } = useCharacter(id);
  const { data: movie } = useMovies();

  return (
    <div>
      <div className={styles.container}>
        <h3>Characters</h3>
        <div>{isLoading && <p>Loading...</p>}</div>
        <div>{isError && <p>Error</p>}</div>
        <div>
          {isSuccess && (
            <ul>
              <div>
                <h4>Name:</h4>
                <h5>{characters.name}</h5>
              </div>
              <div>
                <h4>Birth Year:</h4>
                <div>{characters.birth_year}</div>
              </div>
              <div>
                <h4>Height:</h4>
                <div>{characters.height} cm</div>
              </div>
              <div>
                <h4>Mass:</h4>
                <div>{characters.mass} kg</div>
              </div>
              <div>
                <h4>Films:</h4>

                <ul>
                  {movie?.results.map((movie, i) => (
                    <div>
                      <Link href={`/movies/${getUrlID(movie.url)}`} key={i}>
                        <a>
                          <MovieComponent
                            id={getUrlID(movie.url)}
                          ></MovieComponent>
                        </a>
                      </Link>
                    </div>
                  ))}
                </ul>
              </div>
            </ul>
          )}
        </div>

        <h3>Recenzje</h3>
        <ul>
          {/**
           * TODO: dodaj listę recenzji dla zasobu, recenzje powinny być zapisane w stanie aplikacji
           */}
        </ul>
        <form>
          {/**
           * TODO: zaimplementuj formularz dodawania recenzji
           */}
        </form>
      </div>
    </div>
  );

  return null;
};

export default Character;
