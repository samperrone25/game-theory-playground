import React, { useState, useEffect } from "react";
import { isRowPlayerBestResponse } from "../utils/helpers";

interface BimatrixProps {
  bimatrix: number[][][];
  player2Choice: number;
}

export default function BestResponseBimatrixDisplay({
  bimatrix,
  player2Choice,
}: BimatrixProps) {
  const choices = ["A", "B", "C"];
  const [clickedRow, setClickedRow] = useState<number | null>(null);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  useEffect(() => {
    if (clickedRow !== null) {
      const timer = setTimeout(() => {
        setClickedRow(null);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [clickedRow]);

  const getBackgroundColor = (rowIndex: number, cellIndex: number): string => {
    if (cellIndex === player2Choice) {
      if (rowIndex === clickedRow) {
        if (isRowPlayerBestResponse(bimatrix, rowIndex, cellIndex)) {
          return "bg-green-300"; // correct best response selection
        } else {
          return "bg-red-200"; // incorrect best response selection
        }
      } else {
        return "bg-gray-300"; // indicated as player 2's choice
      }
    }
    if (rowIndex === hoveredRow) {
      return "bg-gray-100"; // hovered row
    }
    return "";
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
          className={`text-center flex items-center justify-center ${getBackgroundColor(-1, index)}`}
        >
          {choice}
        </div>
      ))}

      {choices.map((choice, rowIndex) => (
        <React.Fragment key={rowIndex}>
          <div
            className={`text-center flex items-center justify-center cursor-pointer ${
              rowIndex === hoveredRow ? "bg-gray-100" : ""
            }`}
            onClick={() => setClickedRow(rowIndex)}
            onMouseEnter={() => setHoveredRow(rowIndex)}
            onMouseLeave={() => setHoveredRow(null)}
          >
            {choice}
          </div>
          {bimatrix[rowIndex].map((cell, cellIndex) => (
            <div
              key={cellIndex}
              className={`border border-gray-400 p-2 w-20 h-20 flex items-center justify-center ${getBackgroundColor(
                rowIndex,
                cellIndex,
              )}`}
            >
              {cell.join(", ")}
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}
