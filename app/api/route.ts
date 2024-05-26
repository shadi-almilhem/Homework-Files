import { NextRequest, NextResponse } from "next/server";
import { knapsackDP, Item } from "../../lib/knapsack";
import { solveTSP } from "@/lib/heldKarpTSP";

export async function POST(req: NextRequest) {
  try {
    // Parse the form data from the request body
    const { truckCapacities, goods, matrix } = await req.json();
    // Convert goods to the format expected by the knapsack function
    const items: Item[] = goods.map(
      (good: { name: string; weight: string; value: string }) => ({
        name: good.name,
        weight: Number(good.weight),
        value: Number(good.value),
      })
    );
    // Call the knapsack function with the parsed data
    const knapsackResult = knapsackDP(items, truckCapacities);
    const heldkarpTSP_Result = solveTSP(matrix);

    const result = {
      knapsack: knapsackResult,
      tsp: heldkarpTSP_Result,
    };
    // Return the result to the client
    return new NextResponse(JSON.stringify(result), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    // Handle any errors that occur during the process
    return new NextResponse(
      JSON.stringify({
        error: "An error occurred while calculating the optimal solution.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
