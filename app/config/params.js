const server_url = 'https://www.dogcat.co';
//const server_url = 'https://www.pre.dogcat.co';
//const server_url = 'http://192.168.0.34:8000';
const client_id = 1;
const client_secret = '3nEQyqGQmfKtPHHqCSnpiKvT2TBhQLsc6n96mchM';
const api_version = 'v1';
const prefix_api = 'dogcat-qr';
const color_primary =  '#00ad87';

export default {
  dogcat_server:server_url,
  dogcat_client_id:client_id,
  dogcat_client_secret:client_secret,
  dogcat_api_version:api_version,
  dogcat_prefix_api:prefix_api,
  dogcat_base_url:server_url+'/api/'+api_version+'/'+prefix_api,
  color_primary: color_primary
};
