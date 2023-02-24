export const PAGE_SIZE_SELECT_OPTIONS = [
  {label: '10', value: 10},
  {label: '20', value: 20},
  {label: '50', value: 50},
  {label: '100', value: 100},
  {label: '200', value: 200},
];

export const DEFAULT_PAGE_SIZE = 20;
export const TOTAL_USERS = 400;
export const FETCH_USERS_URL = `https://randomuser.me/api/?results=${TOTAL_USERS}&nat=gb&seed=foo&inc=name,email,phone,gender`;

export const COLUMNS = {
  SN: 'SN',
  FIRST_NAME: 'First Name',
  LAST_NAME: 'Last Name',
  EMAIL: 'Email',
  PHONE: 'Phone',
  GENDER: 'Gender',
  UPDATE: 'Update',
  DELETE: 'Delete',
};

export const COLUMNS_WIDTH = {
  SN: 30,
  FIRST_NAME: 80,
  LAST_NAME: 80,
  EMAIL: 150,
  PHONE: 120,
  GENDER: 80,
  UPDATE: 80,
  DELETE: 80,
};

export const ERROR_MESSAGES = {
  NO_USERS_FOUND: 'No users found.',
  FETCH_USERS_FAILED: 'Fetch users failed.',
};
