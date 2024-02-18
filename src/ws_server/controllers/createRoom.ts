import rooms from '../../data/rooms';

export const createRoom = (roomId: number) => {
  rooms.push({
    indexRoom: roomId,
  });
};
