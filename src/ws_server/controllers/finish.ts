import { clients } from '../../data';
import { MESSAGE_TYPES } from '../../types/generalTypes';
import withJsonData from '../utils/withJsonData';

interface IFinish {
  playersId: number[];
  winPlayer: number;
}

export const finish = ({ playersId, winPlayer }: IFinish) => {
  playersId.forEach((playerId) => {
    const client = clients.get(playerId);

    client.send(
      withJsonData(MESSAGE_TYPES.FINISH, {
        winPlayer,
      })
    );
  });
};
