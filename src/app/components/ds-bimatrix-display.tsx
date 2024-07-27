"use client";

import React, { useState, useEffect } from "react";
import { isDominantStrategy } from "../utils/helpers";

export default function DominantStrategyBimatrixDisplay() {
  const dsBimatrix = [
    [
      [8, 8],
      [5, 4],
      [9, 9],
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
  ];
  const choices = ["A", "B", "C"];
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [hoveredCol, setHoveredCol] = useState<number | null>(null);
  const [clickedRow, setClickedRow] = useState<number | null>(null);
  const [clickedCol, setClickedCol] = useState<number | null>(null);

  useEffect(() => {
    if (clickedRow !== null) {
      const timer = setTimeout(() => {
        setClickedRow(null);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [clickedRow]);

  useEffect(() => {
    if (clickedCol !== null) {
      const timer = setTimeout(() => {
        setClickedCol(null);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [clickedCol]);

  const handleRowClick = (index: number) => {
    setClickedRow(index);
  };

  const handleColClick = (index: number) => {
    setClickedCol(index);
  };

  const getBackgroundColor = (rowIndex: number, cellIndex: number) => {
    if (clickedRow === rowIndex) {
      return isDominantStrategy(dsBimatrix, rowIndex, null)
        ? "bg-green-200"
        : "bg-red-200";
    }
    if (clickedCol === cellIndex) {
      return isDominantStrategy(dsBimatrix, null, cellIndex)
        ? "bg-green-200"
        : "bg-red-200";
    }
    if (hoveredRow === rowIndex || hoveredCol === cellIndex) {
      return "bg-gray-100";
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
          className="text-center flex items-center justify-center cursor-pointer"
          onMouseEnter={() => setHoveredCol(index)}
          onMouseLeave={() => setHoveredCol(null)}
          onClick={() => handleColClick(index)}
        >
          {choice}
        </div>
      ))}

      {choices.map((choice, rowIndex) => (
        <React.Fragment key={rowIndex}>
          <div
            className="text-center flex items-center justify-center cursor-pointer"
            onMouseEnter={() => setHoveredRow(rowIndex)}
            onMouseLeave={() => setHoveredRow(null)}
            onClick={() => handleRowClick(rowIndex)}
          >
            {choice}
          </div>
          {dsBimatrix[rowIndex].map((cell, cellIndex) => (
            <div
              key={cellIndex}
              className={`border border-gray-400 p-2 w-20 h-20 flex items-center justify-center cursor-pointer
                ${getBackgroundColor(rowIndex, cellIndex)}`}
            >
              {cell.join(", ")}
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}
