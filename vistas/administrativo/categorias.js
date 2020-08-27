import React from 'react'
import { StyleSheet, View, ImageBackground, Text, Dimensions } from 'react-native'

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

export function FormacionTecnologica() {
    return(
        <View style={styles.boton}>
            <ImageBackground source={require('../../assets/ft.png')} style={styles.imagen}>
                <View style={{backgroundColor: '#3338', height: HEIGHT/10, width: WIDTH/1.22, alignItems: 'center', borderRadius: 7, justifyContent: 'center'}}>
                    <Text style={styles.textoboton}>
                        Formación Tecnológica
                    </Text>
                </View>
            </ImageBackground>
        </View>
    )
}

export function Gerenciales() {
    return(
        <View style={styles.boton}>
            <ImageBackground source={require('../../assets/g.png')} style={styles.imagen}>
                <View style={{backgroundColor: '#3338', height: HEIGHT/10, width: WIDTH/1.22, alignItems: 'center', borderRadius: 7}}>
                    <Text style={styles.textoboton}>
                        Habilidades Gerenciales y Directivas
                    </Text>
                </View>
            </ImageBackground>
        </View>
    )
}

export function LenguasMetodos() {
    return(
        <View style={styles.boton}>
            <ImageBackground source={require('../../assets/lym.png')} style={styles.imagen}>
                <View style={{backgroundColor: '#3338', height: HEIGHT/10, width: WIDTH/1.22, alignItems: 'center', borderRadius: 7}}>
                    <Text style={styles.textoboton}>
                        Lenguas y Métodos
                    </Text>
                </View>
            </ImageBackground>
        </View>
    )
}

export function CienciasBasicasAplicadas() {
    return(
        <View style={styles.boton}>
            <ImageBackground source={require('../../assets/cba.png')} style={styles.imagen}>
                <View style={{backgroundColor: '#3338', height: HEIGHT/10, width: WIDTH/1.22, alignItems: 'center', borderRadius: 7}}>
                    <Text style={styles.textoboton}>
                        Ciencias Básicas Aplicadas
                    </Text>
                </View>
            </ImageBackground>
        </View>
    )
}

export function FormacionCientifica() {
    return(
        <View style={styles.boton}>
            <ImageBackground source={require('../../assets/fc.png')} style={styles.imagen}>
                <View style={{backgroundColor: '#3338', height: HEIGHT/10, width: WIDTH/1.22, alignItems: 'center', borderRadius: 7, justifyContent: 'center'}}>
                    <Text style={styles.textoboton}>
                        Formación Científica
                    </Text>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    contenedor: {
      flex: 1,
      height: HEIGHT,
      width: WIDTH,
    },
    container: {
      backgroundColor: '#fff',
      alignItems: 'center',
      paddingBottom: HEIGHT/20,
    },
    titulo: {
      fontSize: HEIGHT/22,
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
      height: HEIGHT/4,
      width: WIDTH/1.2,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: HEIGHT/20,
    },
    imagen : {
        flex: 1,
        borderRadius: 17,
        overflow: 'hidden'
    },
    textoboton: {
      fontSize: HEIGHT/27,
      color: '#FFF',
      fontWeight: 'bold',
      textAlign: 'center',
    }
  });