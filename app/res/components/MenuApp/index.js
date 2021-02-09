import React from 'react';

import { TouchableOpacity, View, NetInfo } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { logout } from '../../../logic/Auth';

export default class MenuApp extends React.Component {

  constructor(props){
    super(props);
    _menu = null;
    this.salir = this.salir.bind(this);

    NetInfo.getConnectionInfo().then((connectionInfo) => {
      if(connectionInfo.type == 'none' || connectionInfo.type == 'unknown'){
        this.props.navigation.navigate('WithoutNetwork');
      }
    });
  }

  componentDidMount() {
    NetInfo.addEventListener(
      'connectionChange',
      this.handleFirstConnectivityChange
    );
  }

  handleFirstConnectivityChange = (connectionInfo) => {
    //se desconecto
    if(connectionInfo.type == 'none' || connectionInfo.type == 'unknown'){
      //no esta en network
      if(this.props.navigation.state.routeName != 'WithoutNetwork'){
        NetInfo.removeEventListener(
          'connectionChange',
          this.handleFirstConnectivityChange
        );

        this.props.navigation.navigate('WithoutNetwork');
      }
    }else{//se conecto
      //esta en network
      if(this.props.navigation.state.routeName == 'WithoutNetwork'){
        NetInfo.removeEventListener(
          'connectionChange',
          this.handleFirstConnectivityChange
        );

        this.props.navigation.goBack();
      }
    }
  }

  setMenuRef = ref => {
    this._menu = ref;
  };

  hideMenu = () => {
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };

  salir() {
    logout();
    this.props.navigation.navigate('Login');
  }

  render() {
      return (
        <View style={{ flex: 1 }}>
          <Menu
            ref={this.setMenuRef}
            button={<TouchableOpacity onPress={this.showMenu}><Ionicons name="md-more" size={32} color="gray" style={{marginRight:15}}/></TouchableOpacity>}
            style={{borderWidth:1, borderColor:'#f1f1f1',marginTop:40}}
          >
            <MenuItem onPress={this.salir}>Salir</MenuItem>
          </Menu>
        </View>
      );
  }
}
