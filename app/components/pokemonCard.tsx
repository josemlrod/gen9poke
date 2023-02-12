import PokemonTypes from "./pokemonTypes";
import {
  type Pokemon,
  formatPokemonId,
  getPokemonCardBgColor,
  replaceSpacesWithHyphens,
} from "~/services";

type Props = {
  pokemon: Pokemon;
};

export function PokemonCard({ pokemon: { id, name, types } }: Props) {
  const [
    {
      type: { name: pokemonMainTypeName },
    },
  ] = types;
  const cardBackground = getPokemonCardBgColor(pokemonMainTypeName);
  return (
    <a
      className={`flex flex-col relative rounded-xl p-4 shadow-2xl`}
      href={`/${replaceSpacesWithHyphens(name.toLowerCase())}`}
      style={{ backgroundColor: cardBackground, minWidth: 100 }}
    >
      <p className="font-bold text-gray-200">{name}</p>
      <div className="flex flex-row justify-between items-center">
        <div className="grid gap-1 grid-cols-2">
          <PokemonTypes types={types} />
        </div>
        <img
          alt="pokemon"
          className="w-20 h-20"
          src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${formatPokemonId(
            id
          )}.png`}
        />
      </div>
    </a>
  );
}
