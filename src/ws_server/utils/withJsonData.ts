import { RoomDataPayload, UserDataPayload } from '../../types/apiTypes';
import { RESPONSE_TYPES, Room } from '../../types/generelTypes';

const withJsonData = (
  type: RESPONSE_TYPES,
  data: UserDataPayload | RoomDataPayload | Room[]
) =>
  JSON.stringify({
    type,
    data: JSON.stringify(data),
    id: 0,
  });

export default withJsonData;
