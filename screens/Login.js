import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Login() {
  const navigation = useNavigation();

  const handleCadastrarPress = () => {
    // Use o método navigate para direcionar para a tela de "Cadastro"
    navigation.navigate('Cadastro');
  };

  const handleRecuperarSenhaPress = () => {
    navigation.navigate('RecuperarSenha');
  };

  const handleEntrarPress = () => {
    // Navegue para a tela de notas quando o botão "Entrar" for pressionado
    navigation.navigate('Notes');
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
      />
      <TextInput
        style={estilos.input}
        placeholder={'Senha'}
        secureTextEntry={true}
      />
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
    height: 40, // Altura ajustada conforme necessário
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
    backgroundColor: 'blue', // Cor de fundo ajustada conforme necessário
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white', // Cor do texto ajustada conforme necessário
    textAlign: 'center',
    fontWeight: 'bold',
  },
  cadastrarText: {
    textAlign: 'center',
    marginTop: 10,
    color: 'blue', // Cor do texto ajustada conforme necessário
    fontWeight: 'bold',
  },
  esqueceuSenha: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 24,
  },
});

export default Login;
