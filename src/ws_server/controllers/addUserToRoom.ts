import { clients, rooms } from '../../data/index';
import { RoomDataPayload } from '../../types/apiTypes';
import { RESPONSE_TYPES } from '../../types/generelTypes';
import withJsonData from '../utils/withJsonData';

interface IAddUserToRoom {
  connectionId: number;
  data: RoomDataPayload;
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
        roomUsers: [{ index }],
      } = rooms[matchRoomIdx];

      rooms.splice(matchRoomIdx, 1);

      const selfUserRoomId = rooms.findIndex(
        ({ roomId }) => roomId === connectionId
      );

      if (selfUserRoomId !== -1) rooms.splice(selfUserRoomId, 1);

      [index, connectionId].forEach((idPlayer) => {
        clients.get(idPlayer).send(
          withJsonData(RESPONSE_TYPES.CREATE_GAME, {
            idGame: roomId,
            idPlayer,
          })
        );
      });
    }
  }
};
