export function calculateAverage(array: Array<number>) {
  var total = 0;

  array.forEach(function (item, index) {
    total += item;
  });

  return total / array.length;
}

export function calculateTotal(array: Array<number>) {
  var total = 0;

  array.forEach(function (item, index) {
    total += item;
  });

  return total;
}

export function calculateCO2Savings(totalConsumption: number) {
  return (totalConsumption / 1000) * 84;
}
