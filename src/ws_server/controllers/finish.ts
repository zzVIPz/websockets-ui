import { clients, games } from '../../data';
import { MESSAGE_TYPES } from '../../types/generalTypes';
import withJsonData from '../utils/withJsonData';

interface IFinish {
  gameId: number;
  playersId: number[];
  winPlayer: number;
}

export const finish = ({ playersId, winPlayer, gameId }: IFinish) => {
  games.delete(gameId);

  playersId.forEach((playerId) => {
    const client = clients.get(playerId);

    client?.send(
      withJsonData(MESSAGE_TYPES.FINISH, {
        winPlayer,
      })
    );
  });
};
