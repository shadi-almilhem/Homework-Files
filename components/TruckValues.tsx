import React from "react";

interface TruckValuesProps {
  truckValues: Record<number, number[]>;
}

const TruckValues: React.FC<TruckValuesProps> = ({ truckValues }) => (
  <div className="mt-5 mb-5 grid gap-2 grid-cols-2">
    <h3 className="text-lg text-center mb-3 text-slate-700 col-span-2">
      Truck Values:
    </h3>
    {Object.entries(truckValues).map(([index, values]) => (
      <div className="flex items-baseline self-start gap-2" key={index}>
        <h4 className="p-2 w-fit font-semibold text-slate-600 text-nowrap">
          Truck {Number(index) + 1}:
        </h4>
        <ul className="flex flex-col p-1 self-center">
          {values.length > 0 ? (
            values.map((value, idx) => (
              <li className="font-mono text-slate-600 p-1" key={idx}>
                Shipment {idx + 1}:{" "}
                <span className="font-semibold">{value}</span>
              </li>
            ))
          ) : (
            <li className="font-mono col-span-2 text-slate-400">
              NO SHIPMENTS
            </li>
          )}
        </ul>
      </div>
    ))}
  </div>
);

export default TruckValues;
