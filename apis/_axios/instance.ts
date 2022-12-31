import { API_BASE_URL } from '@env';
import axios, { AxiosError } from 'axios';

import store from '../../store';

const isDev = process.env.NODE_ENV === 'development';

const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default instance;
