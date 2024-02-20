import { clients, rooms, games } from '../../data/index';
import { RoomDataRequestPayload } from '../../types/apiTypes';
import { MESSAGE_TYPES } from '../../types/generalTypes';
import withJsonData from '../utils/withJsonData';

interface IAddUserToRoom {
  connectionId: number;
  data: RoomDataRequestPayload;
}

export const addUserToRoom = ({
  connectionId,
  data: { indexRoom },
}: IAddUserToRoom) => {
  if (connectionId !== indexRoom) {
    const matchRoomIdx = rooms.findIndex(({ roomId }) => roomId === indexRoom);

    if (matchRoomIdx !== -1) {
      const {
        roomId,
        roomUsers: [{ index: enemyId }],
      } = rooms[matchRoomIdx];

      rooms.splice(matchRoomIdx, 1);

      const selfUserRoomId = rooms.findIndex(
        ({ roomId }) => roomId === connectionId
      );

      if (selfUserRoomId !== -1) rooms.splice(selfUserRoomId, 1);

      const playersId = [enemyId, connectionId];

      games.set(roomId, {
        gameId: roomId,
        playersId,
        turn: enemyId > connectionId ? connectionId : enemyId,
        ships: {},
      });

      playersId.forEach((idPlayer) => {
        clients.get(idPlayer).send(
          withJsonData(MESSAGE_TYPES.CREATE_GAME, {
            idGame: roomId,
            idPlayer,
          })
        );
      });
    }
  }
};
