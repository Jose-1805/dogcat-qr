import React from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';

import LoaderDogcat from '../LoaderDogcat';
import MascotaData from './MascotaData';
import Swiper from 'react-native-swiper';

import global_styles from '../../styles/global_styles';
import Params from '../../../config/params';
import Http from '../../../logic/Http';
import MenuApp from '../MenuApp';

import { Font } from 'expo';

export default class MascotaDetails extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      qr_code:props.navigation.getParam('qr_code'),
      mascotas:props.navigation.getParam('mascotas'),
      font_load:false
    }
  }

  async componentWillMount() {

    await Font.loadAsync({
      'Arial': require('../../assets/fonts/Arial/Arial.ttf')
    });

    this.setState({
      font_load:true
    })
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Mascotas',
      headerRight: (
        <MenuApp navigation={navigation}/>
      )
    }
  };

  render() {
    let vista = <LoaderDogcat />;

    if(this.state.mascotas){
        let vista_mascotas = <LoaderDogcat />;

        if(this.state.font_load){
          const mascotas = this.state.mascotas.map((e, i) => <MascotaData key={i} mascota={e} />);

          vista_mascotas = (
            <Swiper showsButtons={false}>
                { mascotas }
            </Swiper>
          );
        }

        vista = (<View style={{ flex:1, flexDirection:'column' }}>
            <View style={{ flex:1}}>
              { vista_mascotas }
            </View>
          </View>);

    }

    return (<View style={{ flex:1, flexDirection:'column' }}>
        { vista }
      </View>
    );
  }
}
