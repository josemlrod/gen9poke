export function PokemonEvolutionTab({ evolution }) {
  const { firstPokemonSpecies, nextPokemonEvolutions } = evolution;
  console.log(evolution);
  return (
    <section className="grid grid-flow-row p-6">
      <h1 className="mb-4">Evolution chain</h1>
      <div className="grid grid-flow-col grid-cols-3">
        <div>
          <img
            alt="pokemon"
            className="w-30"
            src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png`}
          />
        </div>
        <div className="flex items-center justify-center flex-col">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
          <div className="text-center">
            <span>Evolution details</span>
          </div>
        </div>
        <div>
          <img
            alt="pokemon"
            className="w-30"
            src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png`}
          />
        </div>
      </div>

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300" />
        </div>
      </div>

      <div className="grid grid-flow-col grid-cols-3">
        <div>
          <img
            alt="pokemon"
            className="w-30"
            src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png`}
          />
        </div>
        <div className="flex items-center justify-center flex-col">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
          <div className="text-center">
            <span>Evolution details</span>
          </div>
        </div>
        <div>
          <img
            alt="pokemon"
            className="w-30"
            src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png`}
          />
        </div>
      </div>
    </section>
  );
}
