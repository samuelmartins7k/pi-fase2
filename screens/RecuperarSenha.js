// screens/RecuperarSenha.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../contexts/AuthContext'; // Certifique-se de ajustar o caminho conforme necessário

function RecuperarSenha() {
  const [email, setEmail] = useState('');
  const { resetPassword } = useAuth(); // Adicione a função de recuperação de senha do contexto

  const handleRecuperarSenhaPress = async () => {
    if (!email) {
      Alert.alert('Erro', 'Por favor, insira seu endereço de e-mail.');
      return;
    }

    try {
      await resetPassword(email);
      Alert.alert('Recuperação de Senha', 'Um e-mail de recuperação foi enviado para ' + email);
    } catch (error) {
      Alert.alert('Erro', 'Houve um problema ao enviar o e-mail de recuperação.');
      console.error('Erro ao recuperar senha:', error.message);
    }
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
    marginBottom: 20,
  },
});

export default RecuperarSenha;
