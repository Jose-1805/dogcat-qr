import React from 'react';

import { View, Text, Image, ScrollView } from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast';

import global_styles from '../../styles/global_styles';
import Dimensions from 'Dimensions';

export default class MascotaData extends React.Component{

  componentDidMount(){
    this.refs.toast.show('Deslice a los lados',3000);
  }

  render() {
    let width = Dimensions.get('window').width;

    return(
      <View style={{flex:1,flexDirection:'column', backgroundColor:'#FFFFFF'}}>
        <View style={{flex:1, alignItems:'center'}}>
          <Image source={{uri: this.props.mascota.url_imagen}} style={{ width:width, flex:1 }}/>
        </View>
        <ScrollView style={{ flex:8, padding:10 }}>
            <Text style={ global_styles.label }>Nombre</Text>
            <Text>{ this.props.mascota.nombre }</Text>

            <Text style={ global_styles.label }>Raza</Text>
            <Text>{ this.props.mascota.raza_mascota }</Text>

            <Text style={ global_styles.label }>Color</Text>
            <Text>{ this.props.mascota.color }</Text>

            <Text style={ global_styles.label }>Sexo</Text>
            <Text>{ this.props.mascota.sexo }</Text>

            <Text style={ global_styles.label }>Otras caracteristicas</Text>
            <Text style={{ paddingBottom:20 }}>{ this.props.mascota.otras_caracteristicas }</Text>
        </ScrollView>
        <Toast ref="toast" opacity={0.7}/>
      </View>
    )
  }
}
