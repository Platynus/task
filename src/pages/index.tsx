import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div>
      <ul>
        <li>
          <Link href="/movies">Filmy</Link>
        </li>
        <li>
          <Link href="/characters">Postacie</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
