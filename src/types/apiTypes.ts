import { RESPONSE_TYPES, Ship } from './generalTypes';

export interface UserLoginRequest {
  type: RESPONSE_TYPES;
  data: string;
  id: number;
}

export interface RoomDataRequestPayload {
  indexRoom: number;
}

export interface ShipsDataRequestPayload {
  gameId: number;
  ships: Ship[];
  indexPlayer: number;
}

export interface UserDataResponsePayload {
  name: string;
  index: number;
  error: boolean;
  errorText: string;
}

export interface GameDataResponsePayload {
  idGame: number;
  idPlayer: number;
}

export interface ShipsDataResponsePayload {
  ships: Ship[];
  currentPlayerIndex: number;
}
