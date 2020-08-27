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

class Registros extends Component {

  render(){

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor='#005511' barStyle='light-content' />
        <Text style={styles.titulo}>
          Registros
        </Text>
        <View style={styles.opciones}>
          <TouchableHighlight style={styles.boton} onPress={() => this.props.navigation.navigate('Cuatrimestral')} >
            <Text style={styles.textoboton}>
              Cuatrimestral
            </Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.boton} onPress={() => this.props.navigation.navigate('Por materia')} >
            <Text style={styles.textoboton}>
              Por materia
            </Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.boton} onPress={() => this.props.navigation.navigate('Tutoría')} >
            <Text style={styles.textoboton}>
              Tutoría
            </Text>
          </TouchableHighlight>
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
    marginBottom: HEIGHT/20,
  },
  textoboton: {
    fontSize: HEIGHT/35
  }
});

export default Registros;