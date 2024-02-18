export const enum RESPONSE_TYPES {
  REG = 'reg',
  CREATE_GAME = 'create_game',
  START = 'start_game',
  TURN = 'turn',
  ATTACK = 'attack',
  FINISH = 'finish',
  UPDATE_ROOM = 'update_room',
  UPDATE_WINNERS = 'update_winners',
}

export interface User {
  name: string;
  password: string;
}

export interface UserData extends User {
  index: number;
}
