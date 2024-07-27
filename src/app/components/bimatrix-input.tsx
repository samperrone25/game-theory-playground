"use client";

import React, { useEffect, useState } from "react";

interface BimatrixInputProps {
  initialMatrix: number[][][];
  onUpdate: (newMatrix: number[][][]) => void;
}

const BimatrixInput: React.FC<BimatrixInputProps> = ({
  initialMatrix,
  onUpdate,
}) => {
  const [inputMatrix, setInputMatrix] = useState<string[][]>(
    initialMatrix.map((row) => row.map((cell) => cell.join(","))),
  );

  const handleInputChange = (
    rowIndex: number,
    cellIndex: number,
    value: string,
  ) => {
    const newInputMatrix = [...inputMatrix];
    newInputMatrix[rowIndex][cellIndex] = value;
    setInputMatrix(newInputMatrix);
  };

  const handleUpdate = () => {
    const newInvalidCells = inputMatrix.map((row) =>
      row.map((cell) => !validateInput(cell)),
    );
    setInvalidCells(newInvalidCells);

    const isValid = newInvalidCells.every((row) => row.every((cell) => !cell));
    if (isValid) {
      const newMatrix: number[][][] = inputMatrix.map((row) =>
        row.map((cell) => cell.split(",").map(Number)),
      );
      onUpdate(newMatrix);
      setError(null);
    } else {
      setError("Error: Cells must contain two integers separated by a comma.");
    }
  };

  useEffect(() => {
    setError(null);
    setInvalidCells([]);
  }, [inputMatrix]);

  const [error, setError] = useState<string | null>(null);
  const [invalidCells, setInvalidCells] = useState<boolean[][]>([]);

  const validateInput = (input: string): boolean => {
    const parts = input.split(",");
    return (
      parts.length === 2 && parts.every((part) => /^-?\d+$/.test(part.trim()))
    );
  };

  return (
    <div className="flex flex-col justify-start items-center">
      <div className="w-fit grid grid-cols-3 gap-2 mb-4">
        {inputMatrix.map((row, rowIndex) =>
          row.map((cell, cellIndex) => (
            <input
              key={`${rowIndex}-${cellIndex}`}
              type="text"
              value={cell}
              onChange={(e) =>
                handleInputChange(rowIndex, cellIndex, e.target.value)
              }
              className={`border p-2 w-24 text-center ${invalidCells[rowIndex]?.[cellIndex] ? "border-red-500" : "border-gray-300"}`}
              placeholder="x,y"
            />
          )),
        )}
      </div>
      <button
        onClick={handleUpdate}
        className="bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded"
      >
        Update
      </button>
      <div className="h-6 py-2">
        {" "}
        {/* Reserve space for error message */}
        {error && <div className="text-red-500">{error}</div>}
      </div>
    </div>
  );
};

export default BimatrixInput;
