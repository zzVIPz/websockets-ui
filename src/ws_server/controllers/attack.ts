import { AttackDataRequestPayload } from '../../types/apiTypes';
import { games } from '../../data';
import { ATTACK_STATUS, MESSAGE_TYPES } from '../../types/generalTypes';
import withJsonData from '../utils/withJsonData';
import { turn } from './turn';

interface IAttack {
  connectionId: number;
  data: AttackDataRequestPayload;
  callback: (payload: string) => void;
}

export const attack = ({
  connectionId,
  data: { gameId, x, y },
  callback,
}: IAttack) => {
  const currentGame = games.get(gameId);

  if (currentGame.turn === connectionId) {
    const enemyPlayerId = currentGame.playersId.find(
      (playerId) => playerId !== connectionId
    );
    const enemyShipsHealth = currentGame.ships[enemyPlayerId].shipsHealth;
    const shipIdx = enemyShipsHealth.findIndex((enemyShipHealth) =>
      enemyShipHealth.includes(`${x}${y}`)
    );
    const payload = {
      position: {
        x,
        y,
      },
      currentPlayer: connectionId,
      status: ATTACK_STATUS.miss,
    };

    if (shipIdx !== -1) {
      const updatedEnemyShipHealth = enemyShipsHealth[shipIdx].replace(
        `${x}${y}@`,
        ''
      );
      const isKilled = !!updatedEnemyShipHealth.length;

      enemyShipsHealth[shipIdx] = updatedEnemyShipHealth;

      payload.status = isKilled ? ATTACK_STATUS.killed : ATTACK_STATUS.shot;
    } else {
      currentGame.turn = enemyPlayerId;
    }

    callback(withJsonData(MESSAGE_TYPES.ATTACK, payload));
    turn({ playersId: currentGame.playersId, currentPlayer: currentGame.turn });
  }
};
