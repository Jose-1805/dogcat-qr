import React from 'react';

import { Image, View, Text, BackHandler } from 'react-native';
import Params from '../../config/params';
import MenuApp from './MenuApp';

export default class WithoutNetwork extends React.Component {

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    //this.goBack(); // works best when the goBack is async
    return true;
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: '',
      headerRight: (
        <MenuApp navigation={navigation}/>
      ),
      headerLeft: <Text style={{color:'#009688',fontWeight:'bold',fontSize:20, marginLeft:15}}>Sin conexión</Text>
    }
  };

  render() {
     return (
       <View style={{ flex:1, alignItems:'center', justifyContent:'center' }}>
        <Image style={{width:88, height:80, marginBottom:10}} source={require('../images/logo.png')} />
        <Text style={{fontWeight: 'bold',textAlign:'center'}}>
          Lo sentimos!
          <Text style={{fontWeight: 'normal'}}>
             Dogcat QR sólo puede funcionar con internet. Por favor revise su conexión a internet e intente nuevamente.
          </Text>
        </Text>
      </View>
    );
  }
}
