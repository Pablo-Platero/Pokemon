import React, { useState } from 'react';
import { Alert, ImageBackground, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = ({ navigation }: any) => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const manejarRegistro = async () => {
        if (!nombre || !email || !pass) {
            Alert.alert('Oops!', 'Todos los campos son obligatorios');
            return;
        }

        try {
            const data = await AsyncStorage.getItem('usuarios');
            const usuarios = data ? JSON.parse(data) : [];
            const existe = usuarios.find((u: any) => u.email === email);
            if (existe) {
                Alert.alert('Oops!', 'El correo ya está registrado');
                return;
            }

            const nuevoUsuario = { nombre, email, password: pass };
            usuarios.push(nuevoUsuario);
            await AsyncStorage.setItem('usuarios', JSON.stringify(usuarios));
            Alert.alert('Registro completado con éxito');
            navigation.navigate('Login');

        } catch (error) {
            console.error('Error en registro:', error);
            Alert.alert('Error', 'Error al guardar el usuario');
        }
    };

    return (
        <ImageBackground 
            // source={require('../assets/background.jpg')}
            // style={styles.background}
            imageStyle={{ opacity: 0.3 }}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Regístrate</Text>
                
                <TextInput
                    placeholder="Nombre"
                    placeholderTextColor="#888"
                    style={styles.input}
                    value={nombre}
                    onChangeText={setNombre}
                />
                
                <TextInput
                    placeholder="Correo"
                    placeholderTextColor="#888"
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
                
                <TextInput
                    placeholder="Contraseña"
                    placeholderTextColor="#888"
                    secureTextEntry
                    style={styles.input}
                    value={pass}
                    onChangeText={setPass}
                />

                <TouchableOpacity style={styles.button} onPress={manejarRegistro}>
                    <Text style={styles.buttonText}>Crear Cuenta</Text>
                </TouchableOpacity>

                <Text style={styles.loginText}>
                    ¿Ya tienes cuenta?{' '}
                    <Text 
                        style={styles.loginLink}
                        onPress={() => navigation.navigate('Login')}
                    >
                        Inicia Sesión
                    </Text>
                </Text>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        padding: 30,
        borderRadius: 20,
        width: '85%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 8,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#1e90ff',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#1e90ff',
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 16,
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#1e90ff',
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
    loginText: {
        marginTop: 20,
        fontSize: 14,
        textAlign: 'center',
        color: '#333',
    },
    loginLink: {
        color: '#1e90ff',
        fontWeight: 'bold',
    },
});

export default RegisterScreen;