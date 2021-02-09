import React from 'react';
import { Text, View, Image, ScrollView } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import global_styles from '../../styles/global_styles';

export default class UserData extends React.Component{

  render() {
    return(
      <View style={{flex:1}}>
        <View style={{flex:2, alignItems:'center', backgroundColor:'#ffffff'}}>
          <Ionicons name="ios-contact-outline" size={100} color="teal"/>
        </View>
        <View style={{ flex:5, padding: 10 }}>
          <ScrollView>
            <Text style={ global_styles.label }>Nombre</Text>
            <Text>{ this.props.cliente.nombres+' '+this.props.cliente.apellidos }</Text>

            <Text style={ global_styles.label }>Identificación</Text>
            <Text>{ this.props.cliente.tipo_identificacion+' '+this.props.cliente.identificacion }</Text>

            <Text style={ global_styles.label }>Teléfono</Text>
            <Text>{ this.props.cliente.celular }</Text>

            <Text style={ global_styles.label }>Correo</Text>
            <Text>{ this.props.cliente.email}</Text>
          </ScrollView>
        </View>
      </View>
    )
  }
}
