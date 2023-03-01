export type Pokemon = {
  id: string;
  name: string;
  typeColor: string;
  abilities: PokemonAbility[];
  height: string;
  moves: PokemonMove[];
  stats: PokemonStats[];
  types: PokemonType[];
  weight: string;
};

export type PokemonAbility = {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: string;
  slot: number;
};

export type PokemonEntry = {
  entry_number: number;
  pokemon_species: {
    name: string;
    url: string;
  };
};

export type PokemonMove = {
  move: {
    name: string;
    url: string;
  };
  version_group_details: PokemonMoveDetails[];
};

export type PokemonMoveDetails = {
  level_learned_at: number;
  move_learn_method: {
    name: string;
    url: string;
  };
  version_group: {
    name: string;
    url: string;
  };
};

export type PokemonName = {
  language: {
    name: string;
    url: string;
  };
  name: string;
};

export type PokemonStats = {
  base_stat: number;
  effor: number;
  stat: {
    name: string;
    url: string;
  };
};

export type PokemonType = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

export type AllPokemonResponse = {
  next: string;
  pokemon: AllPokemonResponsePokemon[];
};

export type AllPokemonResponsePokemon = {
  name: string;
  url: string;
};
