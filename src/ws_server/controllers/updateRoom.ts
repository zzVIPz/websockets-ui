import { rooms } from '../../data/index';
import { RESPONSE_TYPES } from '../../types/generelTypes';
import withJsonData from '../utils/withJsonData';

interface IUpdateRoom {
  broadcast: (message: string) => void;
}

export const updateRoom = ({ broadcast }: IUpdateRoom) => {
  broadcast(withJsonData(RESPONSE_TYPES.UPDATE_ROOM, rooms));
};
