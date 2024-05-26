import React from "react";

interface Item {
  name: string;
  weight: number;
  value: number;
}

interface Shipment {
  index: number;
  items: Item[];
}

interface ShipmentsProps {
  shipments: Shipment[];
}

const Shipments: React.FC<ShipmentsProps> = ({ shipments }) => {
  const shipmentMap = shipments.reduce<{ [key: number]: Shipment[] }>(
    (acc, shipment) => {
      if (!acc[shipment.index]) {
        acc[shipment.index] = [];
      }
      acc[shipment.index].push(shipment);
      return acc;
    },
    {}
  );

  return (
    <div className="grid gap-2 grid-cols-2">
      {Object.entries(shipmentMap).map(([index, shipments]) => (
        <div className="flex h-full w-full self-center mb-5" key={index}>
          <h3 className="p-2 w-fit font-semibold text-slate-600 text-nowrap">
            Truck {Number(index) + 1}:
          </h3>
          <ul>
            {shipments.map(({ items }, shipmentIdx) => (
              <div key={shipmentIdx}>
                {items.map((item) => (
                  <li key={item.name} className="p-2">
                    <span className="font-medium text-slate-600 pr-2">
                      {item.name}
                    </span>
                    <span className="block text-slate-400 text-nowrap text-[12px] font-mono">
                      (Weight: {item.weight}, Value: {item.value})
                    </span>
                  </li>
                ))}
                {shipmentIdx < shipments.length - 1 && (
                  <hr className="border-t border-gray-300 my-2" />
                )}
              </div>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Shipments;
