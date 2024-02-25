import { rooms, users } from '../../data/index';

export const createRoom = (connectionId: number) => {
  const hasCreatedRoom = rooms.some(({ roomId }) => roomId === connectionId);

  if (!hasCreatedRoom) {
    const { name } = users.find(({ index }) => index === connectionId);

    rooms.push({
      roomId: connectionId,
      roomUsers: [{ name, index: connectionId }],
    });
  }
};
