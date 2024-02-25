const getBoardShots = () => {
  const availableShots = [];

  for (let x = 0; x <= 9; x++) {
    for (let y = 0; y <= 9; y++) {
      availableShots.push(`${x}${y}`);
    }
  }

  return availableShots;
};

const getAvailableShots = (
  availableShots: string[],
  currentShots: number[][]
) => {
  const formattedCurrentShots = currentShots.map(([x, y]) => `${x}${y}`);

  return availableShots.filter((shot) => !formattedCurrentShots.includes(shot));
};

export { getBoardShots, getAvailableShots };
