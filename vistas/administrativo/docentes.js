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
import Icon from 'react-native-vector-icons/Ionicons'
import firestore from '@react-native-firebase/firestore'

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

class Docentes extends Component {

  constructor(props) {
    super(props)
    this.state = {
      todosMaestros: []
    }

    this.listaMaestros = this.listaMaestros.bind(this)
  }

  listaMaestros() {
    let todosMaestros = []
    let maestros = firestore()
      .collection('usuarios')
      .where('tipo', '==', 'maestro')
      .get()
    maestros.then(doc => {
      doc.docs.forEach((snapshot) => {
        let datos = snapshot.data()
        let maestro = {
          id: snapshot.id,
          email: datos.email,
          horario: datos.horario,
          materias: datos.materias,
          nombre: datos.nombre,
          tipo: datos.tipo,
          tutor: datos.tutor
        }
        todosMaestros.push(maestro)
        this.setState({ todosMaestros })
      })
    })
  }

  componentDidMount() {
    this.listaMaestros()
  }

  render(){

    return (
      <SafeAreaView style={styles.contenedor}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps='handled'
        >
        <StatusBar backgroundColor='#005511' barStyle='light-content' />
        <View style={{flexDirection: 'row', marginTop: HEIGHT/50}}>
            <View>
                <Icon.Button name='arrow-back-outline' backgroundColor='#fff' color='#005511' size={HEIGHT/20} onPress={() => this.props.navigation.goBack()} />
            </View>
            <View style={{justifyContent:'center', marginLeft: WIDTH/10, marginRight: WIDTH/4}}>
                <Text style={styles.titulo}>
                    Docentes
                </Text>
            </View>
        </View>
        <View style={styles.opciones}>
          {this.state.todosMaestros.map((item, index) => {
            console.log(this.state.todosMaestros)
            return (
              <TouchableHighlight key={index}>
                <View>
                  <Text>
                    {item.nombre}
                  </Text>
                  <Text>
                    {item.materias}
                  </Text>
                  <Text>
                    {item.email}
                  </Text>
                  <Text>
                    {item.tutor}
                  </Text>
                  <Text>
                    
                  </Text>
                  <Text>
                    
                  </Text>
                </View>
              </TouchableHighlight>
            )
          })}
        <TouchableHighlight style={styles.boton} onPress={() => this.props.navigation.navigate('Materias')} >
            <Text style={styles.textoboton}>
              Docentes Registrados
            </Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.boton} onPress={() => this.props.navigation.navigate('Gestion Docentes')} >
            <Text style={styles.textoboton}>
              Agregar Docentes
            </Text>
          </TouchableHighlight>
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
    //backgroundColor: '#338844',
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingBottom: HEIGHT/20,
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
    height: HEIGHT/7,
    width: WIDTH/1.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoboton: {
    fontSize: HEIGHT/30
  }
});

export default Docentes;