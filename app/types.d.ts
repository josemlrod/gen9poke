/**
 * COMPONENT PROP TYPES
 */
export type PokemonEvolutions = Pick<Pokemon, "evolution">;
export type PokemonMoves = Pick<Pokemon, "moves">;
export type PokemonSpecies = Pick<
  Pokemon,
  "description" | "id" | "name" | "typeColor"
>;
export type PokemonStats = Pick<Pokemon, "stats">;
export type PokemonTypes = Pick<Pokemon, "types">;
export type PokemonHeight = string;
export type PokemonWeight = string;

export interface FlavorTextEntries {
  flavor_text: string;
  language: PokemonEntity;
  version: PokemonEntity;
}

export interface NextPokemonEvolution {
  evolutionId: string;
  evolutionName: string;
  evolutionTrigger: string;
  evolutionTriggerDetails: string;
}

export interface PokedexNumber {
  entry_number: number;
  pokedex: {
    entry_number: number;
    pokemon_species: {
      name: string;
      url: string;
    };
  };
}

export interface Pokemon {
  abilities: PokemonAbility[];
  description: string;
  evolution: {
    firstPokemonSpecies: string;
    firstPokemonSpeciesId: string;
    nextPokemonEvolutions: NextPokemonEvolution[];
  };
  height: PokemonHeight;
  id: string;
  moves: PokemonMove[];
  name: string;
  stats: PokemonStat[];
  typeColor: string;
  types: PokemonType[];
  weight: PokemonWeight;
}

export interface PokemonAbility {
  ability: PokemonEntity;
  is_hidden: string;
  slot: number;
}

export interface PokemonEntity {
  name: string;
  url: string;
}

export interface PokemonMove {
  learnedBy: string;
  move: PokemonEntity;
  version_group_details: PokemonMoveDetails[];
}

export interface PokemonMoveDetails {
  level_learned_at: number;
  move_learn_method: PokemonEntity;
  version_group: PokemonEntity;
}

export interface PokemonName {
  name: string;
  language: PokemonEntity;
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: PokemonEntity;
}

export interface PokemonType {
  slot: number;
  type: PokemonEntity;
}

export type Url = Pick<PokemonEntity, "url">;

/**
 * API RESPONSE TYPES
 */

export interface FetchPokemonDataResponse {
  abilities: PokemonAbility[];
  base_experience: number;
  forms: PokemonEntity[];
  game_indices: Array<{
    game_index: number;
    version: PokemonEntity;
  }>;
  height: number;
  held_items?: [];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  /**
   * TODO:
   * Make PokemonMove from API an interface
   * extend it with "learnedBy" for client-side type
   * do the same with all other data structures
   * modified for client
   */
  moves: PokemonMove[];
  name: string;
  order: number;
  past_types?: [];
  species: PokemonEntity;
  stats: PokemonStat[];
  types: PokemonType[];
  weight: number;
}

export interface FetchPokemonSpeciesResponse {
  id: number;
  name: string;
  order: number;
  gender_rate: string;
  capture_rate: string;
  base_happiness: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  hatch_counter: number;
  has_gender_differences: boolean;
  forms_switchable: boolean;
  growth_rate: PokemonEntity;
  pokedex_numbers: PokedexNumber[];
  egg_groups: PokemonEntity[];
  color: PokemonEntity;
  shape: PokemonEntity;
  evolves_from_species: PokemonEntity;
  evolution_chain: Url;
  habitat: PokemonEntity | null;
  generation: PokemonEntity;
  names: PokemonName[];
  flavor_text_entries: FlavorTextEntries[];
  form_descriptions: {
    description: string;
    language: PokemonEntity;
  };
  genera: Array<{
    genus: string;
    language: PokemonEntity;
  }>;
  varieties: Array<{
    is_default: boolean;
    pokemon: PokemonEntity;
  }>;
}
