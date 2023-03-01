import React from "react";

import { type Pokemon } from "~/services";

type Props = Omit<
  Pokemon,
  "id" | "name" | "typeColor" | "moves" | "stats" | "types"
>;

export default function PokemonAboutTab({ abilities, height, weight }: Props) {
  return (
    <section>
      <p>Height: {height}</p>
      <p>Weight: {weight}</p>
      <p>
        {"Abilities: "}
        {abilities.map(({ ability: { name }, is_hidden: isHidden }, index) => {
          const isFirstAbility = index === 0;
          return (
            <span key={index}>
              {(isFirstAbility && name) || `, ${name}`}
              {isHidden && " (Hidden Ability)"}
            </span>
          );
        })}
      </p>
    </section>
  );
}
