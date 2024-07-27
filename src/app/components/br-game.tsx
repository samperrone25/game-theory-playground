"use client";

import React, { useState } from "react";
import BestResponseBimatrixDisplay from "./br-bimatrix-display";

export default function BestResponseGame() {
  const [brBimatrix, setBrMatrix] = useState([
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
  const [player2Choice, setPlayer2Choice] = useState<number>(0);

  const randomizeGame = () => {
    const newMatrix = brBimatrix.map((row) =>
      row.map(() => [
        Math.floor(Math.random() * 10) + 1,
        Math.floor(Math.random() * 10) + 1,
      ]),
    );
    setBrMatrix(newMatrix);
    setPlayer2Choice(Math.floor(Math.random() * 3));
  };

  return (
    <div className="w-full border-2 border-black rounded p-4">
      <div>1. Best Response</div>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 flex flex-col gap-2">
          <div>
            A Best Response (BR) is the choice that results in a maximal payoff
            given all the choices of the other players.
          </div>
          <div>
            Select the Best Response from choices A, B or C given Player
            2&apos;s indicated choice.
          </div>
          <div>
            Randomise the game board and Player 2&apos;s choice and try again.
          </div>
          <div className="flex justify-center">
            <button
              onClick={randomizeGame}
              className="mt-4 bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded"
            >
              Randomize Game
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          <BestResponseBimatrixDisplay
            bimatrix={brBimatrix}
            player2Choice={player2Choice}
          ></BestResponseBimatrixDisplay>
        </div>
      </div>
    </div>
  );
}
