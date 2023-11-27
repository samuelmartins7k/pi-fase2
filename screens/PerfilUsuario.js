import React from "react";
import { StyleSheet, Image, Text, View, Button, Alert } from "react-native";
import { useAuth } from '../contexts/AuthContext'; 

export default function PerfilUsuario() {
  const { user, logout } = useAuth();

  const handleEditarDados = () => {
    // Adicione aqui a lógica para editar dados do usuário
    Alert.alert("Editar Dados", "Pressionou o botão 'Editar Dados'");
  };

  const handleSairDaConta = () => {
    // Adicione aqui a lógica para sair da conta
    logout(); // Chamando a função de logout do contexto
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Image
          style={styles.vector}
          source={{
            uri:
              "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/srymul6nq7s-70%3A99?alt=media&token=1a8b176b-468e-4a4e-95d7-b30d28b57f06",
          }}
        />
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
        <View style={styles.divisor} />
        <Button title="Editar Dados" onPress={handleEditarDados} />
        <View style={styles.divisor} />
        <Button title="Sair da conta" onPress={handleSairDaConta} />
        <View style={styles.divisor} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,1)",
    padding: 16,
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
  },
  vector: {
    width: 10.09,
    height: 15.63,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 16,
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
    marginBottom: 8, // Adicionando margem inferior entre o rótulo e o valor
  },
  valor: {
    fontSize: 18,
  },
  opcoes: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  divisor: {
    width: 5,
    height: 15,
    backgroundColor: "rgba(0, 0, 0, 1)",
    marginHorizontal: 5,
  },
});
