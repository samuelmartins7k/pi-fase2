import React, { createContext, useContext, useReducer } from 'react';
import { Alert } from 'react-native'; // Importe o componente Alert do React Native

const ActionTypes = {
  SET_USER: 'SET_USER',
  LOGOUT: 'LOGOUT',
  RESET_PASSWORD: 'RESET_PASSWORD', // Adicionada nova ação para recuperação de senha
};

function authReducer(state, action) {
  switch (action.type) {
    case ActionTypes.SET_USER:
      return { ...state, user: action.payload };
    case ActionTypes.LOGOUT:
      return { ...state, user: null };
    case ActionTypes.RESET_PASSWORD:
      return state; // Nenhuma alteração no estado é necessária para a ação de recuperação de senha
    default:
      return state;
  }
}

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, { user: null });

  const setUser = (user) => {
    dispatch({ type: ActionTypes.SET_USER, payload: user });
  };

  const logout = () => {
    dispatch({ type: ActionTypes.LOGOUT });
  };

  const resetPassword = async (email) => {
    try {
      // Adicione aqui a lógica para enviar e-mail de recuperação de senha
      // Por exemplo, usando Firebase Auth
      // await auth.sendPasswordResetEmail(email);
      Alert.alert('Recuperação de Senha', 'Um e-mail de recuperação foi enviado para ' + email);
      dispatch({ type: ActionTypes.RESET_PASSWORD });
    } catch (error) {
      Alert.alert('Erro', 'Houve um problema ao enviar o e-mail de recuperação.');
      console.error('Erro ao recuperar senha:', error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user: state.user, setUser, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
