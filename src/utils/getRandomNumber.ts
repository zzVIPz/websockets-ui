export const getRandomNumber = () => {
  const randomNumber = crypto.getRandomValues(new Uint32Array(1));

  return (randomNumber[0] ?? 0) + Date.now();
};
