import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Services/firebaseConfig';

function Login() {
  const navigation = useNavigation();
  const { setUser } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleCadastrarPress = () => {
    navigation.navigate('Cadastro');
  };

  const handleRecuperarSenhaPress = () => {
    navigation.navigate('RecuperarSenha');
  };

  const handleEntrarPress = async () => {
    try {
      if (validarCampos()) {
        // Autenticação real com Firebase
        const userCredential = await signInWithEmailAndPassword(auth, email, senha);
        const user = userCredential.user;

        // Defina o usuário no contexto
        setUser({
          nome: user.displayName,
          email: user.email,
          // Adicione outros dados do usuário conforme necessário
        });

        // Navegue para a tela de notas
        navigation.navigate('Notes');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error.message);
      setErro('Credenciais inválidas. Verifique seu e-mail e senha.');
    }
  };

  const validarCampos = () => {
    if (!email || !senha) {
      setErro('Por favor, preencha todos os campos.');
      return false;
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailValido) {
      setErro('Por favor, insira um e-mail válido.');
      return false;
    }

    if (senha.length < 6) {
      setErro('A senha deve ter pelo menos 6 caracteres.');
      return false;
    }

    setErro('');
    return true;
  };

  return (
    <View style={estilos.container}>
      <Text style={estilos.topo}>My Tasks</Text>
      <Image style={estilos.logo} source={require('../assets/perfil.png')} />
      <Text style={estilos.titulo}>Login</Text>
      <TextInput
        style={estilos.input}
        placeholder={'E-mail'}
        keyboardType={'email-address'}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={estilos.input}
        placeholder={'Senha'}
        secureTextEntry={true}
        value={senha}
        onChangeText={setSenha}
      />
      {erro !== '' && <Text style={estilos.erroText}>{erro}</Text>}
      <TouchableOpacity style={estilos.button} onPress={handleEntrarPress}>
        <Text style={estilos.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <View style={{ marginVertical: 10 }} />
      <TouchableOpacity onPress={handleCadastrarPress}>
        <Text style={estilos.cadastrarText}>Não tem conta? Cadastrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRecuperarSenhaPress}>
        <Text style={estilos.esqueceuSenha}>Esqueceu sua senha?</Text>
      </TouchableOpacity>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    marginTop: 20,
  },
  logo: {
    height: 72,
    width: 72,
    alignSelf: 'center',
    marginTop: 40,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginBottom: 16,
  },
  topo: {
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 24,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  cadastrarText: {
    textAlign: 'center',
    marginTop: 10,
    color: 'blue',
    fontWeight: 'bold',
  },
  esqueceuSenha: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 24,
  },
  erroText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default Login;