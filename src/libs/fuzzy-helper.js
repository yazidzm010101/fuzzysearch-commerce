export function linearInterpolation(x, x1, y1, x2, y2) {
  return y1 + ((y2 - y1) / (x2 - x1)) * (x - x1);
}

export function fuzzySearch(crispInput, fuzzySets) {
  let crispOutput = 0;
  let firstX = fuzzySets[0]?.x;
  let lastX = fuzzySets[fuzzySets.length - 1]?.x;

  if (!firstX) {
    return crispOutput;
  }

  if (firstX && !lastX) {
    crispOutput = crispInput == firstX ? 1 : 0;
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
