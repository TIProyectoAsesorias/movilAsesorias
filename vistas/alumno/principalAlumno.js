import React from 'react';
import {
  StyleSheet, TouchableHighlight, View, Text, Image, Dimensions
} from 'react-native';
import {
  createDrawerNavigator,
} from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import Icon from 'react-native-vector-icons/Ionicons'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'

import * as RootNavigation from '../rutas'
import Agenda from './agenda'
import Horario from './horario'
import Informacion from './informacion'
import Inicio from './inicio'
import Materia from './materia'
import SolicitudEniviada from './solicitudEnviada' //Puede cambiarse a una pantalla modal

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const Drawer = createDrawerNavigator()
const SStack = createStackNavigator()
const GEStack = createStackNavigator()

var usuario = {
  email: '',
  matricula: '',
  nombre: '',
  tipo: ''
}

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

const Notificacion = () => {
  return(
    <Icon.Button
      name='notifications-outline'
      size={HEIGHT/20}
      backgroundColor='#005511'
    />
  )
}

const InformacionScreen = ({navigation}) => (
  <SStack.Navigator screenOptions={{
    headerStyle: { height: HEIGHT / 10, backgroundColor: '#005511' }
  }}>
    <SStack.Screen name='Informacion' component={Informacion} options={{
      headerLeft: () => (
        <Icon.Button name='menu-outline' size={HEIGHT/18} backgroundColor='#005511' onPress={() => navigation.openDrawer()} />
      ),
    headerTitleStyle: {alignSelf: 'center'},
    title: <View>
          <View style={styles.img}>
            <TouchableHighlight onPress={() => { RootNavigation.navigate('Bienvenido') }}>
              <Image
                source={require('../../assets/AS.png')}
                style={styles.imagen}
              />
            </TouchableHighlight>
          </View>
        </View>,
    headerRight: () => (
        <Notificacion />
      )
    }} />
  </SStack.Navigator>
)

const BienvenidoScreen = ({navigation}) => (
  <SStack.Navigator screenOptions={{
    headerStyle: { height: HEIGHT / 10, backgroundColor: '#005511' }
  }}>
    <SStack.Screen name='Inicio' component={Inicio} options={{
      headerLeft: () => (
        <Icon.Button name='menu-outline' size={HEIGHT/18} backgroundColor='#005511' onPress={() => navigation.openDrawer()} />
      ),
    headerTitleStyle: {alignSelf: 'center'},
    title: <View>
          <View style={styles.img}>
            <TouchableHighlight onPress={() => { RootNavigation.navigate('Bienvenido') }}>
              <Image
                source={require('../../assets/AS.png')}
                style={styles.imagen}
              />
            </TouchableHighlight>
          </View>
        </View>,
    headerRight: () => (
        <Notificacion />
      )
    }} />
    <SStack.Screen name='Materia' component={Materia} options={{
      headerLeft: () => (
        <Icon.Button name='menu-outline' size={HEIGHT/18} backgroundColor='#005511' onPress={() => navigation.openDrawer()} />
      ),
    headerTitleStyle: {alignSelf: 'center'},
    title: <View>
          <View style={styles.img}>
            <TouchableHighlight onPress={() => { RootNavigation.navigate('Bienvenido') }}>
              <Image
                source={require('../../assets/AS.png')}
                style={styles.imagen}
              />
            </TouchableHighlight>
          </View>
        </View>,
    headerRight: () => (
        <Notificacion />
      )
    }} />
  </SStack.Navigator>
)

