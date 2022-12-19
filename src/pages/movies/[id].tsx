import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { getUrlID, useMovie } from "../../actions";
import { PersonComponent } from "../../components/Person";
import styles from "../../styles/Layout.module.css";
import { Characters } from "../../types";

const Movie: NextPage = () => {
  const router = useRouter();

  /**
   * TODO: zaimplementuj hook do pobierania filmu
   */
  const id = router.query.id as string;
  const { data: movie, isError, isLoading, isSuccess } = useMovie(id);
  // const { data: characters } = useCharacters("1");
  const returnResult = (isSuccess: boolean, data: Characters | undefined) => {
    if (data && isSuccess) {
      return data.results;
    } else {
      return [];
    }
  };

  // const characters: Array<Character> = movie?.characters.map((character) =>
  //   useCharacterDataByURL(character)
  // );

  return (
    <div>
      <div className={styles.container}>
        <h3>Films</h3>
        <div>{isLoading && <p>Loading...</p>}</div>
        <div>{isError && <p>Error</p>}</div>
        <div>
          {isSuccess && (
            <ul>
              <div>
                <h4>Title:</h4>
                <h5>{movie.title}</h5>
              </div>
              <div>
                <h4>Description</h4>
                <div>{movie.opening_crawl}</div>
              </div>
              <div>
                <h4>Characters:</h4>
                <ul>
                  {movie.characters.map((characters, i) => (
                    <Link key={i} href={`/characters/${getUrlID(characters)}`}>
                      <a>
                        <PersonComponent
                          id={getUrlID(characters)}
                        ></PersonComponent>
                      </a>
                    </Link>
                  ))}
                </ul>
              </div>
            </ul>
          )}
        </div>
        <h3>Recenzje</h3>
        <ul>
          <div>
            <form>
              <label htmlFor="review">Recenzja</label>
              <input type="text" id="review" name="review"></input>
              <label>Ocena</label>
              <input></input>
              <button>Wyślij</button>
            </form>
          </div>
        </ul>
        <form>
          {/**
           * TODO: zaimplementuj formularz dodawania recenzji
           */}
        </form>
      </div>
    </div>
  );
};

export default Movie;
