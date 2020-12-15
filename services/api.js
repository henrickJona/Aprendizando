import {create} from 'apisauce';
import {AsyncStorage} from 'react-native'

const api = create({
    baseURL : '',

});

api.addAsyncRequestTransform(request => async ()=>{
    const token = await AsyncStorage.getItem('@CodeFrila:token')
    if(token)
        request.headers['Authorization'] = `Bearer ${token}`
} );
export default api;