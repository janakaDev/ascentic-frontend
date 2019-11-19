const ERROR_MESSAGES = {
  LOGIN_USERNAME_EMPTY: 'Email is required !',
  LOGIN_PASSWORD_EMPTY: 'Password is required !',
  LOGIN_RESPONSE_INVALID_CREDENTIALS: 'Invalid username or password'
};

const BASE_URL = ' http://127.0.0.1:1234/api';
// const BASE_URL = '/api';
const CLOTH_LIST = BASE_URL + '/clothslist';
const CLOTH_BYID = BASE_URL + '/clothbyId/';
const USER_LOGIN = BASE_URL + '/login';
const USER_LOGOUT = BASE_URL + '/logout';
const CREATE_CLOTH = BASE_URL + '/clothsadd';
const DELETE_ITEM = BASE_URL + '/clothes';
const UPDATE_ITEM = BASE_URL + '/clothesupdate/';
export default ERROR_MESSAGES;

export {
  USER_LOGIN,
  USER_LOGOUT,
  CREATE_CLOTH,
  CLOTH_BYID,
  DELETE_ITEM,
  UPDATE_ITEM,
  CLOTH_LIST
};
