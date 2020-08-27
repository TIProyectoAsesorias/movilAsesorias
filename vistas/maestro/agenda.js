import React, { Component } from 'react';
import {
  StyleSheet, TouchableHighlight, View, Text, Image, Dimensions, StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'

import * as RootNavigation from '../rutas'

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

class Agenda extends Component {

  Sesiones(){
    //Si no existe una sesion muestra 'Sin sesiones pendientes', si existeminimo 1
    //se muestra la sesion pendiente
    return (
      <View>
        <Text style={{fontSize: HEIGHT/25, color: '#666'}}>
          Sin sesiones pendientes
        </Text>
      </View>
    )
  }

  render(){

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor='#005511' barStyle='light-content' />
        <Text style={styles.titulo}>
          Agenda
        </Text>
        {/* <TouchableHighlight style={styles.boton} onPress={() => this.props.navigation.navigate('Confirmadas')} >
            <Text style={styles.textoboton}>
              Confirmadas
            </Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.boton} onPress={() => this.props.navigation.navigate('Pendientes')} >
            <Text style={styles.textoboton}>
              Pendientes
            </Text>
          </TouchableHighlight> */}
        <View style={styles.opciones}>
          <this.Sesiones />
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    //backgroundColor: '#338844',
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    height: HEIGHT,
    width: WIDTH,
  },
  titulo: {
    fontSize: HEIGHT/22,
    marginTop: HEIGHT/50,
  },
  opciones: {
    marginTop: HEIGHT/10,
    flex: .5,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  boton: {
    borderWidth: 1,
    borderBottomWidth: 5,
    borderLeftWidth: 5,
    borderColor: '#666',
    borderRadius: 20,
    height: HEIGHT/7,
    width: WIDTH/1.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoboton: {
    fontSize: HEIGHT/35
  }
});

export default Agenda;