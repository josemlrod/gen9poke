import React from "react";

import { getPokemonTypeIcon } from "~/services";
import { type PokemonTypes as PokemonTypesType } from "~/types";

type Props = PokemonTypesType;

export default function PokemonTypes({ types }: Props) {
  return (
    <React.Fragment>
      {types &&
        types.map(({ type: { name } }, index) => {
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
