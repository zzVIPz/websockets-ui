export const enum MESSAGE_TYPES {
  REG = 'reg',
  CREATE_GAME = 'create_game',
  START = 'start_game',
  TURN = 'turn',
  ATTACK = 'attack',
  RANDOM_ATTACK = 'randomAttack',
  FINISH = 'finish',
  CREATE_ROOM = 'create_room',
  UPDATE_ROOM = 'update_room',
  UPDATE_WINNERS = 'update_winners',
  ADD_USER = 'add_user_to_room',
  ADD_SHIPS = 'add_ships',
}

export enum ATTACK_STATUS {
  miss = 'miss',
  shot = 'shot',
  killed = 'killed',
}

export interface User {
  name: string;
  password: string;
}

export interface UserData extends User {
  index: number;
}

export interface Room {
  roomId: number;
  roomUsers: [{ index: number; name: string }];
}

export interface Ship {
  position: {
    x: number;
    y: number;
  };
  direction: boolean;
  length: number;
  type: 'small' | 'medium' | 'large' | 'huge';
}

export interface GameData {
  gameId: number;
  playersId: number[];
  turn: number;
  ships: {
    [playerId: number]: {
      ships: Ship[];
      shipsHealth: string[];
    };
  };
  shots: {
    [playerId: number]: string[];
  };
}
