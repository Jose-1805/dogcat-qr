import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Camera, BarCodeScanner, Permissions } from 'expo';
import Dimensions from 'Dimensions';
import MenuApp from '../MenuApp';

import global_styles from '../../styles/global_styles';

export default class Scanner extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      hasCameraPermission: null,
    };
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Dogcat QR',
      headerRight: (
        <MenuApp navigation={navigation}/>
      )
    }
  };

  render() {
    const { hasCameraPermission } = this.state;
    let heigh = Dimensions.get('window').height;
    let width = Dimensions.get('window').width;
    let tamanio_scanner = heigh * .8;

    //si la pantalla es mas alta que ancha
    if(heigh > width)
      tamanio_scanner = width * .8;


    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            onBarCodeScanned={this._handleBarCodeRead}
            barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
            zoom={.3}
          >
              <View style={{width: tamanio_scanner, height: tamanio_scanner, backgroundColor:'#00ad873d', borderColor:'#00ad87', borderWidth:2}}>
              </View>
          </Camera>
        </View>
      );
    }
  }

  _handleBarCodeRead = ({ type, data }) => {
    this.props.navigation.navigate('UserDetails',{qr_code:data});
  }
}
