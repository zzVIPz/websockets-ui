import { rooms } from '../../data/index';
import { MESSAGE_TYPES } from '../../types/generalTypes';
import withJsonData from '../utils/withJsonData';

export const updateRoom = () => withJsonData(MESSAGE_TYPES.UPDATE_ROOM, rooms);
