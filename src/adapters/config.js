import axios from 'axios';

const api = 'https://api-v1-staging-eks.fingo.africa/auth/fe_test/';

axios.defaults.headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};
axios.defaults.baseURL = api;
axios.defaults.timeout = 50000;

export default axios;
