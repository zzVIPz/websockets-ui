import { WebSocketServer } from 'ws';
import { getRandomNumber, print } from '../utils/index';
import { RESPONSE_TYPES } from '../types/generelTypes';
import { UserLoginRequest } from '../types/apiTypes';
import { registration, createRoom, addUserToRoom } from './controllers/index';

const wss = new WebSocketServer(
  {
    port: 3000,
  },
  () => print(`Running a WebSocket server on port 3000`, 'blue')
);

wss.on('connection', (ws, req) => {
  const connectionId = getRandomNumber();

  ws.on('error', (error) => console.log(error));
  ws.on('message', (message) => {
    const { type, data }: UserLoginRequest = JSON.parse(message.toString());
    const callback = (response: string) => ws.send(response);

    switch (type) {
      case RESPONSE_TYPES.REG:
        registration({
          connectionId,
          data: JSON.parse(data),
          callback,
        });
        break;
      case RESPONSE_TYPES.CREATE_ROOM: {
        const indexRoom = connectionId + Date.now();

        createRoom(indexRoom);
        addUserToRoom({
          indexRoom,
          callback,
        });
        break;
      }
    }
  });

  ws.on('close', () => {
    print(`Client ${connectionId} disconnected`, 'blue');
  });
});
