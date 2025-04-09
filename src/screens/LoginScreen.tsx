import 'react-native-reanimated';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }: any) => {
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');

    const manejarLogin = async () => {
        if (!correo || !password) {
            Alert.alert('Oops!', 'Todos los campos son obligatorios');
            return;
        }

        try {
            const data = await AsyncStorage.getItem('usuarios');
            const usuarios = data ? JSON.parse(data) : [];

            const usuario = usuarios.find((u: any) => u.email === correo && u.password === password);

            if (usuario) {
                await AsyncStorage.setItem('usuarioActivo', JSON.stringify(usuario));
                navigation.navigate('Home', { user: usuario.nombre });
            } else {
                Alert.alert('Oops!', 'Credenciales incorrectas');
            }
        } catch (error) {
            console.error('Error en login:', error);
            Alert.alert('Error', 'No se pudo validar el usuario');
        }
    };

    return (
        
            // source={require('../assets/background.jpg')}
            // style={styles.background}
            <View style={styles.container}>
                <Text style={styles.title}>Inicia Sesión</Text>
                
                <TextInput
                    placeholder="Correo"
                    placeholderTextColor="#888"
                    style={styles.input}
                    value={correo}
                    onChangeText={setCorreo}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <TextInput
                    placeholder="Contraseña"
                    placeholderTextColor="#888"
                    secureTextEntry
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                />

                <TouchableOpacity style={styles.button} onPress={manejarLogin}>
                    <Text style={styles.buttonText}>Ingresar</Text>
                </TouchableOpacity>

                <Text style={styles.registerText}>
                    ¿No tienes cuenta?{' '}
                    <Text 
                        style={styles.registerLink}
                        onPress={() => navigation.navigate('Register')}
                    >
                        Regístrate
                    </Text>
                </Text>
            </View>
       
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    container: {
        backgroundColor: 'rgba(75, 104, 248, 0.9)',
        padding: 30,

        
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 8,

        justifyContent: 'center',
        
        flex: 1,
      
       
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 16,
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#1767e0',
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    registerText: {
        marginTop: 20,
        fontSize: 14,
        textAlign: 'center',
        color: '#fff',
    },
    registerLink: {
        color: '#ffeb3b',
        fontWeight: 'bold',
    },
});

export default LoginScreen;