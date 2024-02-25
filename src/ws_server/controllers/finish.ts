import { clients, games, users } from '../../data';
import { MESSAGE_TYPES } from '../../types/generalTypes';
import withJsonData from '../utils/withJsonData';
import { updateWinners } from './updateWinners';

interface IFinish {
  gameId: number;
  playersId: number[];
  winPlayer: number;
  broadcast?: (payload: string) => void;
}

export const finish = ({
  playersId,
  winPlayer,
  gameId,
  broadcast,
}: IFinish) => {
  games.delete(gameId);

  const winnerIdx = users.findIndex(({ index }) => index === winPlayer);

  if (winnerIdx !== -1) {
    users[winnerIdx] = {
      ...users[winnerIdx],
      wins: users[winnerIdx].wins + 1,
    };
  }

  broadcast?.(updateWinners());

  playersId.forEach((playerId) => {
    const client = clients.get(playerId);

    client?.send(
      withJsonData(MESSAGE_TYPES.FINISH, {
        winPlayer,
      })
    );
  });
};
