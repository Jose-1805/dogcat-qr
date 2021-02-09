import { AsyncStorage } from 'react-native';
import Params from '../../config/params';

const get = async (url,params) => {
  let token_type = await AsyncStorage.getItem('token_type');
  let access_token = await AsyncStorage.getItem('access_token');

  return fetch(Params.dogcat_base_url+'/'+url, {
        method: 'GET',
        headers: {
          Authorization: token_type+' '+access_token,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      })
      .then((response) => response.json())
      .catch((error) =>{
        //console.error(error);
      });
}

const post = async (url,params) => {
  let token_type = await AsyncStorage.getItem('token_type');
  let access_token = await AsyncStorage.getItem('access_token');

  return fetch(Params.dogcat_base_url+'/'+url, {
        method: 'POST',
        headers: {
          Authorization: token_type+' '+access_token,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      })
      .then((response) => response.json())
      .catch((error) =>{
        //console.error(error);
      });
}

module.exports = {
  post:post,
  get:get
};
