import React from 'react';
import { Alert, ActivityIndicator, Text, View, TextInput, Button, Image, ScrollView, NetInfo } from 'react-native';
import global_styles from '../../styles/global_styles';
import { login } from '../../../logic/Auth';
import Params from '../../../config/params';

export default class Login extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        username:'',
        password:'',
        loader:false
      };

      this.loginSend = this.loginSend.bind(this);

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
        NetInfo.removeEventListener(
          'connectionChange',
          this.handleFirstConnectivityChange
        );

        this.props.navigation.navigate('WithoutNetwork');
    }
  }

  loginSend() {
    this.setState((prev_state, props)=>({
          loader:true
      })
    );

    //intenta iniciar sesion y redirecciona al componente de agenda
    login(this.state.username,this.state.password)
    .then((response)=>{
      if(typeof response != 'undefined'){
        if(response.login){
          this.props.navigation.navigate('Scanner');
        }else{
          this.setState((prev_state, props)=>({
                loader:false
            })
          );
          Alert.alert('Ocurrió un error',response.message);
        }
      }else{
        this.setState((prev_state, props)=>({
              loader:false
          })
        );
        Alert.alert('Error','Ocurrió un error inesperado.');
      }
    });

    /*let logeando = async () =>  {
      const loginState = login(this.state.username,this.state.password);
      console.log(loginState);

      if(!loginState){
        this.setState((prev_state, props)=>({
              loader:false
          })
        );
      }
    }

    setTimeout(() => {logeando()}, 300);*/
  }

  /*static navigationOptions = {
    header:null
  };*/

  render() {

    let logo_path = '../../images/logo.png';

    let btn_login = <Button
      //onPress={() => this.props.navigation.navigate('Agenda')}
      onPress={() => this.loginSend()}
      disabled={this.state.username && this.state.password?false:true}
      title="Ingresar"
      color="#009688"
    />;

    if(this.state.loader){
      btn_login = <ActivityIndicator color={Params.color_primary} size="large"/>;
    }

    return (
      <View style={{backgroundColor:'#fff',flex:1}}>
        <ScrollView>

          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
            <Image source={require(logo_path)} style={{width:120, height:110}}/>
          </View>

          <View style={{flex:4, padding:35, paddingTop:30}}>
            <Text>Correo</Text>
            <TextInput
              placeholder="Correo electrónico"
              editable={!this.state.loader}
              onChangeText={(username) => this.setState({username})}
              style={{marginBottom:10}}
            />

            <Text>Contraseña</Text>
            <TextInput
              placeholder="Contraseña"
              editable={!this.state.loader}
              onChangeText={(password) => this.setState({password})}
              secureTextEntry={true}
              style={{marginBottom:20}}
            />

            {btn_login}

          </View>
        </ScrollView>
      </View>
    );
  }
}
