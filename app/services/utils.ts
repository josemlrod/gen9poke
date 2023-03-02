import BugTypeIcon from "../../public/bug.svg";
import DarkTypeIcon from "../../public/dark.svg";
import DragonTypeIcon from "../../public/dragon.svg";
import ElectricTypeIcon from "../../public/electric.svg";
import FairyTypeIcon from "../../public/fairy.svg";
import FightingTypeIcon from "../../public/fighting.svg";
import FireTypeIcon from "../../public/fire.svg";
import FlyingTypeIcon from "../../public/flying.svg";
import GhostTypeIcon from "../../public/ghost.svg";
import GrassTypeIcon from "../../public/grass.svg";
import GroundTypeIcon from "../../public/ground.svg";
import IceTypeIcon from "../../public/ice.svg";
import NormalTypeIcon from "../../public/normal.svg";
import PoisonTypeIcon from "../../public/poison.svg";
import PsychicTypeIcon from "../../public/psychic.svg";
import RockTypeIcon from "../../public/rock.svg";
import SteelTypeIcon from "../../public/steel.svg";
import WaterTypeIcon from "../../public/water.svg";

const pokemonTypeToColor: { [key: string]: string } = {
  bug: "#92BC2C",
  dark: "#595761",
  dragon: "#0C69C8",
  electric: "#F2D94E",
  fairy: "#EE90E6",
  fighting: "#D3425F",
  fire: "#FBA54C",
  flying: "#A1BBEC",
  ghost: "#5F6DBC",
  grass: "#5FBD58",
  ground: "#DA7C4D",
  ice: "#75D0C1",
  normal: "#A0A29F",
  poison: "#B763CF",
  psychic: "#FA8581",
  rock: "#C9BB8A",
  steel: "#5695A3",
  water: "#539DDF",
};

const pokemonTypeToIcon: { [key: string]: string } = {
  bug: BugTypeIcon,
  dark: DarkTypeIcon,
  dragon: DragonTypeIcon,
  electric: ElectricTypeIcon,
  fairy: FairyTypeIcon,
  fighting: FightingTypeIcon,
  fire: FireTypeIcon,
  flying: FlyingTypeIcon,
  ghost: GhostTypeIcon,
  grass: GrassTypeIcon,
  ground: GroundTypeIcon,
  ice: IceTypeIcon,
  normal: NormalTypeIcon,
  poison: PoisonTypeIcon,
  psychic: PsychicTypeIcon,
  rock: RockTypeIcon,
  steel: SteelTypeIcon,
  water: WaterTypeIcon,
};

export function capitalizeFirstLetter(word: string) {
  const [firstLetter, ...rest] = word.split("");
  return `${firstLetter.toUpperCase()}${rest.join("")}`;
}

export function getPokemonCardBgColor(pokemonType?: string) {
  return pokemonType && pokemonTypeToColor[pokemonType];
}

export function getPokemonTypeIcon(pokemonType: string) {
  return pokemonTypeToIcon[pokemonType];
}

export function formatPokemonId(id: number) {
  if (id) {
    const idToString = id.toString();
    return idToString.padStart(3, "0");
  }
  return null;
}

export function replaceSpacesWithHyphens(word: string) {
  const splitAtSpaces = word.split(" ");
  return splitAtSpaces.join("-");
}

export function replaceHyphensWithSpaces(word: string) {
  const splitAtHyphens = word.split("-");
  const capitalizedWords = splitAtHyphens.map((word) =>
    capitalizeFirstLetter(word)
  );
  return capitalizedWords.join(" ");
}

export const mapStatValueToStyles = (
  statValue: number,
  isTotalStat?: boolean
) => {
  const dividedStatValue = isTotalStat
    ? Math.round(statValue)
    : Math.round(statValue / 2);
  if (dividedStatValue <= 25) {
    return {
      progressBarWidth: `${dividedStatValue}%`,
      progressBarBackgroundColor: "bg-red-600",
    };
  } else if (dividedStatValue >= 75) {
    return {
      progressBarWidth: `${dividedStatValue}%`,
      progressBarBackgroundColor: "bg-blue-600",
    };
  } else if (dividedStatValue > 25 && dividedStatValue < 50) {
    return {
      progressBarWidth: `${dividedStatValue}%`,
      progressBarBackgroundColor: "bg-yellow-400",
    };
  } else {
    return {
      progressBarWidth: `${dividedStatValue}%`,
      progressBarBackgroundColor: "bg-green-600",
    };
  }
};
