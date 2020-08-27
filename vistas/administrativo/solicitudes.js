import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableHighlight,
  Image,
  Dimensions,
} from 'react-native';
import * as RootNavigation from '../rutas'

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

class Solicitudes extends Component {

  render(){

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor='#005511' barStyle='light-content' />
        <Text style={styles.titulo}>
          Solicitudes
        </Text>
        <View style={styles.opciones}>
          <TouchableHighlight style={styles.boton} onPress={() => this.props.navigation.navigate('Confirmadas')} >
            <Text style={styles.textoboton}>
              Confirmadas
            </Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.boton} onPress={() => this.props.navigation.navigate('Pendientes')} >
            <Text style={styles.textoboton}>
              Pendientes
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
  },
  textoboton: {
    fontSize: HEIGHT/35
  }
});

export default Solicitudes;