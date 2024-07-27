import React from "react";
import DominantStrategyBimatrixDisplay from "./ds-bimatrix-display";

export default function DominantStrategyGame() {
  return (
    <div className="w-full border-2 border-black rounded p-4">
      <div>2. Dominant Strategies</div>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 flex flex-col gap-2">
          <div>
            A Strictly Dominant Strategy (SDS) is a choice that guarantees
            better payoffs than all all others regardless of the choices of
            other players.
          </div>
          <div>
            Find the SDSs for either player within the below game bimatrix by
            selecting choice A, B or C.
          </div>
        </div>
        <div className="flex justify-center items-center">
          <DominantStrategyBimatrixDisplay></DominantStrategyBimatrixDisplay>
        </div>
      </div>
    </div>
  );
}
