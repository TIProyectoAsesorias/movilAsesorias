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

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

class gestionEducativas extends Component {

  render(){

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor='#005511' barStyle='light-content' />
        <Text style={styles.titulo}>
          Gestión Educativa
        </Text>
        <View style={styles.opciones}>
          <TouchableHighlight style={styles.boton} onPress={() => this.props.navigation.navigate('Materias')} >
            <Text style={styles.textoboton}>
              Materias
            </Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.boton} onPress={() => this.props.navigation.navigate('Docentes')} >
            <Text style={styles.textoboton}>
              Docentes
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
    fontSize: HEIGHT/25,
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

export default gestionEducativas;