import {
  type Pokemon,
  type PokemonType,
  formatPokemonId,
  getPokemonCardBgColor,
  getPokemonTypeIcon,
} from "~/services";

type Props = {
  pokemon: Pokemon;
};

export function PokemonCard({ pokemon }: Props) {
  const [
    {
      type: { name: pokemonMainTypeName },
    },
  ] = pokemon.types;
  const cardBackground = getPokemonCardBgColor(pokemonMainTypeName);
  return (
    <a
      className={`flex flex-col relative rounded-xl p-4 shadow-2xl`}
      href="/"
      style={{ backgroundColor: cardBackground, minWidth: 100 }}
    >
      <p className="font-bold text-gray-200">{pokemon.name}</p>
      <div className="flex flex-row justify-between items-center">
        <div className="grid gap-1 grid-cols-2">
          {PokemonTypes(pokemon.types)}
        </div>
        <img
          alt="pokemon"
          className="w-20 h-20"
          src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${formatPokemonId(
            pokemon.id
          )}.png`}
        />
      </div>
    </a>
  );
}

function PokemonTypes(types: PokemonType[]) {
  return types.map(({ type: { name } }, index) => {
    const icon = getPokemonTypeIcon(name);
    return (
      <img alt={`${name} type`} className="h-7 w-7" key={index} src={icon} />
    );
  });
}
