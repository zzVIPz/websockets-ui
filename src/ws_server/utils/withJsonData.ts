import { UserDataPayload } from '../../types/apiTypes';
import { RESPONSE_TYPES } from '../../types/generelTypes';

const withJsonData = (type: RESPONSE_TYPES, data: UserDataPayload) =>
  JSON.stringify({
    type,
    data: JSON.stringify(data),
    id: 0,
  });

export default withJsonData;