const AgendaScreen = ({navigation}) => (
  <GEStack.Navigator screenOptions={{
    headerStyle: { height: HEIGHT / 10, backgroundColor: '#005511' },
    
  }}>
    <GEStack.Screen name='Agenda' component={Agenda} options={{
      headerLeft: () => (
        <Icon.Button name='menu-outline' size={HEIGHT/18} backgroundColor='#005511' onPress={() => navigation.openDrawer()} />
      ),
      headerTitleStyle: {alignSelf: 'center'},
      title: <View>
          <View style={styles.img}>
            <TouchableHighlight onPress={() => { RootNavigation.navigate('Bienvenido') }}>
              <Image
                source={require('../../assets/AS.png')}
                style={styles.imagen}
              />
            </TouchableHighlight>
          </View>
        </View>,
      headerRight: () => (
        <Notificacion />
      )
    }} />
    <GEStack.Screen name='Cuatrimestral' component={Cuatrimestral} options={{
      headerLeft: () => (
        <Icon.Button name='menu-outline' size={HEIGHT/18} backgroundColor='#005511' onPress={() => navigation.openDrawer()} />
      ),
      headerTitleStyle: {alignSelf: 'center'},
      title: <View>
          <View style={styles.img}>
            <TouchableHighlight onPress={() => { RootNavigation.navigate('Bienvenido') }}>
              <Image
                source={require('../../assets/AS.png')}
                style={styles.imagen}
              />
            </TouchableHighlight>
          </View>
        </View>,
      headerRight: () => (
        <Notificacion />
      )
    }} />
    <GEStack.Screen name='Por materia' component={Materia} options={{
      headerLeft: () => (
        <Icon.Button name='menu-outline' size={HEIGHT/18} backgroundColor='#005511' onPress={() => navigation.openDrawer()} />
      ),
      headerTitleStyle: {alignSelf: 'center'},
      title: <View>
          <View style={styles.img}>
            <TouchableHighlight onPress={() => { RootNavigation.navigate('Bienvenido') }}>
              <Image
                source={require('../../assets/AS.png')}
                style={styles.imagen}
              />
            </TouchableHighlight>
          </View>
        </View>,
      headerRight: () => (
        <Notificacion />
      )
    }} />
    <GEStack.Screen name='Tutoría' component={Tutoria} options={{
      headerLeft: () => (
        <Icon.Button name='menu-outline' size={HEIGHT/18} backgroundColor='#005511' onPress={() => navigation.openDrawer()} />
      ),
      headerTitleStyle: {alignSelf: 'center'},
      title: <View>
          <View style={styles.img}>
            <TouchableHighlight onPress={() => { RootNavigation.navigate('Bienvenido') }}>
              <Image
                source={require('../../assets/AS.png')}
                style={styles.imagen}
              />
            </TouchableHighlight>
          </View>
        </View>,
      headerRight: () => (
        <Notificacion />
      )
    }} />
  </GEStack.Navigator>
)

function DrawerMenu(props){
  return(
    <TouchableHighlight onPress={props.navigation}>
      <View style={styles.cuerpo}>
        <View style={styles.cuerpoIcono}>
          <Icon name={props.iconName} size={HEIGHT/30} />
        </View>
        <View>
          <Text style={{fontSize: HEIGHT/35}}>
            {props.titleName}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  )
}

function Menu(props){
  return(
    <View>
      <View style={styles.cabecera}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Icon name='person-circle' color='#fff' size={HEIGHT/15} />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={{color: '#fff', fontSize: HEIGHT/50, textAlign: 'center'}}>
            {usuario.nombre}
          </Text>
        </View>
      </View>
      <DrawerMenu iconName='information-circle' titleName='Información' navigation={() => props.navigation.navigate('Informacion')} />
      <DrawerMenu iconName='book' titleName='Agenda' navigation={() => props.navigation.navigate('Agenda')} />
      <DrawerMenu
        iconName='exit'
        titleName='Cerrar Sesión'
        navigation={() => {
          auth()
          .signOut()
          .then(() => RootNavigation.popToTop());
        }}
      />
    </View>
  )
}

function menuAlumno() {
  return (
    <Drawer.Navigator
      drawerType='front'
      initialRouteName='Bienvenido'
      drawerContent={(props) => <Menu {...props} />}
    >
      <Drawer.Screen name='Bienvenido' component={BienvenidoScreen} />
      <Drawer.Screen name='Informacion' component={InformacionScreen} />
      <Drawer.Screen name='Agenda' component={AgendaScreen} />
    </Drawer.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#338844',
    flex: 1,
    alignItems: 'center',
    height: HEIGHT,
    width: WIDTH,
  },
  img: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagen: {
    flex: 1,
    height: HEIGHT / 18,
    width: WIDTH / 7,
  },
  titulo: {
    fontSize: 50,
  },
  cabecera: {
    height: HEIGHT / 8.5,
    backgroundColor: '#005511',
  },
  cuerpo: {
    flexDirection: 'row',
    marginTop: HEIGHT/40,
  },
  cuerpoIcono: {
    marginRight: WIDTH/25,
    marginLeft: WIDTH/30,
  }
});

export default menuAlumno