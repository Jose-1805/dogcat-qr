import Params from '../../config/params';
import { AsyncStorage } from 'react-native';

const login = (username, password) => {
    //peticion http para logueo
    return fetch(Params.dogcat_server+'/oauth/token', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            grant_type : 'password',
            client_id : Params.dogcat_client_id,
            client_secret : Params.dogcat_client_secret,
            username : username,
            password : password,
            scope : '',
            rol:'entidad'
          }),
        })
        .then((response) => response.json())
        .then((responseJson) => {
            //console.log(responseJson)
            //no se logro el efectural el login
            if(responseJson.error){
              return {
                login:false,
                message:responseJson.message
              };
            }else{
              //se obtuvo un access_token con los datos enviados
              if(responseJson.access_token){
                //almacenamos los datos del login
                _storeData = async () => {
                  try {
                    await AsyncStorage.setItem('access_token', responseJson.access_token);
                    await AsyncStorage.setItem('refresh_token', responseJson.refresh_token);
                    await AsyncStorage.setItem('token_type', responseJson.token_type);
                  } catch (error) {
                    // Error saving data
                  }
                }

                _storeData();

                return {
                  login:true
                };
              }else{
                return {
                  login:false,
                  message:'Ocurrio un error inesperado.'
                };
              }
            }
        })
        .catch((error) =>{
          console.error(error);
        });
};

const logout = () => {
  let keys = ['access_token', 'refresh_token', 'token_type'];
  return AsyncStorage.multiRemove(keys, (err) => {
    return true;
  });
}

module.exports = {
    login:login,
    logout:logout
}
