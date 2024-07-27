"use client";

import React, { useState } from "react";
import PSNEBimatrixDisplay from "./psne-bimatrix-display";
import BimatrixInput from "./bimatrix-input";

export default function PureStrategyNashEquilibriaGame() {
  const [pureStratNashBimatrix, setPureStratNashBimatrix] = useState([
    [
      [8, 8],
      [3, 4],
      [6, 4],
    ],
    [
      [3, 5],
      [4, 4],
      [7, 7],
    ],
    [
      [3, 1],
      [4, 2],
      [5, 6],
    ],
  ]);

  const handleBimatrixUpdate = (newBiatrix: number[][][]) => {
    setPureStratNashBimatrix(newBiatrix);
  };

  return (
    <div className="w-full border-2 border-black rounded p-4">
      <div>3. Pure Strategy Nash Equilibria</div>
      <div className="p-4 flex flex-col gap-2">
        <div>
          A Pure Strategy (PS) is a plan that outlines moves a player will make
          for any game situation involving no probabilistic mixing between
          strategies.
        </div>
        <div>
          A Nash Equilibrium (NE) is a game state where no player has an
          incentive to deviate from their choice.
        </div>{" "}
        {/* should link to a website for NE */}
        <div>
          Find the PS NEs within the below game bimatrix. Feel free to edit the
          player payoffs and try again.
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex justify-center items-center">
          <BimatrixInput
            initialMatrix={pureStratNashBimatrix}
            onUpdate={handleBimatrixUpdate}
          ></BimatrixInput>
        </div>
        <div className="flex justify-center items-center">
          <PSNEBimatrixDisplay bimatrix={pureStratNashBimatrix} />
        </div>
      </div>
    </div>
  );
}
