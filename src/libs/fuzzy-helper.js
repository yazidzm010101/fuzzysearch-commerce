export function linearInterpolation(x, x1, y1, x2, y2) {
  return y1 + ((y2 - y1) / (x2 - x1)) * (x - x1);
}

export function fuzzySearch(crispInput, fuzzySets) {
  let crispOutput = 0;
  let firstX = fuzzySets[0]?.x;
  let lastX = fuzzySets[fuzzySets.length - 1]?.x;

  if (fuzzySets.length == 0) {
    return crispOutput;
  }

  if (fuzzySets.length == 1) {
    crispOutput = crispInput == fuzzySets[0].x ? 1 : 0;
    return crispOutput;
  }

  let clampInput = Math.max(firstX, Math.min(lastX, crispInput));

  for (let i = 0; i < fuzzySets.length - 1; i++) {
    const { x: x1, y: y1 } = fuzzySets[i];
    const { x: x2, y: y2 } = fuzzySets[i + 1];

    if (clampInput >= x1 && clampInput <= x2) {
      crispOutput = linearInterpolation(clampInput, x1, y1, x2, y2);
      return crispOutput;
    }
  }

  return crispOutput;
}

export function generateFuzzySets(value) {
  let curVal = value.filter((v) => typeof v == "number" && v > 0);
  const getDistance = (val) =>
    Math.pow(10, Math.max(String(parseInt(val)).length - 1, 0));
  if (curVal.length > 0) {
    curVal = curVal.sort((a, b) => (a > b ? 1 : -1));
    if (curVal.length == 1) {
      const distanceVal = getDistance(curVal[0]);
      // triangular fuzzy set
      return [
        { x: Math.max(0, curVal[0] - distanceVal), y: 0 },
        { x: curVal[0], y: 1 },
        { x: curVal[0] + distanceVal, y: 0 },
      ];
    }

    const distanceVal = getDistance(curVal[1] - curVal[0]);
    return [
      { x: Math.max(0, curVal[0] - distanceVal), y: 0 },
      { x: curVal[0], y: 1 },
      { x: curVal[1], y: 1 },
      { x: curVal[1] + distanceVal, y: 0 },
    ];
  }

  return null;
}
