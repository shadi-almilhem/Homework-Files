import React from "react";
import { FaMinus } from "react-icons/fa";
import { UseFormRegister } from "react-hook-form";
import LabelAndInput from "../components/LabelAndInput";

type Good = {
  value: string;
  weight: string;
  name: string;
};

type GoodsInputProps = {
  good: Good;
  setGoods: (newGoods: Good[]) => void;
  handleRemoveGood: (index: number) => void;
  register: UseFormRegister<any>;
  index: number;
};

const GoodsInput: React.FC<GoodsInputProps> = ({
  good,
  register,
  index,
  setGoods,
  handleRemoveGood,
}) => (
  <div className="px-4 py-1 flex flex-col">
    <div className="mb-5 relative gap-2 flex justify-between items-center">
      <div className="flex gap-2">
        <LabelAndInput
          register={register}
          label="Good Name"
          name={`goods.${index}.name`}
        />
        <LabelAndInput
          register={register}
          label="Good Value"
          name={`goods.${index}.value`}
        />
        <LabelAndInput
          register={register}
          label="Good Weight"
          name={`goods.${index}.weight`}
        />
      </div>
      <button
        type="button"
        className={`flex justify-end ${
          index === 0 ? "text-white" : "text-red-500"
        } self-end mb-3`}
        onClick={() => handleRemoveGood(index)}
        disabled={index === 0}
      >
        <FaMinus />
      </button>
    </div>
  </div>
);

export default GoodsInput;
