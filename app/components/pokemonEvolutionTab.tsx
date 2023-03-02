import { Link } from "@remix-run/react";
import React from "react";

export function PokemonEvolutionTab({ evolution }) {
  const { firstPokemonSpecies, firstPokemonSpeciesId, nextPokemonEvolutions } =
    evolution;

  return (
    <section className="grid grid-flow-row p-6">
      <h1 className="mb-4">Evolution chain</h1>
      {nextPokemonEvolutions.map(
        (
          {
            evolutionTrigger,
            evolutionTriggerDetails,
            evolutionId,
            evolutionName,
          },
          index
        ) => {
          const isLastElement = index === nextPokemonEvolutions.length - 1;
          const dividerElement = (
            <div className="relative my-4">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-gray-300" />
              </div>
            </div>
          );

          if (index === 0) {
            return (
              <React.Fragment key={index}>
                <div className="grid grid-flow-col grid-cols-3">
                  <div className="flex flex-col">
                    <Link to={`/${firstPokemonSpecies.toLowerCase()}`}>
                      <img
                        alt="pokemon"
                        className="w-30"
                        src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${firstPokemonSpeciesId}.png`}
                      />
                    </Link>
                    <p className="text-center">{firstPokemonSpecies}</p>
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
                      <span>
                        {evolutionTrigger} {evolutionTriggerDetails}
                      </span>
                    </div>
                  </div>
                  <div>
                    <Link to={`/${evolutionName.toLowerCase()}`}>
                      <img
                        alt="pokemon"
                        className="w-30"
                        src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${evolutionId}.png`}
                      />
                      <p className="text-center">{evolutionName}</p>
                    </Link>
                  </div>
                </div>
                {!isLastElement && dividerElement}
              </React.Fragment>
            );
          }

          const prevEvolution = nextPokemonEvolutions[index - 1];
          return (
            <React.Fragment key={index}>
              <div className="grid grid-flow-col grid-cols-3">
                <div className="flex flex-col">
                  <Link to={`/${prevEvolution.evolutionName.toLowerCase()}`}>
                    <img
                      alt="pokemon"
                      className="w-30"
                      src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${prevEvolution.evolutionId}.png`}
                    />
                    <p className="text-center">{prevEvolution.evolutionName}</p>
                  </Link>
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
                    <span>
                      {evolutionTrigger} {evolutionTriggerDetails}
                    </span>
                  </div>
                </div>
                <div>
                  <Link to={`/${evolutionName.toLowerCase()}`}>
                    <img
                      alt="pokemon"
                      className="w-30"
                      src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${evolutionId}.png`}
                    />
                    <p className="text-center">{evolutionName}</p>
                  </Link>
                </div>
              </div>
              {!isLastElement && dividerElement}
            </React.Fragment>
          );
        }
      )}
    </section>
  );
}
