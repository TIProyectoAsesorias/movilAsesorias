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

class Cuatrimestral extends Component {

  render() {

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor='#005511' barStyle='light-content' />
        <View style={{ flexDirection: 'row', marginTop: HEIGHT / 50, justifyContent: 'center' }}>
          <View>
            <Icon.Button name='arrow-back-outline' backgroundColor='#fff' color='#005511' size={HEIGHT / 14} onPress={() => this.props.navigation.goBack()} />
          </View>
          <View style={{ justifyContent: 'center', marginLeft: WIDTH / 20, marginRight: WIDTH / 4 }}>
            <Text style={styles.titulo}>
              Registro
            </Text>
            <Text style={styles.titulodos}>
              Cuatrimestral
            </Text>
          </View>
        </View>
        <View style={styles.opciones}>
          <View style={styles.boton} >
            <View style={{ width: WIDTH / 1.25 }}>
              <View style={tabla.docente}>
                <View style={tabla.izquierdo}>
                  <Text style={styles.textoboton}>
                    Docente:
                  </Text>
                </View>
                <View style={tabla.derecho}>
                  <Text style={styles.textoboton}>
                    Nombre
                  </Text>
                </View>
              </View>
              <View style={tabla.asignatura}>
                <View style={tabla.izquierdo}>
                  <Text style={styles.textoboton}>
                    Asignaturas:
                  </Text>
                </View>
                <View style={tabla.derecho}>
                  <Text style={styles.textoboton}>
                    Materia
                  </Text>
                </View>
              </View>
              <View style={tabla.asesoria}>
                <View style={tabla.izquierdo}>
                  <Text style={styles.textoboton}>
                    Asesorías Impartidas:
                  </Text>
                </View>
                <View style={tabla.derecho}>
                  <Text style={styles.textoboton}>
                    Total
                  </Text>
                </View>
              </View>
              <View style={tabla.tiempo}>
                <View style={tabla.izquierdo}>
                  <Text style={styles.textoboton}>
                    Tiempo:
                  </Text>
                </View>
                <View style={tabla.derecho}>
                  <Text style={styles.textoboton}>
                    Horas
                  </Text>
                </View>
              </View>
              <View style={tabla.grupos}>
                <View style={tabla.izquierdo}>
                  <Text style={styles.textoboton}>
                    Grupos Participantes:
                  </Text>
                </View>
                <View style={tabla.derecho}>
                  <Text style={styles.textoboton}>
                    Grupos
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.minuta}>
          <Text style={styles.ver}>
            Ver minuta desglosada
          </Text>
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
    fontSize: HEIGHT / 30,
    marginTop: HEIGHT / 50,
    textAlign: 'center',
  },
  titulodos: {
    fontSize: HEIGHT / 30,
    textAlign: 'center',
  },
  opciones: {
    marginTop: HEIGHT / 6,
    flex: .5,
    alignItems: 'center',
  },
  boton: {
    height: HEIGHT / 7,
    width: WIDTH / 1.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoboton: {
    fontSize: HEIGHT / 35
  },
  minuta: {
    marginTop: HEIGHT/15,
  },
  ver: {
    fontSize: HEIGHT/30,
    color: '#005511'
  }
});
const tabla = StyleSheet.create({
  docente: {
    backgroundColor: '#449955',
    flexDirection: 'row',
  },
  asignatura: {
    flexDirection: 'row',
  },
  asesoria: {
    backgroundColor: '#449955',
    flexDirection: 'row',
  },
  tiempo: {
    flexDirection: 'row',
  },
  grupos: {
    backgroundColor: '#449955',
    flexDirection: 'row',
  },
  izquierdo: {
    textAlign: 'left',
    borderRightWidth: 2,
    borderRightColor: '#005511',
    width: WIDTH / 2.75,
    marginLeft: WIDTH / 45,
    marginVertical: HEIGHT/60,
  },
  derecho: {
    marginLeft: WIDTH / 45,
    justifyContent: 'center'
  }
})

export default Cuatrimestral;