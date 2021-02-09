import React from 'react';

import { StatusBar, ActivityIndicator, Image, View } from 'react-native';
import Params from '../../config/params';

export default class LoaderDogcat extends React.Component {
  render() {
     return (
       <View style={{ flex:1, alignItems:'center', justifyContent:'center' }}>
        <Image style={{width:88, height:80}} source={require('../images/logo.png')} />
        <ActivityIndicator size="large" color={Params.color_primary} />
        <StatusBar barStyle="default"/>
      </View>
    );
  }
}
