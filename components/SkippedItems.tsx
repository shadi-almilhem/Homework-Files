import React from "react";

interface Item {
  name: string;
  weight: number;
  value: number;
}

interface SkippedItemsProps {
  skippedItems: Item[];
}

const SkippedItems: React.FC<SkippedItemsProps> = ({ skippedItems }) => (
  <div className="mt-5 mb-5">
    <h3 className="text-lg text-center mb-3 text-slate-700">Skipped Items:</h3>
    {skippedItems.length === 0 ? (
      <p className="text-center text-slate-400 font-mono">none</p>
    ) : (
      <ul className="grid grid-cols-3 gap-4 justify-between">
        {skippedItems.map((item) => (
          <li key={item.name} className="p-2">
            <span className="font-medium text-slate-600 pr-2">{item.name}</span>
            <span className="block text-nowrap text-[12px] font-mono">
              (Weight: {item.weight}, Value: {item.value})
            </span>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default SkippedItems;
