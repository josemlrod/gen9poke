import React from "react";

import { type PokemonMove } from "~/services/pokemonTypes";
import { MoveLearningMethods } from "~/services/pokemon";

export function PokemonMovesTab({ moves }: { moves: PokemonMove[] }) {
  const movesLearnedByEgg = moves.filter((move) => {
    return move.learnedBy === MoveLearningMethods.Egg;
  });
  const movesLearnedByLevelingUp = moves.filter((move) => {
    return move.learnedBy === MoveLearningMethods.LevelingUp;
  });
  const movesLearnedByMachine = moves.filter((move) => {
    return move.learnedBy === MoveLearningMethods.Machine;
  });
  const movesLearnedByTutor = moves.filter((move) => {
    return move.learnedBy === MoveLearningMethods.Tutor;
  });

  return (
    <section
      className="p-6 grid grid-cols-2 gap-4"
      style={{ height: 403, overflowY: "auto" }}
    >
      {movesLearnedByEgg.length ? (
        <React.Fragment>
          <div>Learned by Egg:</div>
          <div>
            {movesLearnedByEgg.map((move, index) => (
              <p className="pb-1" key={index}>
                {move.move.name}
              </p>
            ))}
          </div>
        </React.Fragment>
      ) : null}

      {movesLearnedByLevelingUp ? (
        <React.Fragment>
          <div>Learned by Leveling Up:</div>
          <div>
            {movesLearnedByLevelingUp.map((move, index) => (
              <p className="pb-1" key={index}>
                {move.move.name}
              </p>
            ))}
          </div>
        </React.Fragment>
      ) : null}

      {movesLearnedByMachine ? (
        <React.Fragment>
          <div>Learned by Machine:</div>
          <div>
            {movesLearnedByMachine.map((move, index) => (
              <p className="pb-1" key={index}>
                {move.move.name}
              </p>
            ))}
          </div>
        </React.Fragment>
      ) : null}

      {movesLearnedByTutor ? (
        <React.Fragment>
          <div>Learned by Tutor:</div>
          <div>
            {movesLearnedByTutor.map((move, index) => (
              <p className="pb-1" key={index}>
                {move.move.name}
              </p>
            ))}
          </div>
        </React.Fragment>
      ) : null}
    </section>
  );
}
