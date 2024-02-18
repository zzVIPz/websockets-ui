import rooms from '../../data/rooms';
import { RESPONSE_TYPES } from '../../types/generelTypes';
import withJsonData from '../utils/withJsonData';

interface IAdUserToRoom {
  indexRoom: number;
  callback: (payload: string) => void;
}

export const addUserToRoom = ({ indexRoom, callback }: IAdUserToRoom) => {
  callback(
    withJsonData(RESPONSE_TYPES.ADD_USER, {
      indexRoom,
    })
  );
};
