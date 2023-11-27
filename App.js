// App.js
import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Navigation from './Navigation'; // Substitua pelo nome correto do seu componente de navegação

function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}

export default App;
