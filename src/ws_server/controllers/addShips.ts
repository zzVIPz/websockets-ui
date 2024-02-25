import { clients, games } from '../../data/index';
import { ShipsDataRequestPayload } from '../../types/apiTypes';
import { MESSAGE_TYPES } from '../../types/generalTypes';
import getShipsHealth from '../utils/getShipsHealth';
import withJsonData from '../utils/withJsonData';
import { turn } from './turn';

interface IAddShips {
  connectionId: number;
  data: ShipsDataRequestPayload;
  broadcast?: (payload: string) => void;
}

export const addShips = ({
  connectionId,
  data: { gameId, ships },
  broadcast,
}: IAddShips) => {
  const currentGame = games.get(gameId);

  currentGame.ships = {
    ...currentGame.ships,
    [connectionId]: {
      ships,
      shipsHealth: getShipsHealth(ships),
    },
  };

  if (Object.keys(currentGame.ships).length === 2) {
    currentGame.playersId.forEach((currentPlayerIndex) => {
      const client = clients.get(currentPlayerIndex);

      client?.send(
        withJsonData(MESSAGE_TYPES.START, {
          ships: currentGame.ships[currentPlayerIndex].ships,
          currentPlayerIndex,
        })
      );
    });

    turn({
      playersId: currentGame.playersId,
      currentPlayer: currentGame.turn,
      broadcast,
    });
  }
};
