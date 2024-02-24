import { clients } from '../../data';
import { MESSAGE_TYPES } from '../../types/generalTypes';
import withJsonData from '../utils/withJsonData';
import { randomAttack } from './randomAttack';

interface ITurn {
  playersId: number[];
  currentPlayer: number;
  broadcast?: (payload: string) => void;
}

export const turn = ({ playersId, currentPlayer, broadcast }: ITurn) => {
  playersId.forEach((playerId) => {
    const client = clients.get(playerId);

    client?.send(
      withJsonData(MESSAGE_TYPES.TURN, {
        currentPlayer,
      })
    );
  });

  if (currentPlayer < 0) {
    const realPlayer = playersId.find((id) => id !== currentPlayer);

    setTimeout(() => {
      randomAttack({
        connectionId: currentPlayer,
        data: {
          gameId: realPlayer,
          indexPlayer: currentPlayer,
        },
        broadcast,
      });
    }, 100);
  }
};
