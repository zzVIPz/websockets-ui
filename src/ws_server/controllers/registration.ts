import { WebSocket } from 'ws';
import { clients, users } from '../../data/index';
import { RESPONSE_TYPES, User } from '../../types/generelTypes';
import withJsonData from '../utils/withJsonData';

interface IRegistration {
  client: WebSocket;
  connectionId: number;
  data: User;
  callback: (payload: string) => void;
}

export const registration = ({
  client,
  connectionId,
  data: { name, password },
  callback,
}: IRegistration) => {
  const isReservedName = users.some(({ name: userName }) => userName === name);

  if (!isReservedName) {
    clients.set(connectionId, client);
    users.push({ name, password, index: connectionId });
  }

  callback(
    withJsonData(RESPONSE_TYPES.REG, {
      name,
      index: connectionId,
      error: isReservedName,
      errorText: isReservedName
        ? `Name "${name}" already is already in use. Please choose another name.`
        : '',
    })
  );
};
