export function capitalizeFirstLetter(word: string) {
  const [firstLetter, ...rest] = word.split("");
  return `${firstLetter.toUpperCase()}${rest.join("")}`;
}

export function formatPokemonId(id: number) {
  const idToString = id.toString();
  return idToString.padStart(3, "0");
}

const pokemonTypeToColor: { [key: string]: string } = {
  black: "bg-black-900",
  blue: "bg-blue-500",
  brown: "bg-yellow-900",
  gray: "bg-gray-500",
  green: "bg-green-500",
  pink: "bg-pink-500",
  purple: "bg-purple-500",
  red: "bg-red-500",
  yellow: "bg-yellow-500",
  white: "bg-gray-100",
};

export function getPokemonCardBgColor(pokemonType: string) {
  return pokemonTypeToColor[pokemonType];
}
