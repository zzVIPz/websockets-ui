import { clients } from '../../data';
import { MESSAGE_TYPES } from '../../types/generalTypes';
import withJsonData from '../utils/withJsonData';

interface ITurn {
  playersId: number[];
  currentPlayer: number;
}

export const turn = ({ playersId, currentPlayer }: ITurn) => {
  playersId.forEach((playerId) => {
    const client = clients.get(playerId);

    client.send(
      withJsonData(MESSAGE_TYPES.TURN, {
        currentPlayer,
      })
    );
  });
};
