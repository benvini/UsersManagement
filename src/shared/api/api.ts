import axios from 'axios';
import {FETCH_USERS_URL} from '../../screens/HomeScreen/constants';

export const fetchUsers = async () => {
  const res = await axios.get(FETCH_USERS_URL);
  return res.data.results;
};
