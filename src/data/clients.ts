import { WebSocket } from 'ws';

const clients = new Map<number, WebSocket>();

export default clients;
