import {
  capitalizeFirstLetter,
  type Pokemon,
  type PokemonType,
  getPokemonCardBgColor,
} from "~/services";

type Props = {
  pokemon: Pokemon;
};

export function PokemonCard({ pokemon }: Props) {
  const cardBackground = getPokemonCardBgColor(pokemon.typeColor);
  return (
    <a
      className={`flex flex-col relative rounded-xl p-4 shadow-xl ${cardBackground} shadow-2xl`}
      href="/"
      style={{ minWidth: 100 }}
    >
      <p className="font-bold text-gray-200">{pokemon.name}</p>
      <div className="flex flex-row justify-between items-center">
        <div className="grid gap-1">{PokemonTypes(pokemon.types)}</div>
        <img
          alt="pokemon"
          className="w-20 h-20"
          src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemon.id}.png`}
        />
      </div>
    </a>
  );
}

function PokemonTypes(types: PokemonType[]) {
  return types.map((type, index) => {
    return (
      <p
        className={`flex rounded-full max-h-8 px-4 items-center bg-green-400 text-gray-200`}
        key={index}
      >
        {capitalizeFirstLetter(type.type.name)}
      </p>
    );
  });
}
