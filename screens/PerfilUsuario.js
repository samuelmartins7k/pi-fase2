import React from "react";
import { StyleSheet, Image, Text, View, TouchableOpacity, Alert } from "react-native";
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function PerfilUsuario() {
  const { user, logout } = useAuth();
  const navigation = useNavigation();

  const handleEditarDados = () => {
    // Navegar para a tela Notes ao clicar em "Editar Dados"
    navigation.navigate('Notes');
  };

  const handleSairDaConta = () => {
    Alert.alert(
      'Sair da Conta',
      'Tem certeza que deseja sair da conta?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sair',
          onPress: async () => {
            try {
              await logout();
              // Navegar para a tela Login ao fazer logout
              navigation.navigate('Login');
            } catch (error) {
              console.error('Erro ao fazer logout:', error.message);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.titulo}>Perfil de Usuário</Text>
      </View>

      <View style={styles.informacoes}>
        <View style={styles.informacao}>
          <Text style={styles.label}>Seu Nome</Text>
          <Text style={styles.valor}>{user?.nome}</Text>
        </View>
        <View style={styles.informacao}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.valor}>{user?.email}</Text>
        </View>
        <View style={styles.informacao}>
          <Text style={styles.label}>Telefone</Text>
          <Text style={styles.valor}>{user?.telefone}</Text>
        </View>
        {/* Adicione mais campos conforme necessário */}
      </View>

      <View style={styles.opcoes}>
        <TouchableOpacity
          style={[styles.botao, { backgroundColor: "#27ae60" }]}
          onPress={handleEditarDados}
        >
          <Icon name="home" size={20} color="#fff" style={styles.botaoIcone} />
          <Text style={styles.botaoTexto}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botao, { backgroundColor: "#e74c3c" }]}
          onPress={handleSairDaConta}
        >
          <Icon name="sign-out" size={20} color="#fff" style={styles.botaoIcone} />
          <Text style={styles.botaoTexto}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    padding: 16,
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 4,
    alignItems: "center"
  },
  informacoes: {
    width: "100%",
    marginTop: 24,
  },
  informacao: {
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  valor: {
    fontSize: 18,
    color: "#333",
  },
  opcoes: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  botao: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  botaoTexto: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
  botaoIcone: {
    marginRight: 8,
  },
});
