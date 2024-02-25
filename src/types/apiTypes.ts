import { ATTACK_STATUS, MESSAGE_TYPES, Ship } from './generalTypes';

export interface UserLoginRequest {
  type: MESSAGE_TYPES;
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

export interface AttackDataRequestPayload {
  gameId: number;
  x: number;
  y: number;
  indexPlayer: number;
}

export interface RandomAttackRequestPayload {
  gameId: number;
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

export interface AttackDataResponsePayload {
  position: {
    x: number;
    y: number;
  };
  currentPlayer: number;
  status: ATTACK_STATUS;
}

export interface TurnDataResponsePayload {
  currentPlayer: number;
}

export interface FinishDataResponsePayload {
  winPlayer: number;
}
export interface WinnersDataResponsePayload {
  name: string;
  wins: number;
}
