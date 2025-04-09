import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const SplashScreen = ({navigation}:any) => {
  useEffect(() => {
    const verificarSesion = async () => {
      const user = await AsyncStorage.getItem('usuarioActivo');
      setTimeout(() => {
        if (user) {
          const datos = JSON.parse(user);
          navigation.navigate('Home', { user: datos });
        }
        else {
          navigation.navigate('Login');
        }
      }, 2000);
    }
    verificarSesion();
  }
  , []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a la App</Text>
      <Text style={styles.loadingText}>Cargando...</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}/>
        <Text style={styles.button}>Ir a Login</Text>
    </View>
    
  )
}


const styles = StyleSheet.create({
  container: {        
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f8',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 20,
    color: '#555',
  },
  button: { 
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
})

export default SplashScreen
