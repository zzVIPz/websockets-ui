import { clients, games, rooms, users } from '../../data';
import { print } from '../../utils';
import { finish } from './finish';

export const disconnect = (connectionId: number) => {
  const userIndex = users.findIndex(({ index }) => index === connectionId);
  const username = users[userIndex]?.name;
  const roomIndex = rooms.findIndex(({ roomId }) => roomId === connectionId);
  let currentGameId;
  let currentPlayers;
  let currentWinner;

  if (userIndex !== -1) {
    users.splice(userIndex, 1);
  }

  if (roomIndex !== -1) {
    rooms.splice(roomIndex, 1);
  }

  for (let [gameId, gameData] of games) {
    if (gameData.playersId.includes(connectionId)) {
      currentGameId = gameId;
      currentPlayers = gameData.playersId;
      currentWinner = gameData.playersId.find(
        (playerId) => playerId !== connectionId
      );
      break;
    }
  }

  if (currentGameId) {
    finish({
      gameId: currentGameId,
      playersId: currentPlayers,
      winPlayer: currentWinner,
    });
  }

  clients.delete(connectionId);
  print(`User ${username ?? connectionId} disconnected`, 'blue');
};
