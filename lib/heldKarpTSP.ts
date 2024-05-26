// Define a function to solve the TSP problem using the Held-Karp algorithm.

export function solveTSP(distanceMatrix: number[][]): {
  cost: number;

  paths: string[];
} {
  // Create a distance matrix with Infinity for 0 values to avoid considering zero distances.

  const dist = distanceMatrix.map((row) =>
    row.map((value) => (value === 0 ? Infinity : value))
  );

  const n: number = dist.length; // Number of nodes.

  // Initialize a memoization array to store the results of subproblems.

  const memo: { cost: number; paths: number[][] }[][] = Array.from(
    { length: n },

    () => Array(1 << n).fill(null)
  );

  // The tsp function calculates the minimum cost and paths to visit all nodes starting from node i and visiting nodes in the mask.

  function tsp(i: number, mask: number): { cost: number; paths: number[][] } {
    if (mask === (1 << n) - 1) {
      // If all nodes are visited, return the cost to return to the start node.

      return { cost: dist[i][0] === Infinity ? 0 : dist[i][0], paths: [[i]] };
    }

    if (memo[i][mask]) {
      // Return the cached result if already computed.

      return memo[i][mask];
    }

    let res: { cost: number; paths: number[][] } = {
      cost: Infinity,

      paths: [],
    };

    // Iterate over all nodes to find the minimum cost path.

    for (let j = 0; j < n; j++) {
      if (!(mask & (1 << j))) {
        const { cost, paths } = tsp(j, mask | (1 << j)); // Recursive call with updated mask.

        const currentCost: number = cost + dist[i][j];

        if (currentCost < res.cost) {
          res = { cost: currentCost, paths: paths.map((path) => [i, ...path]) };
        } else if (currentCost === res.cost) {
          res.paths.push(...paths.map((path) => [i, ...path]));
        }
      }
    }

    memo[i][mask] = res; // Cache the result.

    return res;
  }

  const { cost, paths } = tsp(0, 1); // Start from the first node with mask 1.

  const tourPaths: string[] = paths.map((path) => pathToString([...path, 0])); // Convert numeric paths to string.

  return { cost, paths: tourPaths };
}

// The pathToString function converts a numeric path to a string representation with 'A' corresponding to node 0.

function pathToString(path: number[]): string {
  return path

    .map((node) => String.fromCharCode("A".charCodeAt(0) + node))

    .join(" => ");
}
