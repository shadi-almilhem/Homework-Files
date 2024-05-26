// TruckCapacity.tsx
import { FaTruckLoading, FaPlus, FaMinus } from "react-icons/fa";
import { UseFormRegister, useFieldArray, Control } from "react-hook-form";

type TruckCapacityProps = {
  register: UseFormRegister<any>;
  control: Control<any>; // Control from react-hook-form
  setIsConfirmed: (state: boolean) => void;
};

const TruckCapacity = ({
  register,
  control,
  setIsConfirmed,
}: TruckCapacityProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "truckCapacities",
  });

  // Function to handle adding a truck capacity
  const handleAddCapacity = () => {
    append({ capacity: undefined });
    setIsConfirmed(false);
  };

  // Function to handle removing a truck capacity
  const handleRemoveCapacity = (index: number) => {
    remove(index);
    setIsConfirmed(false);
  };

  return (
    <div className="p-4 flex flex-col gap-4 mt-4">
      <label className="text-lg font-semibold text-slate-800">
        <FaTruckLoading className="inline mr-3 w-6 h-6 text-slate-800" />
        Truck Capacities
      </label>
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-center gap-2">
          <span className="flex w-1/6 text-slate-600 font-semibold">
            Truck {index + 1}:
          </span>
          <div className="grow  relative  ">
            <input
              type="number"
              {...register(`truckCapacities.${index}.capacity`, {
                required: true,
                valueAsNumber: true,
                min: 1,
              })}
              className="form-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Enter truck capacity"
            />
            <span className="absolute text-[10px] right-8 top-[35%] text-slate-400">
              KG
            </span>
          </div>

          <button
            type="button"
            onClick={() => handleRemoveCapacity(index)}
            className={`flex justify-end ${
              index === 0 ? "text-white" : "text-red-500"
            } self-end mb-3`}
            disabled={index === 0}
          >
            <FaMinus />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddCapacity}
        className="w-auto flex gap-4 justify-center border-[1px] py-2 items-center "
      >
        <FaPlus /> Add another Truck
      </button>
    </div>
  );
};

export default TruckCapacity;
