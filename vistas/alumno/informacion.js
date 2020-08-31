import React, { Component } from 'react';
import {
  StyleSheet, TouchableHighlight, View, Text, Image, Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

var usuario = {
  email: '',
  matricula: '',
  nombre: '',
  tipo: ''
}

class Informacion extends Component{

componentDidMount(){
  if(auth().currentUser){
    firestore()
    .collection('usuarios')
    .where('email', '==', auth().currentUser.email)
    .get()
    .then(doc => {
      if(doc.size==1){
        doc.docs.map(snapshot => {
          usuario = snapshot.data()
        })
      }
    })
  }
}

render() {
  return(
    <View>
      <View style={styles.general}>
        <Text style={styles.titulo}>
          Información General
        </Text>
      </View>
      <View style={styles.info}>
        <Text style={{fontSize: HEIGHT/30}}>
          Nombre:
        </Text>
        <Text style={{fontSize: HEIGHT/30, color: '#005511', marginLeft: WIDTH/15, textAlign: 'left'}}>
          {usuario.nombre}
        </Text>
      </View>
      <View style={styles.info}>
        <Text style={{fontSize: HEIGHT/30}}>
          Matricula:
        </Text>
        <Text style={{fontSize: HEIGHT/30, color: '#005511', marginLeft: WIDTH/22}}>
          {usuario.matricula}
        </Text>
      </View>
    </View>
  )
}

}

const styles = StyleSheet.create({
  general: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginHorizontal: WIDTH/12,
    marginTop: HEIGHT/20,
    paddingBottom: HEIGHT/20,
  },
  titulo: {
    fontSize: HEIGHT/35,
    textAlign: 'center',
  },
  info: {
    marginHorizontal: WIDTH/12,
    flexDirection: 'row',
    width: WIDTH/8*5,
  }
})

export default Informacion