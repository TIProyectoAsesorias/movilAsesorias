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
  KeyboardAvoidingView,
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
      nombre: '',
      matricula: '',
      user: '',
      pass: '',
      cpass: '',
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
    if(user == 'lcastillo@utch.edu.mx'){
      this.setState({tipo: 'admin'})
      emailValid = true
      this.setState({ emailValid });
    }else if(admin.test(user)){
      this.setState({tipo: 'admin'})
      emailValid = admin.test(user);
      this.setState({ emailValid });
    }else if(maestro.test(user)){
      this.setState({tipo: 'maestro'})
      emailValid = maestro.test(user);
      this.setState({ emailValid });
    }else if(alumno.test(user)){
      this.setState({tipo: 'alumno'})
      emailValid = alumno.test(user);
      this.setState({ emailValid });
    }
    return emailValid;
  }

  validatePassword() {
    const { pass, cpass } = this.state;
    var passwordValid
    if(pass == cpass){
      passwordValid = (pass.length >= 6);
      this.setState({ passwordValid });
    }else{
      passwordValid = false
    }
    return passwordValid
  }

  InicioSesion() {
    const emailValid = this.validateEmail()
    const passwordValid = this.validatePassword()
    const { nombre, matricula, user, tipo, pass } = this.state
    if (emailValid && passwordValid) {
      try{
        auth().createUserWithEmailAndPassword(user, pass)
        .then(() => {
          let registro
          if(tipo == 'maestro'){
            registro = firestore().collection('usuarios').add({
              email: user,
              matricula: matricula,
              nombre: nombre,
              tipo: tipo,
              horario: {
                lunesEntrada: "",
                lunesSalida: "",
                martesEntrada: "",
                martesSalida: "",
                miercolesEntrada: "",
                miercolesSalida: "",
                juevesEntrada: "",
                juevesSalida: "",
                viernesEntrada: "",
                viernesSalida: "",
              },
              materias: [],
              tutor: false
            })
          }else{
            registro = firestore().collection('usuarios').add({
              email: user,
              matricula: matricula,
              nombre: nombre,
              tipo: tipo,
            })
          }
          registro.then(() => {
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
        })
        .catch(error => {
          if(error.code === 'auth/email-alreadey-in-use') {
            alert('Correo ya ha sido registrado')
          }
          if(error.code === 'auth/invalid-email') {
            alert('Correo es invalido')
          }
          console.error(error)
        })
      }catch (error) {
        alert('Algo salió mal en el registro el error es ' + error)
      }
    } else {
      Alert.alert('Nulo', 'Favor de llenar todos los campos')
    }
  }

  render() {

    const {
      nombre,
      matricula,
      user,
      pass,
      cpass,
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
                  onPress={() => { this.props.navigation.goBack()}}
                />
              </View>
            </View>
            <ScrollView
              contentContainerStyle={{alignItems: 'center'}}
              style={styles.campos}
            >
              <View
                style={styles.champ}
              >
                <Icon
                  name='person'
                  size={HEIGHT/30}
                />
                <Text
                  style={styles.campo}
                >
                  Nombre Completo
                </Text>
              </View>
              <TextInput
                style={styles.input}
                value={nombre}
                onChangeText={nombre => this.setState({ nombre })}
                keyboardType='default'
                returnKeyType='next'
                autoCapitalize='words'
                onSubmitEditing={
                  () => {
                    this.matricula.focus()
                  }
                }
              />
              <View
                style={styles.champ}
              >
                <Icon
                  name='person-circle'
                  size={HEIGHT/30}
                />
                <Text
                  style={styles.campo}
                >
                  Matricula
                </Text>
              </View>
              <TextInput
                style={styles.input}
                value={matricula}
                onChangeText={matricula => this.setState({ matricula })}
                keyboardType='default'
                returnKeyType='next'
                autoCapitalize='none'
                ref={(input) => this.matricula = input}
                onSubmitEditing={
                  () => {
                    this.user.focus()
                  }
                }
              />
              <View
                style={styles.champ}
              >
                <Icon
                  name='at'
                  size={HEIGHT/30}
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
                onFocus={() => this.validateEmail()}
                onChangeText={user => this.setState({ user })}
                keyboardType='email-address'
                returnKeyType='next'
                autoCapitalize='none'
                ref={(input) => this.user = input}
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
                  size={HEIGHT/30}
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
                onChangeText={pass => this.setState({ pass })}
                returnKeyType='next'
                autoCapitalize='none'
                ref={(input) => this.password = input}
                secureTextEntry={true}
                onFocus={() => this.validateEmail()}
                onSubmitEditing={
                  () => {
                    this.validateEmail()
                    this.cpassword.focus()
                }}
              />
            <View
                style={styles.champ}
              >
                <Icon
                  name='key'
                  size={HEIGHT/30}
                />
                <Text
                  style={styles.campo}
                >
                  Confirmar Contraseña
                </Text>
              </View>
              <TextInput
                style={styles.input}
                value={cpass}
                onChangeText={cpass => this.setState({ cpass })}
                returnKeyType='go'
                autoCapitalize='none'
                ref={(input) => this.cpassword = input}
                secureTextEntry={true}
                onFocus={() => this.validateEmail()}
                onSubmitEditing={() => {
                  this.validateEmail()
                  this.InicioSesion()
                }}
              />
            </ScrollView>
            <TouchableHighlight
              style={styles.conectarse}
              onPress={() => this.InicioSesion()}
            >
              <Text
                style={styles.texto}
              >
                Registrarse
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
    height: HEIGHT / 3 * 2.5,
    width: WIDTH / 30 * 28,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    marginTop: HEIGHT / 3 * .2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
  },
  bienvenido: {
    flex: .15,
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
    marginTop: HEIGHT / 30,
    flexDirection: 'row'
  },
  campos: {
    flex: .8,
    //alignItems: 'center',
  },
  conectarse: {
    flex: .15,
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
    marginBottom: HEIGHT/30,
  },
});

export default Login;