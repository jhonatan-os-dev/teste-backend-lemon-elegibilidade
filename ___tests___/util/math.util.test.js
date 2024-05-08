const {
  calculateAverage,
  calculateTotal,
  calculateCO2Savings,
} = require("../../src/util/math.util");

test("return average of array number", () => {
  expect(calculateAverage([4, 4])).toBe(4);
});
test("return total from array number", () => {
  expect(calculateTotal([4, 4])).toBe(8);
});
test("return CO2 savings,", () => {
  expect(calculateCO2Savings([4000])).toBe(336);
});
