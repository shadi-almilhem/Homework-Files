// home.tsx
"use client";
import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { useForm, useFieldArray } from "react-hook-form";
import TruckCapacity from "../components/TruckCapacity";
import GoodsInput from "../components/GoodsInput";
import TspSection from "../components/TspSection";
import ResultShow from "../components/ResultShow";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TspResult from "@/components/TspResult";
import { Spinner } from "@/components/ui/Spinner";

// Define interfaces for form values and results.
interface Good {
  value: string;
  weight: string;
  name: string;
}
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
interface TspResultType {
  cost: number;
  paths: string[];
}

interface Result {
  knapsack: KnapsackResult;
  tsp: TspResultType;
}

interface FormValues {
  truckCapacities: { capacity: number }[];
  goods: Good[];
  matrix: number[][];
}

// Main component of the Home page.
export default function Home() {
  const initialMatrixSize = 3;
  //fill in the initial matrix with zero values
  const initialMatrix = Array.from({ length: initialMatrixSize }, () =>
    Array.from({ length: initialMatrixSize }, () => 0)
  );
  const [matrix, setMatrix] = useState<number[][]>(initialMatrix); // State for the distance matrix.

  const [goods, setGoods] = useState<Good[]>([]); // State for the goods input.

  //state for storing the result
  const [result, setResult] = useState<Result>({
    knapsack: {
      shipments: [],
      usageCounts: {},
      skippedItems: [],
      truckValues: {},
      totalCarriedValue: 0,
      fullTruckValues: {},
    },
    tsp: {
      cost: 0,
      paths: [],
    },
  }); // State to store the result.
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false); // State to enable/disable submit button.
  const [isConfirmed, setIsConfirmed] = useState(false); // State to confirm form inputs.
  const [loading, setLoading] = useState(false); // State for loading spinner.

  // Initialize form with react-hook-form.
  const {
    register,
    control,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      truckCapacities: [{ capacity: undefined }],
      goods: [{ name: "", value: "", weight: "" }],
      matrix: initialMatrix,
    },
  });

  // Manage goods input fields with useFieldArray.
  const {
    fields: goodsFields,
    append: appendGood,
    remove: removeGood,
  } = useFieldArray({
    control,
    name: "goods",
  });

  // Manage truck capacities input fields with useFieldArray.
  const {
    fields: truckFields,
    append: appendTruck,
    remove: removeTruck,
  } = useFieldArray({
    control,
    name: "truckCapacities",
  });

  // Watch truck capacities and goods input for validation.
  const watchedTruckCapacities = watch("truckCapacities");
  const watchedGoods = watch("goods");

  // Enable submit button if at least one valid truck and good are provided.
  useEffect(() => {
    const hasAtLeastOneTruck = watchedTruckCapacities.some(
      (truck) => typeof truck.capacity === "number" && truck.capacity > 0
    );
    const hasAtLeastOneGood = watchedGoods.every(
      (good) => good.name && good.value && good.weight
    );
    setIsSubmitEnabled(hasAtLeastOneTruck && hasAtLeastOneGood);
  }, [watchedTruckCapacities, watchedGoods]);

  // Confirm form inputs and trigger validation.
  const confirmForm = async () => {
    const valid = await trigger();
    if (valid) {
      setIsConfirmed(true);
    } else {
      alert("All inputs must be filled correctly.");
    }
  };

  // Append a new good input field.
  const handleAppendGood = () => {
    appendGood({ name: "", value: "", weight: "" });
    setIsConfirmed(false);
  };

  // Remove a good input field.
  const handleRemoveGood = (index: number) => {
    removeGood(index);
    setIsConfirmed(false);
  };

  // Handle form submission.
  const onSubmit = async (data: FormValues) => {
    if (!isConfirmed) {
      confirmForm();
      return;
    }

    setLoading(true); // Start loading spinner.

    try {
      // Prepare data for submission.
      const simpleCapacitiesArray = data.truckCapacities.map((truck, index) => {
        return { index, capacity: truck.capacity };
      });
      const submissionData = {
        ...data,
        matrix: matrix,
        truckCapacities: simpleCapacitiesArray,
      };
      console.log(submissionData);
      // Send data to the API.
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log(result);
      setResult({
        knapsack: result.knapsack,
        tsp: result.tsp,
      });
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    } finally {
      setLoading(false); // End loading spinner.
    }
  };

  return (
    <main className="flex items-center justify-center h-1/2">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border-2 rounded-md flex flex-col gap-8 mt-16 mb-32 mx-32 w-auto border-slate-200 p-8"
      >
        <div className="flex flex-col">
          <div>
            {/* Truck capacity input component */}
            <TruckCapacity
              setIsConfirmed={setIsConfirmed}
              register={register}
              control={control}
            />
            {/* Goods input fields */}
            {goodsFields.map((item, index) => (
              <GoodsInput
                key={item.id}
                good={item}
                setGoods={setGoods}
                register={register}
                index={index}
                handleRemoveGood={() => handleRemoveGood(index)}
              />
            ))}
          </div>
          {/* Button to add more goods */}
          <button
            type="button"
            className="w-auto flex gap-4 justify-center border-[1px] py-2 items-center mx-4"
            onClick={handleAppendGood}
          >
            <FaPlus /> Add more Item
          </button>
        </div>

        {/* TSP section component */}
        <TspSection
          setIsConfirmed={setIsConfirmed}
          matrix={matrix}
          setMatrix={setMatrix}
        />

        <div className=" w-full flex flex-col items-center">
          {/* Confirm button */}
          <button
            type="button"
            className={`confirm-button block hover:bg-slate-50 border-slate-200 border-2 py-4 px-2 rounded-sm w-full m-4 ${
              isConfirmed ? "hidden" : ""
            }`}
            onClick={confirmForm}
          >
            Confirm
          </button>

          {/* Dialog for displaying results */}
          <Dialog>
            <DialogTrigger asChild>
              <button
                type="submit"
                className={`submit-button justify-center flex hover:bg-slate-50 border-slate-200 border-2 py-4 px-2 rounded-sm w-full m-4 ${
                  !isConfirmed ? "hidden" : ""
                } ${loading ? "cursor-not-allowed" : ""}`}
                disabled={!isConfirmed}
              >
                Calculate Optimal Solution
                {loading && <Spinner className="mx-2" size="small" />}
              </button>
            </DialogTrigger>
            {!loading && (
              <DialogContent className="scroll-smooth overflow-y-scroll h-2/3">
                <DialogTitle className="flex text-2xl justify-center mb-4">
                  The Result
                </DialogTitle>

                <DialogHeader>
                  <DialogDescription asChild>
                    <ResultShow result={result.knapsack} />
                  </DialogDescription>
                </DialogHeader>
                <DialogHeader>
                  <DialogDescription asChild>
                    <TspResult result={result.tsp} />
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            )}
          </Dialog>
        </div>
      </form>
    </main>
  );
}
