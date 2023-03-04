import { type Pokemon } from "~/types";

type Props = Pick<Pokemon, "abilities" | "description" | "height" | "weight">;

export default function PokemonAboutTab({
  abilities,
  description,
  height,
  weight,
}: Props) {
  return (
    <section className="p-6 grid grid-cols-3 gap-4">
      <div className="col-span-3">{description}</div>

      <span>Height:</span>
      <span className="col-span-2">{height}</span>

      <span>Weight:</span>
      <span className="col-span-2">{weight}</span>

      <span>Abilities:</span>
      <span className="col-span-2">
        {abilities &&
          abilities.map(({ ability: { name }, is_hidden: isHidden }, index) => {
            const isFirstAbility = index === 0;
            return (
              <span key={index}>
                {(isFirstAbility && name) || `, ${name}`}
                {isHidden && " (Hidden Ability)"}
              </span>
            );
          })}
      </span>
    </section>
  );
}
