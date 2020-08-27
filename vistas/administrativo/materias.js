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
  ImageBackground
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import firestore from '@react-native-firebase/firestore'
import {
  FormacionTecnologica,
  Gerenciales,
  LenguasMetodos,
  CienciasBasicasAplicadas,
  FormacionCientifica
} from './categorias'

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

class Materias extends Component {

  constructor(props) {
    super(props)
    this.state = {
      todasMaterias: []
    }

    this.listaMaterias = this.listaMaterias.bind(this)
  }

  listaMaterias() {
    let todasMaterias = []
    let materias = firestore()
      .collection('materias')
      .get()
    materias.then(doc => {
      doc.docs.forEach((snapshot) => {
        let datos = snapshot.data()
        let materia = {
          id: snapshot.id,
          docentes: datos.docentes,
          nombre: datos.nombre,
          tipo: datos.tipo,
        }
        todasMaterias.push(materia)
        this.setState({ todasMaterias })
      })
    })
  }

  componentDidMount() {
    this.listaMaterias()
  }

  render() {
    return (
      <SafeAreaView style={styles.contenedor}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps='handled'
        >
          <StatusBar backgroundColor='#005511' barStyle='light-content' />
          <View style={{ flexDirection: 'row', marginTop: HEIGHT / 50 }}>
            <View>
              <Icon.Button name='arrow-back-outline' backgroundColor='#fff' color='#005511' size={HEIGHT / 20} onPress={() => this.props.navigation.goBack()} />
            </View>
            <View style={{ justifyContent: 'center', marginLeft: WIDTH / 10, marginRight: WIDTH / 4 }}>
              <Text style={styles.titulo}>
                Materias
            </Text>
            </View>
          </View>
          <View style={styles.opciones}>
            {this.state.todasMaterias.map((item, index) => {
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
                <TouchableHighlight key={index}>
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
            })}
            {/* <TouchableHighlight>
            <FormacionTecnologica />
        </TouchableHighlight>
        <TouchableHighlight>
            <Gerenciales />
        </TouchableHighlight>
        <TouchableHighlight>
            <LenguasMetodos />
        </TouchableHighlight>
        <TouchableHighlight>
            <CienciasBasicasAplicadas />
        </TouchableHighlight>
        <TouchableHighlight>
            <FormacionCientifica />
        </TouchableHighlight> */}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
};

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
  },
  opciones: {
    marginTop: HEIGHT / 10,
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
    borderRadius: 17,
    overflow: 'hidden'
  },
  textoboton: {
    fontSize: HEIGHT / 27,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  opcion: {
    backgroundColor: '#3339',
    height: HEIGHT / 10,
    width: WIDTH / 1.22,
    borderRadius: 7,
    justifyContent: 'space-around',
    marginTop: HEIGHT / 13.5,
  }
});

export default Materias;