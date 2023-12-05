import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text';
import { useAuth } from '../contexts/AuthContext';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Services/firebaseConfig';

const Cadastro = () => {
  const navigation = useNavigation();
  const { setUser } = useAuth();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');

  const handleCadastroPress = async () => {
    try {
      if (senha.length < 6) {
        Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres.');
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      const usuarioCadastrado = {
        nome,
        email,
        telefone,
        uid: user.uid,
      };

      setUser(usuarioCadastrado);

      Alert.alert('Cadastro', 'Cadastro realizado com sucesso.');
      navigation.navigate('PerfilUsuario');
    } catch (error) {
      console.error('Erro ao criar usuário:', error.message);
      Alert.alert('Erro', 'Houve um erro ao criar o usuário. Por favor, tente novamente.');
    }
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

export default Cadastro;""