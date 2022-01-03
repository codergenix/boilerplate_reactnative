import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = "http://192.168.1.4:3030/"; // [ api pc url or IP ]
const API_ENDPOINT = `${API_URL}v1/`;
const API_HEADER = { headers: { 'Authorization': `${AsyncStorage.getItem('ReactNativetoken')}`, 'Content-Type': 'application/json' } }

const CONFIG = { API_ENDPOINT, API_HEADER };

export default CONFIG;