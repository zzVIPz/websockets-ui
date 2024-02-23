import { games } from '../../data';
import { RandomAttackRequestPayload } from '../../types/apiTypes';
import { getRandomFromArray } from '../../utils/getRandomNumber';
import { attack } from './attack';

interface IRandomAttack {
  connectionId: number;
  data: RandomAttackRequestPayload;
  callback: (payload: string) => void;
  broadcast: (payload: string) => void;
}

export const randomAttack = ({
  connectionId,
  data: { gameId },
  callback,
  broadcast,
}: IRandomAttack) => {
  const currentGame = games.get(gameId);
  const [x, y] = getRandomFromArray(currentGame.shots[connectionId]);

  attack({
    connectionId,
    data: {
      gameId,
      x: parseInt(x),
      y: parseInt(y),
      indexPlayer: connectionId,
    },
    callback,
    broadcast,
  });
};
