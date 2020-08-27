import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

class Pendientes extends Component {

  render(){

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor='#005511' barStyle='light-content' />
        <View style={{flexDirection: 'row', marginTop: HEIGHT/50}}>
            <View>
                <Icon.Button name='arrow-back-outline' backgroundColor='#fff' color='#005511' size={HEIGHT/20} onPress={() => this.props.navigation.goBack()} />
            </View>
            <View style={{justifyContent:'center', marginLeft: WIDTH/10, marginRight: WIDTH/4}}>
                <Text style={styles.titulo}>
                    Solicitudes
                </Text>
                <Text style={styles.titulo}>
                    Pendientes
                </Text>
            </View>
        </View>
        <View style={styles.opciones}>
          <TouchableOpacity style={styles.boton}>
          <View>
                <Text style={styles.textoboton}>
                    Docente:
                </Text>
                <Text style={styles.textoboton}>
                    Asignatura:
                </Text>
                <Text style={styles.textoboton}>
                    Alumno Matricula
                </Text>
                <Text style={styles.textoboton}>
                    Fecha
                </Text>
            </View>
          </TouchableOpacity>
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
    //marginTop: HEIGHT/50,
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
    height: HEIGHT/4,
    width: WIDTH/1.2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6662'
  },
  textoboton: {
    fontSize: HEIGHT/30
  }
});

export default Pendientes;