import {
  AttackDataResponsePayload,
  FinishDataResponsePayload,
  GameDataResponsePayload,
  RoomDataRequestPayload,
  ShipsDataResponsePayload,
  TurnDataResponsePayload,
  UserDataResponsePayload,
  WinnersDataResponsePayload,
} from '../../types/apiTypes';
import { MESSAGE_TYPES, Room } from '../../types/generalTypes';

const withJsonData = (
  type: MESSAGE_TYPES,
  data:
    | UserDataResponsePayload
    | RoomDataRequestPayload
    | GameDataResponsePayload
    | ShipsDataResponsePayload
    | AttackDataResponsePayload
    | TurnDataResponsePayload
    | FinishDataResponsePayload
    | WinnersDataResponsePayload[]
    | Room[]
) =>
  JSON.stringify({
    type,
    data: JSON.stringify(data),
    id: 0,
  });

export default withJsonData;
