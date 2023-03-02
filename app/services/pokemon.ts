import {
  AllPokemonResponse,
  capitalizeFirstLetter,
  Pokemon,
  PokemonAbility,
  PokemonEntry,
  PokemonName,
} from "./index";
import { replaceHyphensWithSpaces } from "./index";

export const MoveLearningMethods = {
  Egg: "egg",
  LevelingUp: "level-up",
  Machine: "machine",
  Tutor: "tutor",
};

export enum EvolutionTriggerTypes {
  "level-up" = "Lvl",
}

export async function formatPokemonEvolutionChain(chain) {
  const extractedEvolvesTo = [];

  async function extractEvolvesTo(evolvesTo) {
    if (evolvesTo.length) {
      const [nextPokemon] = evolvesTo;
      const nextEvolution = {
        evolutionId: await getPokemonIdByName(nextPokemon.species.name),
        evolutionName: replaceHyphensWithSpaces(nextPokemon.species.name),
        evolutionTrigger:
          EvolutionTriggerTypes[nextPokemon.evolution_details[0].trigger.name],
        evolutionTriggerDetails: nextPokemon.evolution_details[0].min_level,
      };
      extractedEvolvesTo.push(nextEvolution);
      await extractEvolvesTo(nextPokemon.evolves_to);
    }

    return;
  }

  await extractEvolvesTo(chain.evolves_to);

  return {
    firstPokemonSpecies: replaceHyphensWithSpaces(chain.species.name),
    firstPokemonSpeciesId: await getPokemonIdByName(chain.species.name),
    nextPokemonEvolutions: extractedEvolvesTo,
  };
}

export async function fetchPaldeaPokemonIds() {
  try {
    const { pokemon_entries: pokemonEntries } = await (
      await fetch("https://pokeapi.co/api/v2/pokedex/paldea/")
    ).json();

    return pokemonEntries.map((pokemonEntry: PokemonEntry) =>
      getPokemonId(pokemonEntry.pokemon_species.url)
    );
  } catch (e) {
    console.log(e);
  }
}

export async function fetchAllPokemon(
  nextFetchUrl?: string
): Promise<AllPokemonResponse> {
  try {
    const { next, results } = await (
      await fetch(nextFetchUrl || "https://pokeapi.co/api/v2/pokemon")
    ).json();
    return {
      next,
      pokemon: results,
    };
  } catch (e) {
    console.log(e);
  }
}

export async function fetchPokemonDataById(pokemonId: number) {
  try {
    const { abilities, height, moves, stats, types, weight } = await (
      await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
    ).json();

    return {
      abilities,
      height,
      moves,
      stats,
      types,
      weight,
    };
  } catch (e) {
    console.log(e);
  }
}

export async function fetchPokemonDataByName(
  pokemonName: string
): Promise<Omit<Pokemon, "id" | "name" | "typeColor"> | void> {
  // lycanroc is not found
  try {
    const { abilities, height, moves, stats, types, weight } = await (
      await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`)
    ).json();

    const {
      evolution_chain: { url },
    } = await (
      await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}/`)
    ).json();
    const { chain } = await (await fetch(url)).json();
    const formattedChain = await formatPokemonEvolutionChain(chain);

    const formatHeight = (height: number) => {
      const stringHeight = height.toString();
      const formattedHeight = stringHeight
        .split("")
        .map((str, index) => {
          if (stringHeight.length - 1 === index) {
            if (stringHeight.length === 1) {
              return `0.${str} m`;
            }

            return `.${str} m`;
          }
          return str;
        })
        .join("");

      return formattedHeight;
    };

    const formatWeight = (weight: number) => {
      const stringWeight = weight.toString();
      const formattedWeight = stringWeight
        .split("")
        .map((str, index) => {
          if (stringWeight.length - 1 === index) {
            return `.${str} kg`;
          }
          return str;
        })
        .join("");

      return formattedWeight;
    };

    const formattedAbilities = abilities.map((ability: PokemonAbility) => {
      return {
        ...ability,
        ability: {
          ...ability.ability,
          name: replaceHyphensWithSpaces(ability.ability.name),
        },
      };
    });

    const formattedStats = stats.map((stat) => {
      return {
        ...stat,
        stat: {
          ...stat.stat,
          name: replaceHyphensWithSpaces(stat.stat.name),
        },
      };
    });

    const formattedMoves = moves.map((move) => {
      const [{ move_learn_method: moveLearnMethod }] =
        move.version_group_details;

      let learnedBy;
      switch (moveLearnMethod.name) {
        case MoveLearningMethods.Egg:
          learnedBy = MoveLearningMethods.Egg;
          break;
        case MoveLearningMethods.LevelingUp:
          learnedBy = MoveLearningMethods.LevelingUp;
          break;
        case MoveLearningMethods.Machine:
          learnedBy = MoveLearningMethods.Machine;
          break;
        case MoveLearningMethods.Tutor:
          learnedBy = MoveLearningMethods.Tutor;
          break;
        default:
          break;
      }

      return {
        learnedBy,
        ...move,
        move: {
          ...move.move,
          name: replaceHyphensWithSpaces(move.move.name),
        },
      };
    });

    return {
      abilities: formattedAbilities,
      evolution: formattedChain,
      height: formatHeight(height),
      moves: formattedMoves,
      stats: formattedStats,
      types,
      weight: formatWeight(weight),
    };
  } catch (e) {
    console.log(e);
  }
}

