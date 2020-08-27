import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Dimensions,
  StatusBar,
  Alert,
  TextInput,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

class Login extends Component {

  constructor(props) {
    super(props)

    this.state = {
      user: '',
      pass: '',
      emailValid: true,
      passwordValid: true,
      tipo: '',
    }

    this.validateEmail = this.validateEmail.bind(this)
    this.validatePassword = this.validatePassword.bind(this)
    this.InicioSesion = this.InicioSesion.bind(this)
  }

  validateEmail() {
    const { user } = this.state;
    var emailValid
    const admin = /^([a-zA-Z]{1,5})@(utch.edu.mx)$/;
    const maestro = /^([a-zA-Z]{1,15})@(utch.edu.mx)$/;
    const alumno = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (user == 'lcastillo@utch.edu.mx') {
      this.setState({ tipo: 'admin' })
      emailValid = true
      this.setState({ emailValid });
    } else if (admin.test(user)) {
      this.setState({ tipo: 'admin' })
      emailValid = admin.test(user);
      this.setState({ emailValid });
    } else if (maestro.test(user)) {
      this.setState({ tipo: 'maestro' })
      emailValid = maestro.test(user);
      this.setState({ emailValid });
    } else if (alumno.test(user)) {
      this.setState({ tipo: 'alumno' })
      emailValid = alumno.test(user);
      this.setState({ emailValid });
    }
    return emailValid;
  }

  validatePassword() {
    const { pass } = this.state;
    const passwordValid = (pass.length >= 6);
    this.setState({ passwordValid });
    return passwordValid;
  }

  InicioSesion() {
    const emailValid = this.validateEmail()
    const passwordValid = this.validatePassword()
    const { user, pass, tipo } = this.state
    if (emailValid && passwordValid) {
      try {
        auth().signInWithEmailAndPassword(user, pass)
          .then(() => {
            if (tipo == 'admin') {
              this.props.navigation.navigate('Admin')
            } else if (tipo == 'maestro') {
              this.props.navigation.navigate('Maestro')
            } else if (tipo == 'alumno') {
              this.props.navigation.navigate('Alumno')
            } else {
              Alert.alert('Sesión no válida', 'Usuario y/o contraseña incorrecto')
            }
          })
          .catch(error => {
            if(error.code === 'auth/user-not-found'){
              alert('El usuario no ha sido registrado')
              this.props.navigation.navigate('Registro')
            } else if(error.code === 'auth/operation-not-allowed'){
              alert('Favor de ingresar correo y contraseña')
            } else if(error.code === 'auth/wrong-password'){
              alert('Contraseña no es correcta')
            }
          })
      } catch (error) {
        alert('Algo salió mal en el registro el error es ' + error)
      }
    } else {
      Alert.alert('Nulo', 'Favor de ingresar usuario y/o contraseña')
    }
  }

  render() {

    const {
      user,
      pass,
    } = this.state

    return (
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps='handled'
      >
        <KeyboardAvoidingView
          behavior='position'
        >
          <StatusBar
            backgroundColor='#005511'
            barStyle='light-content'
          />
          <View
            style={styles.sesion}
          >
            <View
              style={styles.bienvenido}
            >
              <View
                style={styles.bien}
              >
                <Text
                  style={styles.as}
                >
                  Bienvenido a AS!
                </Text>
              </View>
              <View
                style={styles.venido}
              >
                <Icon.Button
                  name='close-outline'
                  backgroundColor='#388849'
                  size={HEIGHT / 25}
                  onPress={() => { this.props.navigation.goBack() }}
                />
              </View>
            </View>
            <View
              style={styles.campos}
            >
              <View
                style={styles.champ}
              >
                <Icon
                  name='at'
                  size={HEIGHT / 30}
                />
                <Text
                  style={styles.campo}
                >
                  Correo Electrónico
                </Text>
              </View>
              <TextInput
                style={styles.input}
                value={user}
                onChangeText={user => this.setState({ user })}
                keyboardType='email-address'
                returnKeyType='next'
                autoCapitalize='none'
                onSubmitEditing={
                  () => {
                    this.validateEmail()
                    this.password.focus()
                  }
                }
              />
              <View
                style={styles.champ}
              >
                <Icon
                  name='key'
                  size={HEIGHT / 30}
                />
                <Text
                  style={styles.campo}
                >
                  Contraseña
                </Text>
              </View>
              <TextInput
                style={styles.input}
                value={pass}
                onFocus={() => this.validateEmail()}
                onChangeText={pass => this.setState({ pass })}
                returnKeyType='go'
                autoCapitalize='none'
                ref={(input) => this.password = input}
                secureTextEntry={true}
                onSubmitEditing={() => this.InicioSesion()}
              />
            </View>
            <TouchableHighlight
              style={styles.conectarse}
              onPress={() => this.InicioSesion()}
            >
              <Text
                style={styles.texto}
              >
                Conectarse
              </Text>
            </TouchableHighlight>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
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
  sesion: {
    height: HEIGHT / 3 * 2,
    width: WIDTH / 30 * 28,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    marginTop: HEIGHT / 3 * .5,
    borderRightWidth: 2,
    borderBottomWidth: 2,
  },
  bienvenido: {
    flex: .2,
    backgroundColor: '#388849',
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bien: {
    alignItems: 'center',
    marginRight: WIDTH / 18,
    marginLeft: WIDTH / 7,
  },
  venido: {
    alignItems: 'flex-end',
  },
  champ: {
    marginTop: HEIGHT / 15,
    flexDirection: 'row'
  },
  campos: {
    flex: .8,
    alignItems: 'center',
  },
  conectarse: {
    flex: .2,
    backgroundColor: '#AAAAAA',
    borderRadius: 15,
    alignItems: 'center',
  },
  as: {
    fontSize: WIDTH / 15,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  x: {
    fontSize: HEIGHT / 35,
    color: '#fff',
  },
  texto: {
    fontSize: WIDTH / 15,
    marginTop: WIDTH / 17,
  },
  campo: {
    fontSize: HEIGHT / 45,
  },
  input: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#555',
    width: WIDTH / 30 * 21,
  },
});

export default Login;