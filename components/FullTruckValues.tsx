import React from "react";

interface FullTruckValuesProps {
  fullTruckValues: Record<number, number>;
}

const FullTruckValues: React.FC<FullTruckValuesProps> = ({
  fullTruckValues,
}) => (
  <div className="mt-5 mb-5">
    <h3 className="text-lg text-center font-semibold mb-3 text-slate-700">
      Full Truck Values:
    </h3>
    <ul className="grid grid-cols-4 gap-4 justify-between p-2">
      {Object.entries(fullTruckValues).map(([index, value]) => (
        <li
          className=" w-fit font-semibold text-nowrap text-slate-600"
          key={index}
        >
          Truck {Number(index) + 1}:{" "}
          <span className="font-mono font-normal p-2  text-base ">{value}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default FullTruckValues;
