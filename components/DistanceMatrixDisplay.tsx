type DistanceMatrixType = {
  matrix: number[][];
  matrixSize: number;
  handleCellValueChange: (row: number, col: number, value: string) => void;
};

const DistanceMatrixDisplay = ({
  matrix,
  matrixSize,
  handleCellValueChange,
}: DistanceMatrixType) => {
  return (
    <table className="mt-4">
      <thead>
        <tr>
          <th></th>
          {Array.from({ length: matrixSize }, (_, i) => (
            <th key={i} className="px-2 py-1 text-center">
              {String.fromCharCode("A".charCodeAt(0) + i)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {matrix.map((row, rowIndex) => (
          <tr key={rowIndex}>
            <th className="px-2 py-1 text-center">
              {String.fromCharCode("A".charCodeAt(0) + rowIndex)}
            </th>
            {row.map((cell, colIndex) => (
              <td key={colIndex} className="w-auto">
                <input
                  type="number"
                  value={cell}
                  className="border text-center 	  w-16 p-2 m-2 rounded-md"
                  max={100}
                  min={0}
                  disabled={rowIndex === colIndex}
                  onChange={(e) =>
                    handleCellValueChange(rowIndex, colIndex, e.target.value)
                  }
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DistanceMatrixDisplay;
