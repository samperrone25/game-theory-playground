import React, { useState, useEffect } from "react";
import { isPSNE } from "../utils/helpers";

interface BimatrixProps {
  bimatrix: number[][][];
}

const PSNEBimatrixDisplay: React.FC<BimatrixProps> = ({ bimatrix }) => {
  const choices = ["A", "B", "C"];
  const [clickedCell, setClickedCell] = useState<[number, number] | null>(null);
  const [clickTime, setClickTime] = useState<number | null>(null);

  const handleCellClick = (rowIndex: number, cellIndex: number) => {
    setClickedCell([rowIndex, cellIndex]);
    setClickTime(Date.now());
  };

  useEffect(() => {
    if (clickTime) {
      const timer = setTimeout(() => {
        setClickedCell(null);
        setClickTime(null);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [clickTime]);

  const getCellColor = (rowIndex: number, cellIndex: number) => {
    if (
      clickedCell &&
      clickedCell[0] === rowIndex &&
      clickedCell[1] === cellIndex
    ) {
      return isPSNE(bimatrix, rowIndex, cellIndex)
        ? "bg-green-200"
        : "bg-red-200";
    }
    return "hover:bg-gray-100";
  };

  return (
    <div className="grid grid-cols-5">
      <div className="h-20 col-span-2"></div>
      <div className="h-20 col-span-3 text-center flex items-center justify-center">
        Player 2&apos;s Choices
      </div>

      <div className="row-span-4 flex flex-col items-center justify-center">
        <span className="transform rotate-180 writing-mode-vertical-rl">
          Player 1&apos;s Choices
        </span>
      </div>

      <div className=""></div>
      {choices.map((choice, index) => (
        <div
          key={index}
          className="text-center flex items-center justify-center"
        >
          {choice}
        </div>
      ))}

      {choices.map((choice, rowIndex) => (
        <React.Fragment key={rowIndex}>
          <div className="text-center flex items-center justify-center">
            {choice}
          </div>
          {bimatrix[rowIndex].map((cell, cellIndex) => (
            <div
              key={cellIndex}
              className={`border border-gray-400 p-2 w-20 h-20 flex items-center justify-center cursor-pointer ${getCellColor(rowIndex, cellIndex)}`}
              onClick={() => handleCellClick(rowIndex, cellIndex)}
            >
              {cell.join(", ")}
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default PSNEBimatrixDisplay;
