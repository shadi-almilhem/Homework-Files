import { UseFormRegister } from "react-hook-form";

const LabelAndInput: React.FC<{
  label: string;
  name: string;
  register: UseFormRegister<any>;
}> = ({ label, name, register }) => (
  <label className="flex flex-col gap-3">
    {label}:
    <input
      type={
        label === "Good Value" || label === "Good Weight" ? "number" : "text"
      }
      {...register(name, {
        max: label === "Good Name" ? undefined : 10000,
        min: label === "Good Name" ? undefined : 1,
        required: true,
        valueAsNumber: label === "Good Name" ? undefined : true,
      })}
      className="form-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      placeholder={`Enter ${label.toLowerCase()}`}
      // min={label === "Good Value" || label === "Good Weight" ? 1 : undefined}
    />
  </label>
);
export default LabelAndInput;
