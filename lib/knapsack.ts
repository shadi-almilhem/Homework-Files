// Define the Item type representing an item with a name, weight, and value.
export type Item = {
  name: string;
  weight: number;
  value: number;
};

// Function to solve the 0/1 Knapsack problem for a single shipment.
function knapsackSingleShipment(
  items: Item[],
  knapsackCapacity: number
): { selectedItems: Item[]; totalValue: number } {
  const n = items.length; // Number of items.
  const dp: number[][] = new Array(n + 1) // Dynamic programming table.
    .fill(0)
    .map(() => new Array(knapsackCapacity + 1).fill(0));

  // Build the dp table in bottom-up manner.
  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= knapsackCapacity; w++) {
      if (items[i - 1].weight <= w) {
        dp[i][w] = Math.max(
          dp[i - 1][w], // Exclude the item.
          dp[i - 1][w - items[i - 1].weight] + items[i - 1].value // Include the item.
        );
      } else {
        dp[i][w] = dp[i - 1][w]; // Can't include the item, copy the value from above.
      }
    }
  }

  const selectedItems: Item[] = [];
  let i = n;
  let w = knapsackCapacity;
  let totalValue = 0;

  // Trace back to find the selected items.
  while (i > 0 && w > 0) {
    if (dp[i][w] !== dp[i - 1][w]) {
      selectedItems.push(items[i - 1]); // Item i-1 is included.
      totalValue += items[i - 1].value; // Add its value to total value.
      w -= items[i - 1].weight; // Reduce remaining capacity.
    }
    i--;
  }

  return { selectedItems: selectedItems.reverse(), totalValue };
}

// Function to distribute items across multiple shipments with varying capacities.
export function knapsackDP(
  items: Item[],
  truckCapacities: { index: number; capacity: number }[]
): {
  shipments: { index: number; items: Item[] }[];
  usageCounts: Record<number, number>;
  skippedItems: Item[];
  truckValues: Record<number, number[]>;
  totalCarriedValue: number;
  fullTruckValues: Record<number, number>;
} {
  const shipments: { index: number; items: Item[] }[] = [];
  const usageCounts: Record<number, number> = {};
  const skippedItems: Item[] = [];
  const truckValues: Record<number, number[]> = {};
  const fullTruckValues: Record<number, number> = {};
  let remainingItems = [...items];
  let totalCarriedValue = 0;

  // Initialize usage counts and values for each truck capacity.
  truckCapacities.forEach(({ index, capacity }) => {
    usageCounts[index] = 0;
    truckValues[index] = [];
    fullTruckValues[index] = 0;
  });

  // Filter out items that are too heavy for any truck and add them to skippedItems.
  remainingItems = remainingItems.filter((item) => {
    const canFitInAnyTruck = truckCapacities.some(
      ({ capacity }) => item.weight <= capacity
    );
    if (!canFitInAnyTruck) {
      skippedItems.push(item); // Add item to skippedItems if it can't fit in any truck.
    }
    return canFitInAnyTruck;
  });

  // Distribute items into shipments based on each truck's capacity.
  while (remainingItems.length > 0) {
    let allTrucksFull = true; // Track if all trucks are full in the current iteration.
    for (let { index, capacity } of truckCapacities) {
      if (remainingItems.length === 0) break;

      const { selectedItems, totalValue } = knapsackSingleShipment(
        remainingItems,
        capacity
      );

      if (selectedItems.length > 0) {
        shipments.push({ index, items: selectedItems }); // Add shipment.
        usageCounts[index]++; // Increment usage count.
        truckValues[index].push(totalValue); // Add value to truck values.
        fullTruckValues[index] += totalValue; // Add to full truck value.
        totalCarriedValue += totalValue; // Add to total carried value.

        // Remove selected items from remaining items.
        remainingItems = remainingItems.filter(
          (item) => !selectedItems.includes(item)
        );

        allTrucksFull = false; // At least one truck was used, so not all trucks are full.
      }
    }

    // If no items were added in the entire pass through all trucks, break to avoid infinite loop.
    if (allTrucksFull) break;
  }

  return {
    shipments,
    usageCounts,
    skippedItems,
    truckValues,
    totalCarriedValue,
    fullTruckValues,
  };
}

// // Example items
// const items: Item[] = [
//   { name: "Laptop", weight: 3, value: 2000 },
//   { name: "Phone", weight: 1, value: 800 },
//   { name: "Tablet", weight: 2, value: 1500 },
//   { name: "Camera", weight: 1, value: 1200 },
//   { name: "Headphones", weight: 1, value: 300 },
// ];

// // Example truck capacities
// const truckCapacities = [
//   { index: 1, capacity: 5 },
//   { index: 2, capacity: 10 },
//   { index: 3, capacity: 15 },
// ];

// const dpResult = knapsackDP(items, truckCapacities);
// console.log("Multiple Shipments Result:", dpResult);
