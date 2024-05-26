import React from "react";
import { Spinner } from "@/components/ui/Spinner";
import Shipments from "./Shipments";
import UsageCounts from "./UsageCounts";
import SkippedItems from "./SkippedItems";
import TruckValues from "./TruckValues";
import FullTruckValues from "./FullTruckValues";

interface Item {
  name: string;
  weight: number;
  value: number;
}

interface Shipment {
  index: number;
  items: Item[];
}

interface KnapsackResult {
  shipments: Shipment[];
  usageCounts: Record<number, number>;
  skippedItems: Item[];
  truckValues: Record<number, number[]>;
  totalCarriedValue: number;
  fullTruckValues: Record<number, number>;
}

interface ResultShowProps {
  result: KnapsackResult;
}

const ResultShow: React.FC<ResultShowProps> = ({ result }) => (
  <div className="flex flex-col gap-2">
    {!result && <Spinner size="medium" />}
    <h3 className="text-lg text-center mb-3 font-semibold text-slate-700">
      The Shipments:
    </h3>

    {result?.shipments && result.shipments.length > 0 ? (
      <Shipments shipments={result.shipments} />
    ) : (
      <div className="text-center col-span-2  font-mono text-slate-400">
        No shipments available.
      </div>
    )}

    <UsageCounts usageCounts={result.usageCounts} />
    <SkippedItems skippedItems={result.skippedItems} />
    <TruckValues truckValues={result.truckValues} />
    <FullTruckValues fullTruckValues={result.fullTruckValues} />

    <div className="mt-5 mb-5">
      <h3 className="text-lg text-center font-semibold  justify-center gap-2 items-center flex mb-3 text-slate-700">
        Total Carried Value:{" "}
        <span className="font-semibold  text-2xl text-slate-600">
          {result.totalCarriedValue}
        </span>
      </h3>
    </div>
  </div>
);

export default ResultShow;
