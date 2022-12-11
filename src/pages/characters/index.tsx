import type { NextPage } from "next";
import Link from "next/link";
import styles from "../../styles/Layout.module.css";
import { useCharacters, getUrlID } from "../../actions";

const Characters: NextPage = () => {
  const character = useCharacters();

  return (
    <div className={styles.container}>
      <h3>Filmy</h3>
      <ul>
        {character &&
          character.map((character, i) => {
            /**
             * TODO: fix key value
             */
            return (
              <li key={i}>
                <Link href={`/movies/${getUrlID(character.url)}`}>
                  {character.name}
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Characters;