export async function getPokemonIdByName(name: string) {
  try {
    const { id } = await fetchPokemonSpeciesByName(name);
    return id;
  } catch (e) {
    console.log(e);
  }
}

export async function fetchPokemonSpeciesById(pokemonId: number) {
  try {
    const {
      color: { name: typeColor },
      id,
      names,
    } = await (
      await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`)
    ).json();

    const name = getPokemonName(names);

    return {
      id,
      name,
      typeColor,
    };
  } catch (e) {
    console.log(e);
  }
}

export async function fetchPokemonSpeciesByName(pokemonName: string) {
  try {
    const {
      color: { name: typeColor },
      flavor_text_entries: flavorTextEntries,
      id,
      names,
    } = (await (
      await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}/`)
    ).json()) || {};

    const name = getPokemonName(names);
    const formattedId = id.toString().padStart(3, "0");
    const [{ flavor_text: description }] = flavorTextEntries;

    return {
      description,
      id: formattedId,
      name,
      typeColor,
    };
  } catch (e) {
    console.log(e);
  }
}

export async function getPaldeaPokemonData() {
  const ids = await fetchPaldeaPokemonIds();
  const species = Promise.all(
    ids.map(async (id: number) => {
      return {
        ...(await fetchPokemonSpeciesById(id)),
        ...(await fetchPokemonDataById(id)),
      };
    })
  );

  return species;
}

export async function getPokemonData(pokemonName: string) {
  return {
    ...(await fetchPokemonSpeciesByName(pokemonName)),
    ...(await fetchPokemonDataByName(pokemonName)),
  };
}

export async function getAllPokemonData(nextPageQuery?: string): Promise<{
  next: string;
  pokemon: Pokemon[];
}> {
  const { next, pokemon } = await fetchAllPokemon(nextPageQuery || "");
  const pokemonData = await Promise.all(
    pokemon.map(async ({ name }) => {
      return {
        ...(await getPokemonData(name)),
      };
    })
  );

  return {
    next,
    pokemon: pokemonData,
  };
  // const pokemonData = Promise.all(
  // allPokemon.map(async ({ name }) => {
  //   return {
  //     ...(await getPokemonData(name)),
  //   };
  // });
  // );

  // const pokemonData = Promise.all(
  //   response.result.map(async (response.pokemon) => {
  //     return {
  //       ...(await getPokemonData(pokemon.name))
  //     }
  //   })
  // )

  // return {
  //   next,
  //   pokemon: pokemonData,
  // };
}

function getPokemonName(names: PokemonName[]) {
  const { name } =
    names.find((name: PokemonName) => {
      return name.language.name === "en";
    }) || {};

  return name;
}

function getPokemonId(url: string) {
  const id = url.split("/")[6];
  return Number(id);
}
