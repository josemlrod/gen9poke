import React from "react";

import { type PokemonStats } from "~/services";
import { mapStatValueToStyles } from "~/services";

type Props = { stats: PokemonStats[] };

export default function PokemonStatsTab({ stats }: Props) {
  const totalStats = stats.reduce(
    (acc, { base_stat: baseStat }) => acc + baseStat,
    0
  );
  const dividedTotalStat = totalStats / 8;
  const totalStatsStyles = mapStatValueToStyles(dividedTotalStat, true);

  return (
    <section
      className="p-6 grid grid-cols-1 gap-1"
      style={{ height: 403, overflowY: "auto" }}
    >
      {stats.map(({ base_stat: baseStat, stat: { name } }, index) => {
        const { progressBarBackgroundColor, progressBarWidth } =
          mapStatValueToStyles(baseStat);
        return (
          <div
            key={index}
            className="grid grid-flow-col grid-cols-3 items-center"
          >
            <div className="mb-1 text-base font-medium text-black">{name}</div>
            <div className="w-full bg-gray-200 rounded-full h-max col-span-2">
              <div
                className={`${progressBarBackgroundColor} text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full`}
                style={{ width: progressBarWidth }}
              >
                {baseStat}
              </div>
            </div>
          </div>
        );
      })}
      <div className="grid grid-flow-col grid-cols-3 items-center">
        <div className="mb-1 text-base font-medium text-black">Total</div>
        <div className="w-full bg-gray-200 rounded-full h-max col-span-2">
          <div
            className={`${totalStatsStyles.progressBarBackgroundColor} text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full`}
            style={{ width: `${dividedTotalStat}%` }}
          >
            {totalStats}
          </div>
        </div>
      </div>
    </section>
  );
}
