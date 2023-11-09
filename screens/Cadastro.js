import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const Cadastro = () => {
    const navigation = useNavigation();

  const handleCadastroPress = () => {
    // Aqui você pode adicionar a lógica de cadastro, por enquanto, exibirei um alerta
    Alert.alert('Cadastro', 'Pressionou o botão "Cadastrar".');
        // Use o método navigate para direcionar para a tela de "Cadastro"
        navigation.navigate('PerfilUsuario');
  };

  return (
    <View style={estilos.container}>
      <Text style={estilos.topo}>Cadastro</Text>
      <Image style={estilos.logo} source={require('../assets/perfil.png')} />
      <TextInput
        style={estilos.input}
        placeholder={'Nome'}
      />
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
      <TextInput
        style={estilos.input}
        placeholder={'Telefone'}
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
