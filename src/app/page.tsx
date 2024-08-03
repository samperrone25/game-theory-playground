import DominantStrategyGame from "./components/ds-game";
import PureStrategyNashEquilibriaGame from "./components/psne-game";
import BestResponseGame from "./components/br-game";
import DropdownBox from "./components/ui/dropdown-box";

export default function Home() {
  return (
    <div>
      <div className="flex flex-row-reverse items-center p-1 bg-gray-100">
        <a
          href="https://github.com/samperrone25"
          className="ml-4 text-blue-600 hover:text-blue-800"
        >
          GitHub
        </a>
        <a
          href="/site-under-construction"
          className="text-blue-600 hover:text-blue-800"
        >
          Home
        </a>
      </div>
      <div className="w-full flex flex-col items-center">
        <div className="w-full max-w-screen-xl flex flex-col justify-between items-center gap-4">
          <div className="p-6 text-4xl font-bold">Game Theory Playground</div>
          <DropdownBox subtitle="1) Best Responses" openOnInit={true}>
            <BestResponseGame></BestResponseGame>
          </DropdownBox>
          <DropdownBox subtitle="2) Dominant Strategies">
            <DominantStrategyGame></DominantStrategyGame>
          </DropdownBox>
          <DropdownBox subtitle="3) Pure Strategy Nash Equilibria">
            <PureStrategyNashEquilibriaGame></PureStrategyNashEquilibriaGame>
          </DropdownBox>
          <div className="p-6"></div>
        </div>
      </div>
    </div>
  );
}
