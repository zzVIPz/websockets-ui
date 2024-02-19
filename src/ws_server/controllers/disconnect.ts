import rooms from '../../data/rooms';
import users from '../../data/users';
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

  print(`User ${username ?? connectionId} disconnected`, 'blue');
};
