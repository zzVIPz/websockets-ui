// import { clients, rooms } from '../../data/index';
import { ShipsDataRequestPayload } from '../../types/apiTypes';
import { RESPONSE_TYPES } from '../../types/generalTypes';
import withJsonData from '../utils/withJsonData';

interface IAddShips {
  connectionId: number;
  data: ShipsDataRequestPayload;
  callback: (payload: string) => void;
}

export const addShips = ({ connectionId, data, callback }: IAddShips) => {
  callback(
    withJsonData(RESPONSE_TYPES.START, {
      ships: data.ships,
      currentPlayerIndex: connectionId,
    })
  );
};
