import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

const RegisterScreen = ({ navigation }: any) => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const manejarRegistro = async () => {
    if (!usuario || !password || !email) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }
    try {
      const data = await AsyncStorage.getItem('usuarios');
      const usuarios = data ? JSON.parse(data) : [];
      const usuarioExistente = usuarios.find((u: any) => u.usuario === usuario);
      if (usuarioExistente) {
        Alert.alert('Error', 'El usuario ya existe');
        return;
      }
      const nuevoUsuario = { usuario, password, email };
      usuarios.push(nuevoUsuario);
      await AsyncStorage.setItem('usuarios', JSON.stringify(usuarios));
      Alert.alert('Éxito', 'Usuario registrado correctamente');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', 'Error al registrar el usuario');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>

      <TextInput
        placeholder="Usuario"
        style={styles.input}
        value={usuario}
        onChangeText={setUsuario}
        placeholderTextColor="#aaa"
      />

      <TextInput
        placeholder="Contraseña"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="#aaa"
      />

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#aaa"
      />

      <Button title="Registrar" onPress={manejarRegistro} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default RegisterScreen;
