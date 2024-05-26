import React from "react";

interface UsageCountsProps {
  usageCounts: Record<number, number>;
}

const UsageCounts: React.FC<UsageCountsProps> = ({ usageCounts }) => (
  <div className="mt-5 mb-5">
    <h3 className="text-lg text-center mb-3 text-slate-700">
      Truck Usage Counts:
    </h3>
    <ul className="grid grid-cols-3  p-2 justify-between  gap-4">
      {Object.entries(usageCounts).map(([index, count]) => (
        <li
          className="py-2 text-slate-600 font-semibold text-nowrap"
          key={index}
        >
          Truck {Number(index) + 1}:
          <span className="pl-2 align-bottom font-mono font-medium">
            {count} {count === 1 ? "time" : "times"}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

export default UsageCounts;
