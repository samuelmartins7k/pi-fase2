import React, { createContext, useContext, useReducer } from 'react';

const ActionTypes = {
  SET_USER: 'SET_USER',
  LOGOUT: 'LOGOUT',
};

function authReducer(state, action) {
  switch (action.type) {
    case ActionTypes.SET_USER:
      return { ...state, user: action.payload };
    case ActionTypes.LOGOUT:
      return { ...state, user: null };
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

  return (
    <AuthContext.Provider value={{ user: state.user, setUser, logout }}>
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
