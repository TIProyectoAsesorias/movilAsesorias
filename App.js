import 'react-native-gesture-handler'
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import NetInfo from "@react-native-community/netinfo";

import Inicio from './vistas/caratula/inicio'
import Login from './vistas/caratula/login'
import Registro from './vistas/caratula/registro'
import principalAdmin from './vistas/administrativo/principalAdmin'
import principalMaestro from './vistas/maestro/principalMaestro'
import principalAlumno from './vistas/alumno/principalAlumno'
import { navigationRef } from './vistas/rutas'

const Stack = createStackNavigator()

class App extends Component {

  render() {
    return (
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator headerMode='none' initialRouteName='Inicio'>
          <Stack.Screen name='Inicio' component={Inicio} />
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Registro' component={Registro} />
          <Stack.Screen name='Admin' component={principalAdmin} />
          <Stack.Screen name='Maestro' component={principalMaestro} />
          <Stack.Screen name='Alumno' component={principalAlumno} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

export default App
