import { clients, rooms, users } from '../../data';
import { print } from '../../utils';

export const disconnect = (connectionId: number) => {
  const userIndex = users.findIndex(({ index }) => index === connectionId);
  const username = users[userIndex]?.name;
  const roomIndex = rooms.findIndex(({ roomId }) => roomId === connectionId);

  if (userIndex !== -1) {
    users.splice(userIndex, 1);
  }

  if (roomIndex !== -1) {
    rooms.splice(roomIndex, 1);
  }

  clients.delete(connectionId);
  print(`User ${username} disconnected`, 'blue');
};
