import {
  GameDataResponsePayload,
  RoomDataRequestPayload,
  ShipsDataResponsePayload,
  UserDataResponsePayload,
} from '../../types/apiTypes';
import { RESPONSE_TYPES, Room } from '../../types/generalTypes';

const withJsonData = (
  type: RESPONSE_TYPES,
  data:
    | UserDataResponsePayload
    | RoomDataRequestPayload
    | GameDataResponsePayload
    | ShipsDataResponsePayload
    | Room[]
) =>
  JSON.stringify({
    type,
    data: JSON.stringify(data),
    id: 0,
  });

export default withJsonData;
