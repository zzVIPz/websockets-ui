import { Ship, ShipType } from 'src/types/generalTypes';
import { getRandomDigit } from '../../utils/getRandomNumber';

const neighbors = [
  { dx: -1, dy: -1 },
  { dx: 0, dy: -1 },
  { dx: 1, dy: -1 },
  { dx: -1, dy: 0 },
  { dx: 1, dy: 0 },
  { dx: -1, dy: 1 },
  { dx: 0, dy: 1 },
  { dx: 1, dy: 1 },
];

const isCellFree = (board: string[][], x: number, y: number) =>
  board[y][x] === '-';

const hasMinimumDistance = (board: string | any[], x: number, y: number) => {
  for (const neighbor of neighbors) {
    const calculatedX = x + neighbor.dx;
    const calculatedY = y + neighbor.dy;

    if (
      calculatedX >= 0 &&
      calculatedX < board[0].length &&
      calculatedY >= 0 &&
      calculatedY < board.length &&
      board[calculatedY][calculatedX] !== '-'
    ) {
      return false;
    }
  }

  return true;
};

const isValidPosition = (
  board: string[][],
  x: number,
  y: number,
  length: number,
  direction: boolean
) => {
  if (direction) {
    if (x + length > board[0].length) {
      return false;
    }

    for (let i = 0; i < length; i++) {
      if (
        !isCellFree(board, x + i, y) ||
        !hasMinimumDistance(board, x + i, y)
      ) {
        return false;
      }
    }
  } else {
    if (y + length > board.length) {
      return false;
    }

    for (let i = 0; i < length; i++) {
      if (
        !isCellFree(board, x, y + i) ||
        !hasMinimumDistance(board, x, y + i)
      ) {
        return false;
      }
    }
  }

  return true;
};

export const placeShips = () => {
  const ships: Ship[] = [];
  const shipTypes: ShipType[] = [
    'huge',
    'large',
    'large',
    'medium',
    'medium',
    'medium',
    'small',
    'small',
    'small',
    'small',
  ];
  const board: string[][] = Array.from({ length: 10 }, () =>
    Array(10).fill('-')
  );

  for (const type of shipTypes) {
    let length = 1;

    switch (type) {
      case 'huge':
        length = 4;
        break;
      case 'large':
        length = 3;
        break;
      case 'medium':
        length = 2;
        break;
    }

    let x, y, direction;

    do {
      x = getRandomDigit();
      y = getRandomDigit();
      direction = x < 5;
    } while (!isValidPosition(board, x, y, length, direction));

    if (direction) {
      for (let j = 0; j < length; j++) {
        board[y][x + j] = 'S';
      }
    } else {
      for (let j = 0; j < length; j++) {
        board[y + j][x] = 'S';
      }
    }

    ships.push({ position: { x, y }, direction: !direction, type, length });
  }

  console.log('Bot Board:');
  console.log(board.map((row) => row.join(' ')).join('\n'));

  return ships;
};
