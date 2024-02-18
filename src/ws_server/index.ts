import { WebSocketServer } from 'ws';
import { print } from '../utils/print';
import { RESPONSE_TYPES } from '../types/generelTypes';
import { UserLoginRequest } from '../types/apiTypes';
import { registration } from './controllers/registration';

const wss = new WebSocketServer(
  {
    port: 3000,
  },
  () => print(`Running a WebSocket server on port 3000`, 'blue')
);

wss.on('connection', (ws, req) => {
  ws.on('error', (error) => console.log(error));

  ws.on('message', (message) => {
    const { type, data }: UserLoginRequest = JSON.parse(message.toString());
    const onSend = (response: string) => ws.send(response);

    switch (type) {
      case RESPONSE_TYPES.REG:
        registration(JSON.parse(data), onSend);
    }
  });

  ws.on('close', () => {
    print('Client disconnected', 'blue');
  });
});
