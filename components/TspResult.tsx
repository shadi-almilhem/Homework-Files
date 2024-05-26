// TspResult.tsx
import React from "react";

interface TspResultProps {
  cost: number;
  paths: string[];
}

interface ResultShowProps {
  result: TspResultProps;
}
const TspResult: React.FC<ResultShowProps> = ({ result }) => {
  const hasMultipleRoutes = result.paths.length > 1;
  const hadCost = result.cost > 0;
  return (
    <div className=" mb-5">
      <h3 className="text-lg text-center mb-3 font-semibold text-slate-700">
        TSP Result:
      </h3>
      <h5 className="text-lg text-center font-semibold  justify-center gap-2 items-center flex mb-3 text-slate-700">
        Best Path time:
        <span className="px-2 my-3 font-semibold  text-2xl text-slate-600">
          {hadCost ? result.cost : "The distances are zero"}
        </span>
      </h5>

      <h5 className="text-lg text-center  font-semibold text-slate-700">
        {hasMultipleRoutes ? "Best Routes" : "Best Route"}:
      </h5>
      <ul className="flex   p-2 justify-around flex-wrap text-slate-600 text-base font-medium  gap-8">
        {result.paths.map((path, index) => (
          <li className="font-mono text-xl" key={index}>
            {path}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default TspResult;
