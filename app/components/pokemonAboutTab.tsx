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
    </section>
  );
}
