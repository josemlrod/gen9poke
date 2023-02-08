import {
  capitalizeFirstLetter,
  type Pokemon,
  getPokemonCardBgColor,
} from "~/services";

type Props = {
  pokemon: Pokemon;
};

export function PokemonCard({ pokemon }: Props) {
  const cardBackground = getPokemonCardBgColor(pokemon.typeColor);
  return (
    <a
      className={`flex flex-col relative rounded-xl p-4 shadow-xl ${cardBackground} gap-4`}
      href="/"
      style={{ minWidth: 100 }}
    >
      <p className="font-bold text-gray-200">{pokemon.name}</p>
      <div className="flex flex-row justify-between items-center">
        <p className="flex rounded-full max-h-8 px-4 items-center bg-green-400 text-gray-200">
          {capitalizeFirstLetter(pokemon.types[0].type.name)}
        </p>
        <img
          alt="pokemon"
          className="w-20 h-20"
          src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemon.id}.png`}
        />
      </div>
    </a>
  );
}
