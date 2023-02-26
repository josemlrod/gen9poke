export const PokemonDetailsTabs = {
  ABOUT: "about",
  EVOLUTION: "evolution",
  MOVES: "moves",
  STATS: "stats",
} as const;
interface Props {
  activeTab: string;
  onTabChange: (tabName: string) => () => void;
}

export default function PokemonDetailsTab({ activeTab, onTabChange }: Props) {
  return (
    <nav className="flex border-b border-gray-100 text-sm font-medium justify-center">
      <span
        className={`-mb-px border-b p-4 hover:text-cyan-500 ${
          (activeTab === PokemonDetailsTabs.ABOUT &&
            "border-current text-cyan-500") ||
          "border-transparent"
        }`}
        onClick={onTabChange(PokemonDetailsTabs.ABOUT)}
      >
        About
      </span>

      <span
        className={`-mb-px border-b p-4 hover:text-cyan-500 ${
          (activeTab === PokemonDetailsTabs.STATS &&
            "border-current text-cyan-500") ||
          "border-transparent"
        }`}
        onClick={onTabChange(PokemonDetailsTabs.STATS)}
      >
        Base Stats
      </span>

      <span
        className={`-mb-px border-b p-4 hover:text-cyan-500 ${
          (activeTab === PokemonDetailsTabs.EVOLUTION &&
            "border-current text-cyan-500") ||
          "border-transparent"
        }`}
        onClick={onTabChange(PokemonDetailsTabs.EVOLUTION)}
      >
        Evolution
      </span>

      <span
        className={`-mb-px border-b p-4 hover:text-cyan-500 ${
          (activeTab === PokemonDetailsTabs.MOVES &&
            "border-current text-cyan-500") ||
          "border-transparent"
        }`}
        onClick={onTabChange(PokemonDetailsTabs.MOVES)}
      >
        Moves
      </span>
    </nav>
  );
}
