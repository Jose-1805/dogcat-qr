import React from 'react';
import { Text, View, ScrollView, StyleSheet, Button } from 'react-native';

import LoaderDogcat from '../LoaderDogcat';
import UserData from './UserData';

import global_styles from '../../styles/global_styles';
import Params from '../../../config/params';
import Http from '../../../logic/Http';
import MenuApp from '../MenuApp';

import { Font } from 'expo';

export default class UserDetails extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      qr_code:props.navigation.getParam('qr_code'),
      user_load:false,
      user_data:null,
    }
  }

  async componentWillMount() {
    Http.post('afiliado/data',{qr_code:this.state.qr_code})
    .then((response) => {
      //console.log(response);
      this.setState(
        (prev_state,props) => ({
          user_load:true,
          user_data:response
        })
      );
    });
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Detalles de usuario',
      headerRight: (
        <MenuApp navigation={navigation}/>
      )
    }
  };

  render() {
    let vista = <LoaderDogcat />;

    if(this.state.user_load){
      if(this.state.user_data && this.state.user_data.cliente){

        vista = (<View style={{ flex:1, flexDirection:'column'}}>
            <UserData style={{ flex:5 }} cliente={this.state.user_data.cliente} />
            <Button
                style={{flex:1}}
                onPress={() => {
                  this.props.navigation.navigate('MascotaDetails',{mascotas:this.state.user_data.mascotas});
                }}
                title="Mascotas"
                color="#009688"
              />
          </View>);
        }else{
          if(this.state.user_data && this.state.user_data.mensaje){
            vista = (<View>
                <Text>{ this.state.user_data.mensaje }</Text>
              </View>
            );
          }else{
            vista = (<View>
                <Text>Ocurrio un error inesperado, intente nuevamente.</Text>
              </View>
            );
          }
        }
    }

    return (<View style={{ flex:1, flexDirection:'column' }}>
        { vista }
      </View>
    );
  }
}
