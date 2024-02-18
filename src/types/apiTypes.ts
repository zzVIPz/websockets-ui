import { RESPONSE_TYPES } from './generelTypes';

export interface UserLoginRequest {
  type: RESPONSE_TYPES;
  data: string;
  id: number;
}

export interface UserDataPayload {
  name: string;
  index: number;
  error: boolean;
  errorText: string;
}
