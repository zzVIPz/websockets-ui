import users from '../../data/users';
import { RESPONSE_TYPES, User } from '../../types/generelTypes';
import withJsonData from '../utils/withJsonData';

export const registration = (
  { name, password }: User,
  callback: (payload: string) => void
) => {
  const isReservedName = users.some(({ name: userName }) => userName === name);
  const index = users.length;

  if (!isReservedName) {
    users.push({ name, password, index });
  }

  const payload = withJsonData(RESPONSE_TYPES.REG, {
    name,
    index,
    error: isReservedName,
    errorText: isReservedName
      ? `Name "${name}" already is already in use. Please choose another name.`
      : '',
  });

  callback(payload);
};
