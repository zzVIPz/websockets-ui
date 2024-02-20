import { rooms } from '../../data/index';
import { MESSAGE_TYPES } from '../../types/generalTypes';
import withJsonData from '../utils/withJsonData';

interface IUpdateRoom {
  broadcast: (message: string) => void;
}

export const updateRoom = ({ broadcast }: IUpdateRoom) => {
  broadcast(withJsonData(MESSAGE_TYPES.UPDATE_ROOM, rooms));
};
