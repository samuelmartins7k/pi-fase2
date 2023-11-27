// Navigation.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Cadastro from './screens/Cadastro';
import PerfilUsuario from './screens/PerfilUsuario';
import RecuperarSenha from './screens/RecuperarSenha';
import Notes from './screens/Notes';
import { AuthProvider } from './contexts/AuthContext';
import { NotesProvider } from './contexts/NotesContexts'; // Importe o NotesProvider

const Stack = createNativeStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="PerfilUsuario" component={PerfilUsuario} />
        <Stack.Screen name="RecuperarSenha" component={RecuperarSenha} />

        {/* Inclua o NotesProvider ao redor da tela Notes */}
        <Stack.Screen name="Notes">
          {() => (
            <NotesProvider>
              <Notes />
            </NotesProvider>
          )}
        </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
