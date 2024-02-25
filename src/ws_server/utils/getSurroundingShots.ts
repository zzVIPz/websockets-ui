const getSurroundingShots = (
  { x, y }: { x: number; y: number },
  length: number,
  direction: boolean
) => {
  const surroundingShots: number[][] = [];

  if (direction) {
    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + length; j++) {
        if (
          i >= 0 &&
          i < 10 &&
          j >= 0 &&
          j < 10 &&
          (i !== x || j < y || j >= y + length)
        ) {
          surroundingShots.push([i, j]);
        }
      }
    }
  } else {
    for (let i = x - 1; i <= x + length; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        if (
          i >= 0 &&
          i < 10 &&
          j >= 0 &&
          j < 10 &&
          (j !== y || i < x || i >= x + length)
        ) {
          surroundingShots.push([i, j]);
        }
      }
    }
  }

  return surroundingShots;
};

export default getSurroundingShots;
