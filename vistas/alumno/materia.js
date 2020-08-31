import React, { Component } from 'react';
import {
  StyleSheet, TouchableHighlight, View, Text, Dimensions, SafeAreaView, ScrollView, StatusBar, ImageBackground
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

class Materia extends Component {

  constructor(props) {
    super(props)
    this.state = {
      docentes: [],
      materia: {
        docentes: [],
        nombre: '',
        tipo: '',
        id: ''
      },
      id: props.route.params,
      imagen: ''
    }
    this.datosMateria = this.datosMateria.bind(this)
  }

  datosMateria() {
    let materia = {}
    let docente = []
    let materias = firestore()
      .collection('materias')
      .doc(this.state.id)
      //.where('id', '==', this.state.id)
      .get()
    materias.then(doc => {
      let info = doc.data()
      if (doc.exists) {
        let docentes = info.docentes
        docentes.forEach((snap) => {
          firestore().collection('usuarios')
            .where('nombre', '==', snap).get()
            .then(snapshot => {
              let info = snapshot.docs
              let datos = info.pop().data()
              let data = {
                email: datos.email,
                horario: datos.horario,
                materias: datos.materias,
                matricula: datos.matricula,
                nombre: datos.nombre,
                tipo: datos.tipo,
                tutor: datos.tutor
              }
              docente.push(data)
              this.setState({ docentes: docente })
            })
        })
        materia = {
          docentes: info.docentes,
          nombre: info.nombre,
          tipo: info.tipo,
          id: doc.id
        }
      }
      this.setState({ materia })
      let imagen = ''
      switch (this.state.materia.tipo) {
        case "habilidades GyD":
          imagen = require('../../assets/g.png')
          break;
        case "lenguas y metodos":
          imagen = require('../../assets/lym.png')
          break;
        case "ciencias basicas":
          imagen = require('../../assets/cba.png')
          break;
        case "formacion cientifica":
          imagen = require('../../assets/fc.png')
          break;
        case "formacion tecnologica":
          imagen = require('../../assets/ft.png')
          break;
      }
      this.setState({ imagen })
    })
  }

  componentDidMount() {
    this.datosMateria()
  }

  render() {
    return (
      <SafeAreaView style={styles.contenedor}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps='handled'
        >
          <StatusBar backgroundColor='#005511' barStyle='light-content' />
          <View style={{ flexDirection: 'row' }}>
            <ImageBackground source={this.state.imagen} style={styles.imagen} >
              <View style={{ justifyContent: 'space-around', backgroundColor: '#0009', marginTop: HEIGHT / 48 }}>
                <Text style={styles.titulo}>
                  {this.state.materia.nombre}
                </Text>
                <Text style={styles.titulo}>
                  Docentes
              </Text>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.opciones}>
            {this.state.docentes.map((item, index) => {
              return (
                <View style={opcion.vista} key={index}>
                  <View style={opcion.maestro}>
                    <Text style={opcion.maestroTexto}>
                      {item.nombre}
                    </Text>
                  </View>
                  <View style={opcion.horario}>
                    <Text style={opcion.horarioTexto}>
                      Horario
                </Text>
                    <Text style={opcion.fechaTexto}>
                      Lunes: {item.horario.lunesEntrada}-{item.horario.lunesSalida}
                    </Text>
                    <Text style={opcion.fechaTexto}>
                      Martes: {item.horario.martesEntrada}-{item.horario.martesSalida}
                    </Text>
                    <Text style={opcion.fechaTexto}>
                      Miércoles: {item.horario.miercolesEntrada}-{item.horario.miercolesSalida}
                    </Text>
                    <Text style={opcion.fechaTexto}>
                      Jueves: {item.horario.juevesEntrada}-{item.horario.juevesSalida}
                    </Text>
                    <Text style={opcion.fechaTexto}>
                      Viernes: {item.horario.viernesEntrada}-{item.horario.viernesSalida}
                    </Text>
                  </View>
                  <TouchableHighlight style={opcion.boton}>
                    <Text style={opcion.botonTexto}>
                      Solicitar
                </Text>
                  </TouchableHighlight>
                </View>
              )
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    height: HEIGHT,
    width: WIDTH,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // paddingBottom: HEIGHT / 20,
  },
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingBottom: HEIGHT / 20,
  },
  titulo: {
    fontSize: HEIGHT / 22,
    textAlign: 'center',
    color: '#fff'
  },
  opciones: {
    marginTop: HEIGHT / 15,
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
    height: HEIGHT / 4,
    width: WIDTH / 1.2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: HEIGHT / 20,
  },
  imagen: {
    flex: 1,
    overflow: 'hidden',
    height: HEIGHT / 6,
  },
  textoboton: {
    fontSize: HEIGHT / 27,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  opcion: {
    backgroundColor: '#1119',
    height: HEIGHT / 10,
    width: WIDTH / 1.22,
    borderRadius: 7,
    justifyContent: 'space-around',
    marginTop: HEIGHT / 13.5,
  }
});

const opcion = StyleSheet.create({
  vista: {
    height: HEIGHT / 2.845,
    width: WIDTH / 2,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 15,
  },
  maestro: {
    borderBottomWidth: 1,
  },
  horario: {

  },
  boton: {
    borderRadius: 15,
    backgroundColor: '#227733',
  },
  maestroTexto: {
    textAlign: 'center',
    fontSize: HEIGHT / 37,
  },
  horarioTexto: {
    textAlign: 'center',
    fontSize: HEIGHT / 45,
    marginBottom: HEIGHT / 70,
  },
  fechaTexto: {
    textAlign: 'justify',
    fontSize: HEIGHT / 45,
    marginBottom: HEIGHT / 90,
  },
  botonTexto: {
    textAlign: 'center',
    color: '#fff',
    height: HEIGHT / 17,
    textAlignVertical: 'center',
    fontSize: HEIGHT / 45,
  }
})

export default Materia