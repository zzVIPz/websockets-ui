export const enum RESPONSE_TYPES {
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

export interface User {
  name: string;
  password: string;
}

export interface UserData extends User {
  index: number;
}

export interface Room {
  roomId: number;
  roomUsers: Omit<UserData, 'password'>[];
}
