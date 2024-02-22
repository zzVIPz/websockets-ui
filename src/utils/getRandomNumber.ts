export const getRandomNumber = () => {
  const randomNumber = crypto.getRandomValues(new Uint32Array(1));

  return randomNumber[0];
};

export const getRandomDigit = () => parseInt(`${getRandomNumber()}`.slice(-1));

export const getRandomFromArray = (arr) => {
  const randomIndex = Math.floor(Math.random() * arr.length);

  return arr[randomIndex];
};
