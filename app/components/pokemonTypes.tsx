import React from "react";

import { type PokemonType, getPokemonTypeIcon } from "~/services";

type Props = {
  types: PokemonType[];
};

export default function PokemonTypes({ types }: Props) {
  return (
    <React.Fragment>
      {types.map(({ type: { name } }, index) => {
        const icon = getPokemonTypeIcon(name);
        return (
          <img
            alt={`${name} type`}
            className="h-7 w-7"
            key={index}
            src={icon}
          />
        );
      })}
    </React.Fragment>
  );
}
