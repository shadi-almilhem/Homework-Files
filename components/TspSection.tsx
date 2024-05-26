// TspSection.tsx
import React, { useState } from "react";
import DistanceMatrixDisplay from "./DistanceMatrixDisplay";

type TspProps = {
  matrix: number[][];
  setMatrix: (value: number[][]) => void;
  setIsConfirmed: (state: boolean) => void;
};

const TspSection = ({ matrix, setMatrix, setIsConfirmed }: TspProps) => {
  const initialMatrixSize = 3;
  const [matrixSize, setMatrixSize] = useState<number>(initialMatrixSize);
  const [isSymmetric, setIsSymmetric] = useState<boolean>(false);

  const handleMatrixSizeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newSize = parseInt(event.target.value, 10);
    setMatrixSize(newSize);
    const newMatrix = Array.from({ length: newSize }, (_, i) =>
      Array.from({ length: newSize }, (_, j) =>
        i < matrix.length && j < matrix[i].length ? matrix[i][j] : 0
      )
    );
    setMatrix(newMatrix);
  };

  const handleSymmetricChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsSymmetric(event.target.checked);
  };

  const handleCellValueChange = (row: number, col: number, value: string) => {
    const newValue = parseInt(value, 10);
    const updatedMatrix = matrix.map((r, rowIndex) =>
      r.map((cell, colIndex) =>
        rowIndex === row && colIndex === col ? newValue : cell
      )
    );

    if (isSymmetric && row !== col) {
      updatedMatrix[col][row] = newValue; // Ensure symmetry
    }
    setIsConfirmed(false);
    setMatrix(updatedMatrix); // Update the matrix in the Home component
  };

  return (
    <div className="p-4">
      <label className="flex font-medium items-center gap-2">
        Count of Nodes:
        <input
          type="number"
          placeholder="Enter matrix size"
          value={matrixSize}
          onChange={handleMatrixSizeChange}
          className="border  max-w-[3.5rem] text-center p-2 rounded-md"
          min={2}
          max={20}
        />
      </label>
      <label className="flex my-4 items-center font-medium gap-2">
        <input
          className="accent-slate-800 w-4 h-4 rounded"
          type="checkbox"
          checked={isSymmetric}
          onChange={handleSymmetricChange}
        />
        Symmetric Matrix
      </label>
      {matrixSize > 0 && (
        <DistanceMatrixDisplay
          handleCellValueChange={handleCellValueChange}
          matrix={matrix}
          matrixSize={matrixSize}
        />
      )}
    </div>
  );
};

export default TspSection;
