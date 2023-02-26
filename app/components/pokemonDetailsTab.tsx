export const PokemonDetailsTabsEnum = {
  ABOUT: "about",
  EVOLUTION: "evolution",
  MOVES: "moves",
  STATS: "stats",
} as const;

interface Props {
  activeTab: PokemonDetailsTabsValues;
  onTabChange: (tabName: PokemonDetailsTabsValues) => () => void;
}

type PokemonDetailsTabsKeys = keyof typeof PokemonDetailsTabsEnum;
export type PokemonDetailsTabsValues =
  typeof PokemonDetailsTabsEnum[PokemonDetailsTabsKeys];

export default function PokemonDetailsTab({ activeTab, onTabChange }: Props) {
  return (
    <nav className="flex border-b border-gray-100 text-sm font-medium justify-center">
      <span
        className={`-mb-px border-b p-4 hover:text-cyan-500 ${
          (activeTab === PokemonDetailsTabsEnum.ABOUT &&
            "border-current text-cyan-500") ||
          "border-transparent"
        }`}
        onClick={onTabChange(PokemonDetailsTabsEnum.ABOUT)}
      >
        About
      </span>

      <span
        className={`-mb-px border-b p-4 hover:text-cyan-500 ${
          (activeTab === PokemonDetailsTabsEnum.STATS &&
            "border-current text-cyan-500") ||
          "border-transparent"
        }`}
        onClick={onTabChange(PokemonDetailsTabsEnum.STATS)}
      >
        Base Stats
      </span>

      <span
        className={`-mb-px border-b p-4 hover:text-cyan-500 ${
          (activeTab === PokemonDetailsTabsEnum.EVOLUTION &&
            "border-current text-cyan-500") ||
          "border-transparent"
        }`}
        onClick={onTabChange(PokemonDetailsTabsEnum.EVOLUTION)}
      >
        Evolution
      </span>

      <span
        className={`-mb-px border-b p-4 hover:text-cyan-500 ${
          (activeTab === PokemonDetailsTabsEnum.MOVES &&
            "border-current text-cyan-500") ||
          "border-transparent"
        }`}
        onClick={onTabChange(PokemonDetailsTabsEnum.MOVES)}
      >
        Moves
      </span>
    </nav>
  );
}
