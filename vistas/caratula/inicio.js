import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableHighlight,
  Image,
  Dimensions,
} from 'react-native';

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

class Inicio extends Component {

  render(){

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor='#005511' barStyle='light-content' />
        <Image source={require('./../../assets/Asesorías.png')} style={styles.logo} />
        <View style={styles.info}>
          <Text style={styles.texto}>Agenda tus sesiones de estudio,</Text>
          <Text style={styles.texto}>repasa con ejercicios</Text>
          <Text style={styles.texto}>y más...</Text>
          <TouchableHighlight style={styles.inicio} onPress={()=>this.props.navigation.navigate('Login')}>
            <Text style={styles.sesion}>Iniciar Sesión</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.registro} onPress={()=>this.props.navigation.navigate('Registro')}>
            <Text style={styles.sesion}>Registrarse</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#338844',
    flex: 1,
    alignItems: 'center',
    height: HEIGHT,
    width: WIDTH,
  },
  logo: {
    marginTop: HEIGHT/5.539,
    height: HEIGHT/7,
    width: WIDTH
  },
  info: {
    marginTop: HEIGHT/8.3085,
  },
  inicio: {
    backgroundColor: '#ccc',
    alignItems: 'center',
    borderRadius: HEIGHT/WIDTH*5,
    padding: HEIGHT/WIDTH*10,
    marginTop: HEIGHT/8.3085,
  },
  registro: {
    backgroundColor: '#ccc',
    alignItems: 'center',
    borderRadius: HEIGHT/WIDTH*5,
    padding: HEIGHT/WIDTH*10,
    marginTop: HEIGHT/20,
  },
  sesion: {
    fontSize: WIDTH/20,
  },
  texto: {
    color: '#fff',
    alignSelf: 'center',
    fontSize: WIDTH/20,
    fontWeight: 'bold',
  }
});

export default Inicio;