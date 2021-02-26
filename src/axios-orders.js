import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-proj-cdc0a-default-rtdb.firebaseio.com/'
})

export default instance;