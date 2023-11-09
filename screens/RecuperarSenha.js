import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

function RecuperarSenha() {
  const [email, setEmail] = useState('');

  const handleRecuperarSenhaPress = () => {
    if (!email) {
      Alert.alert('Erro', 'Por favor, insira seu endereço de e-mail.');
      return;
    }

    // Aqui você pode implementar a lógica real de recuperação de senha, como enviar um e-mail com um link de recuperação.

    Alert.alert('Recuperação de Senha', 'Um e-mail de recuperação foi enviado para ' + email);
  };

  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>Recuperação de Senha</Text>
      <TextInput
        style={estilos.input}
        placeholder={'E-mail'}
        keyboardType={'email-address'}
        value={email}
        onChangeText={setEmail}
      />
      <Button title="Enviar Solicitação de Recuperação" onPress={handleRecuperarSenhaPress} />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  titulo: {
    fontSize: 24,
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
});

export default RecuperarSenha;
