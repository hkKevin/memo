import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://memo-a117b.firebaseio.com/'
});

export default instance;