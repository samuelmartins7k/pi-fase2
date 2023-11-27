import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text';
import { useAuth } from '../contexts/AuthContext'; 

const Cadastro = () => {
  const navigation = useNavigation();
  const { setUser } = useAuth(); // Use o contexto de autenticação
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');

  const handleCadastroPress = () => {
    // Validações
    if (senha.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    // Lógica de cadastro (substitua isso pela sua lógica real)
    // ...

    // Simulação de cadastro bem-sucedido
    const usuarioCadastrado = {
      nome,
      email,
      telefone,
    };

    // Salve o usuário no contexto
    setUser(usuarioCadastrado);

    // Exibindo alerta temporário para simular o cadastro bem-sucedido
    Alert.alert('Cadastro', 'Cadastro realizado com sucesso.');

    // Use o método navigate para direcionar para a tela de "PerfilUsuario"
    navigation.navigate('PerfilUsuario');
  };

  return (
    <View style={estilos.container}>
      <Text style={estilos.topo}>Cadastro</Text>
      <Image style={estilos.logo} source={require('../assets/perfil.png')} />
      <TextInput
        style={estilos.input}
        placeholder={'Nome'}
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={estilos.input}
        placeholder={'E-mail'}
        keyboardType={'email-address'}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={estilos.input}
        placeholder={'Senha (mínimo 6 caracteres)'}
        secureTextEntry={true}
        value={senha}
        onChangeText={setSenha}
      />
      <TextInputMask
        style={estilos.input}
        placeholder={'Telefone (com DDD)'}
        keyboardType={'phone-pad'}
        type={'cel-phone'}
        options={{
          maskType: 'BRL',
          withDDD: true,
          dddMask: '(99) ',
        }}
        value={telefone}
        onChangeText={setTelefone}
      />
      <Button title="Cadastrar" onPress={handleCadastroPress} />
    </View>
  );
};

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
  topo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    lineHeight: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginBottom: 16,
  },
});

export default Cadastro;
