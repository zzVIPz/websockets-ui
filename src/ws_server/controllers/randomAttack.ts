import { RandomAttackRequestPayload } from '../../types/apiTypes';
import { getRandomDigit } from '../../utils/getRandomNumber';
import { attack } from './attack';

interface IRandomAttack {
  connectionId: number;
  data: RandomAttackRequestPayload;
  callback: (payload: string) => void;
}

export const randomAttack = ({
  connectionId,
  data: { gameId },
  callback,
}: IRandomAttack) => {
  attack({
    connectionId,
    data: {
      gameId,
      x: getRandomDigit(),
      y: getRandomDigit(),
      indexPlayer: connectionId,
    },
    callback,
  });
};
