import users from '../../data/users';
import { RESPONSE_TYPES, User } from '../../types/generelTypes';
import withJsonData from '../utils/withJsonData';

interface IRegistration {
  connectionId: number;
  data: User;
  callback: (payload: string) => void;
}

export const registration = ({
  connectionId,
  data: { name, password },
  callback,
}: IRegistration) => {
  const isReservedName = users.some(({ name: userName }) => userName === name);

  if (!isReservedName) {
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
