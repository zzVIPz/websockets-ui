import WebSocket, { WebSocketServer } from 'ws';
import { getRandomNumber, print } from '../utils/index';
import { RESPONSE_TYPES } from '../types/generalTypes';
import { UserLoginRequest } from '../types/apiTypes';
import {
  registration,
  createRoom,
  addUserToRoom,
  disconnect,
  updateRoom,
  addShips,
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
      case RESPONSE_TYPES.REG:
        registration({
          client: ws,
          connectionId,
          data: JSON.parse(data),
          callback,
        });
        break;

      case RESPONSE_TYPES.CREATE_ROOM: {
        createRoom(connectionId);
        updateRoom({
          broadcast,
        });
        break;
      }

      case RESPONSE_TYPES.ADD_USER: {
        addUserToRoom({
          connectionId,
          data: JSON.parse(data),
        });
        updateRoom({
          broadcast,
        });
        break;
      }

      case RESPONSE_TYPES.ADD_SHIPS: {
        addShips({
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
