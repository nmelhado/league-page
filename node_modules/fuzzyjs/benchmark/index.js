const Benchmark = require("benchmark");

const {
  test,
  match,
  sort: fuzzySort,
  filter: fuzzyFilter,
} = require("../build/cjs");

process.stdout.write("Setting up benmarks...");

let cities = require("./cities.json");

cities = cities.map((city, i) => ({ id: i, ...city }));

console.log(" Done.");

const benchmarkUnoptimizedSort = new Benchmark("unoptimized sort", () => {
  cities.sort(fuzzySort("ah", { sourceAccessor: (city) => city.city }));
});

const benchmarkOptimizedSort = new Benchmark("optimized sort", () => {
  cities.sort(
    fuzzySort("ah", {
      sourceAccessor: (city) => city.city,
      idAccessor: (city) => city.id,
    })
  );
});

const benchmarkFilter = new Benchmark("filter", () => {
  cities.filter(fuzzyFilter("ah", { sourceAccessor: (city) => city.city }));
});

const benchmarkMatch = new Benchmark("match", () => {
  match("av", cities[0].city, { withRanges: true, withScore: true });
});

const benchmarkTest = new Benchmark("test", () => {
  test("av", cities[0].city);
});

process.stdout.write(`Running unoptimized sort on ${cities.length} objects...`);
benchmarkUnoptimizedSort.run();
console.log(" Done.");

process.stdout.write(`Running optimized sort on ${cities.length} objects...`);
benchmarkOptimizedSort.run();
console.log(" Done.");

process.stdout.write(`Running filter on ${cities.length} objects...`);
benchmarkFilter.run();
console.log(" Done.");

process.stdout.write(`Running match...`);
benchmarkMatch.run();
console.log(" Done.");

process.stdout.write(`Running test...`);
benchmarkTest.run();
console.log(" Done.");

console.log("");

console.log("Results:");
console.log(benchmarkUnoptimizedSort.toString());
console.log(benchmarkOptimizedSort.toString());
console.log(benchmarkFilter.toString());
console.log(benchmarkMatch.toString());
console.log(benchmarkTest.toString());
