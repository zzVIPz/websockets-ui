import WebSocket, { WebSocketServer } from 'ws';
import { getRandomNumber, print } from '../utils/index';
import { MESSAGE_TYPES } from '../types/generalTypes';
import { UserLoginRequest } from '../types/apiTypes';
import {
  registration,
  createRoom,
  addUserToRoom,
  disconnect,
  updateRoom,
  addShips,
  attack,
  randomAttack,
} from './controllers/index';

const wss = new WebSocketServer(
  {
    port: 3000,
  },
  () => print(`Running a WebSocket server on port 3000`, 'blue')
);

wss.on('connection', (ws, req) => {
  const connectionId = getRandomNumber();
  const callback = (message: string) => ws.send(message);
  const broadcast = (message: string) =>
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) client.send(message);
    });

  ws.on('error', (error) => console.log(error));
  ws.on('message', (message) => {
    const { type, data }: UserLoginRequest = JSON.parse(message.toString());

    switch (type) {
      case MESSAGE_TYPES.REG:
        registration({
          client: ws,
          connectionId,
          data: JSON.parse(data),
          callback,
        });
        break;

      case MESSAGE_TYPES.CREATE_ROOM: {
        createRoom(connectionId);
        updateRoom({
          broadcast,
        });
        break;
      }

      case MESSAGE_TYPES.ADD_USER: {
        addUserToRoom({
          connectionId,
          data: JSON.parse(data),
        });
        updateRoom({
          broadcast,
        });
        break;
      }

      case MESSAGE_TYPES.ADD_SHIPS: {
        addShips({
          connectionId,
          data: JSON.parse(data),
        });
        break;
      }

      case MESSAGE_TYPES.ATTACK: {
        attack({
          connectionId,
          data: JSON.parse(data),
          callback,
        });
        break;
      }

      case MESSAGE_TYPES.RANDOM_ATTACK: {
        randomAttack({
          connectionId,
          data: JSON.parse(data),
          callback,
        });
        break;
      }
    }
  });

  ws.on('close', () => {
    disconnect(connectionId);
    updateRoom({
      broadcast,
    });
  });
});
