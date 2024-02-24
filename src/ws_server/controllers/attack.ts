import { AttackDataRequestPayload } from '../../types/apiTypes';
import { clients, games, users } from '../../data';
import { ATTACK_STATUS, MESSAGE_TYPES } from '../../types/generalTypes';
import withJsonData from '../utils/withJsonData';
import { turn } from './turn';
import getSurroundingShots from '../utils/getSurroundingShots';
import { getAvailableShots } from '../utils/shotStatistic';
import { finish } from './finish';
import { updateWinners } from './updateWinners';

interface IAttack {
  connectionId: number;
  data: AttackDataRequestPayload;
  broadcast: (payload: string) => void;
}

export const attack = ({
  connectionId,
  data: { gameId, x, y },
  broadcast,
}: IAttack) => {
  const currentGame = games.get(gameId);
  const cell = `${x}${y}`;
  let availableShots = currentGame.shots[connectionId];
  const enemyPlayerId = currentGame.playersId.find(
    (playerId) => playerId !== connectionId
  );

  if (currentGame.turn === connectionId && availableShots.includes(cell)) {
    const enemyShipsHealth = currentGame.ships[enemyPlayerId].shipsHealth;
    const shipIdx = enemyShipsHealth.findIndex((enemyShipHealth) =>
      enemyShipHealth.includes(`${cell}@`)
    );
    const payload = {
      position: {
        x,
        y,
      },
      currentPlayer: connectionId,
      status: ATTACK_STATUS.miss,
    };
    const splashAttack: number[][] = [];

    currentGame.shots[connectionId] = availableShots.filter(
      (shot) => shot !== cell
    );

    if (shipIdx !== -1) {
      const updatedEnemyShipHealth = enemyShipsHealth[shipIdx].replace(
        `${cell}@`,
        ''
      );
      const isKilled = !updatedEnemyShipHealth.length;

      enemyShipsHealth[shipIdx] = updatedEnemyShipHealth;
      payload.status = isKilled ? ATTACK_STATUS.killed : ATTACK_STATUS.shot;

      if (isKilled) {
        const { position, length, direction } =
          currentGame.ships[enemyPlayerId].ships[shipIdx];

        const surroundingShots = getSurroundingShots(
          position,
          length,
          direction
        );

        splashAttack.push(...surroundingShots);
      }
    } else {
      currentGame.turn = enemyPlayerId;
    }

    const shotsData = getAvailableShots(currentGame.shots[connectionId], [
      ...splashAttack,
      [x, y],
    ]);

    currentGame.shots[connectionId] = shotsData;

    currentGame.playersId.forEach((currentPlayerIndex) => {
      const client = clients.get(currentPlayerIndex);

      client?.send(withJsonData(MESSAGE_TYPES.ATTACK, payload));

      if (splashAttack.length) {
        splashAttack.forEach(([x, y]) => {
          client?.send(
            withJsonData(MESSAGE_TYPES.ATTACK, {
              ...payload,
              position: {
                x,
                y,
              },
              status: ATTACK_STATUS.miss,
            })
          );
        });
      }
    });

    if (enemyShipsHealth.every((ship) => !ship.length)) {
      const winnerIdx = users.findIndex(({ index }) => index === connectionId);

      if (winnerIdx !== -1) {
        users[winnerIdx] = {
          ...users[winnerIdx],
          wins: users[winnerIdx].wins + 1,
        };
      }

      finish({
        gameId,
        playersId: currentGame.playersId,
        winPlayer: currentGame.turn,
      });
      broadcast?.(updateWinners());
      return;
    }

    turn({
      playersId: currentGame.playersId,
      currentPlayer: currentGame.turn,
    });
  } else {
    turn({
      playersId: currentGame.playersId,
      currentPlayer: enemyPlayerId,
    });
  }
};
