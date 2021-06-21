import {create} from 'apisauce';
import AsyncStorage from '@react-native-community/async-storage';

const api = create({
    baseURL : 'http://192.168.1.106:3333',

});

api.addAsyncRequestTransform(request => async ()=>{
    const token = await AsyncStorage.getItem('@CodeFrila:token')
    if(token)
        request.headers['Authorization'] = `Bearer ${token}`
} );
export default api;