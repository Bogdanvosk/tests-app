import axios from 'axios';

const SCOPE_KEY = 'hbH.)5[&sk#<4zDKt>MC~L';

export const instance = axios.create({
  baseURL: 'https://interns-test-fe.snp.agency/api/v1',
  withCredentials: true,
  headers: {
    'scope-key': SCOPE_KEY,
  },
});
