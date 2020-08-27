import React, {Component} from 'react';
import {
  StyleSheet, TouchableHighlight, View, Text, Dimensions, SafeAreaView, ScrollView, StatusBar, ImageBackground
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'
import { set } from 'react-native-reanimated';

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

class Materia extends Component {

  constructor(props) {
    super(props)
    this.state = {
      materia: {
        docentes: [],
        nombre: '',
        tipo: '',
        id: ''
      },
      id : props.route.params,
      imagen: ''
    }
    this.datosMateria = this.datosMateria.bind(this)
  }

  datosMateria() {
    let materia = {}
    let materias = firestore()
      .collection('materias')
      .doc(this.state.id)
      //.where('id', '==', this.state.id)
      .get()
    materias.then(doc => {
      let info = doc.data()
      if(doc.exists){
        materia = {
          docentes: info.docentes,
          nombre: info.nombre,
          tipo: info.tipo,
          id: doc.id
        }
      }
      this.setState({materia})
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
      this.setState({imagen})
    })
  }

  componentDidMount() {
    this.datosMateria()
  }

  render(){
    return(
      <SafeAreaView style={styles.contenedor}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps='handled'
        >
          <StatusBar backgroundColor='#005511' barStyle='light-content' />
          <View style={{ flexDirection: 'row' }}>
          <ImageBackground source={this.state.imagen} style={styles.imagen} >
            <View style={{ justifyContent: 'space-around', backgroundColor: '#0003', marginTop: HEIGHT/48 }}>
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
            <View>
              
            </View>
            {/* {this.state.materia.map((item, index) => {
              let imagen = ''
              switch (item.tipo) {
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
              return (
                <TouchableHighlight key={index} onPress={() => this.props.navigation.navigate('materia')} >
                  <View style={styles.boton}>
                    <ImageBackground source={imagen} style={styles.imagen}>
                      <View style={styles.opcion}>
                        <Text style={styles.textoboton}>
                          {item.nombre}
                        </Text>
                      </View>
                    </ImageBackground>
                  </View>
                </TouchableHighlight>
              )
            })} */}
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
    height: HEIGHT/6,
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

export default Materia