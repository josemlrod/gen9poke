import { useMatches } from "@remix-run/react";

import { replaceSpacesWithHyphens } from "~/services";

const PokemonDetailsTabs = {
  ABOUT: "about",
  EVOLUTION: "evolution",
  MOVES: "moves",
  STATS: "stats",
} as const;

function getActiveTab(pathname: string) {
  const pathnameArray = pathname.split("/");
  const lastIdx = pathnameArray.length - 1;
  const tab = pathnameArray[lastIdx];
  return tab;
}

export default function PokemonDetailsTab({
  pokemonName,
}: {
  pokemonName: string;
}) {
  const [, , { pathname }] = useMatches();
  const activeTab = getActiveTab(pathname);

  const lowerCaseName = pokemonName.toLowerCase();
  const formattedPokemonName = replaceSpacesWithHyphens(lowerCaseName);
  return (
    <nav className="flex border-b border-gray-100 text-sm font-medium justify-center">
      <a
        href={`/${formattedPokemonName}/about`}
        className={`-mb-px border-b p-4 hover:text-cyan-500 ${
          (activeTab === PokemonDetailsTabs.ABOUT &&
            "border-current text-cyan-500") ||
          "border-transparent"
        }`}
      >
        About
      </a>

      <a
        href={`/${formattedPokemonName}/stats`}
        className={`-mb-px border-b p-4 hover:text-cyan-500 ${
          (activeTab === PokemonDetailsTabs.STATS &&
            "border-current text-cyan-500") ||
          "border-transparent"
        }`}
      >
        Base Stats
      </a>

      <a
        href={`/${formattedPokemonName}/evolution`}
        className={`-mb-px border-b p-4 hover:text-cyan-500 ${
          (activeTab === PokemonDetailsTabs.EVOLUTION &&
            "border-current text-cyan-500") ||
          "border-transparent"
        }`}
      >
        Evolution
      </a>

      <a
        href={`/${formattedPokemonName}/moves`}
        className={`-mb-px border-b p-4 hover:text-cyan-500 ${
          (activeTab === PokemonDetailsTabs.MOVES &&
            "border-current text-cyan-500") ||
          "border-transparent"
        }`}
      >
        Moves
      </a>
    </nav>
  );
}
