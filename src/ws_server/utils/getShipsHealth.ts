import { Ship } from '../../types/generalTypes';

const getShipsHealth = (ships: Ship[]) =>
  ships.reduce((acc, { position, length, direction }) => {
    const { x, y } = position;
    let healthBar = '';

    for (let i = 0; i < length; i++) {
      healthBar += direction ? `${x}${y + i}@` : `${x + i}${y}@`;
    }

    return [...acc, healthBar];
  }, []);

export default getShipsHealth;
