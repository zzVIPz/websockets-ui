import { users } from '../../data/index';
import { MESSAGE_TYPES } from '../../types/generalTypes';
import withJsonData from '../utils/withJsonData';

export const updateWinners = () =>
  withJsonData(
    MESSAGE_TYPES.UPDATE_WINNERS,
    users
      .map(({ name, wins }) => ({
        name,
        wins,
      }))
      .sort(({ wins }, { wins: totalWins }) => totalWins - wins)
  );
