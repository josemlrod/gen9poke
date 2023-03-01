import { type PokemonStats } from "~/services";

type Props = { stats: PokemonStats[] };

export default function PokemonStatsTab({ stats }: Props) {
  return (
    <section className="p-6 grid grid-cols-1 gap-4">
      <div className="mb-1 text-base font-medium dark:text-white">Dark</div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
        <div
          className="bg-gray-600 h-2.5 rounded-full dark:bg-gray-300"
          style={{ width: "45%" }}
        ></div>
      </div>
      <div className="mb-1 text-base font-medium text-blue-700 dark:text-blue-500">
        Blue
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: "45%" }}
        ></div>
      </div>
      <div className="mb-1 text-base font-medium text-red-700 dark:text-red-500">
        Red
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
        <div
          className="bg-red-600 h-2.5 rounded-full dark:bg-red-500"
          style={{ width: "45%" }}
        ></div>
      </div>
      <div className="mb-1 text-base font-medium text-green-700 dark:text-green-500">
        Green
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
        <div
          className="bg-green-600 h-2.5 rounded-full dark:bg-green-500"
          style={{ width: "45%" }}
        ></div>
      </div>
      <div className="mb-1 text-base font-medium text-yellow-700 dark:text-yellow-500">
        Yellow
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
        <div
          className="bg-yellow-400 h-2.5 rounded-full"
          style={{ width: "45%" }}
        ></div>
      </div>
      <div className="mb-1 text-base font-medium text-indigo-700 dark:text-indigo-500">
        Indigo
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
        <div
          className="bg-indigo-600 h-2.5 rounded-full dark:bg-indigo-500"
          style={{ width: "45%" }}
        ></div>
      </div>
      <div className="mb-1 text-base font-medium text-purple-700 dark:text-purple-500">
        Purple
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className="bg-purple-600 h-2.5 rounded-full dark:bg-purple-500"
          style={{ width: "45%" }}
        ></div>
      </div>
    </section>
  );
}
