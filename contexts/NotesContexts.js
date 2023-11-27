// NotesContext.js
import React, { createContext, useReducer, useContext } from 'react';

// Definindo o contexto
const NotesContext = createContext();

// Estado inicial
const initialState = {
  notes: [],
};

// Tipos de ações
const ADD_NOTE = 'ADD_NOTE';
const TOGGLE_NOTE = 'TOGGLE_NOTE';
const DELETE_COMPLETED_NOTES = 'DELETE_COMPLETED_NOTES';

// Redutor
const notesReducer = (state, action) => {
  switch (action.type) {
    case ADD_NOTE:
      return { notes: [...state.notes, action.note] };
    case TOGGLE_NOTE:
      return {
        notes: state.notes.map((note) =>
          note.id === action.id ? { ...note, completed: !note.completed } : note
        ),
      };
    case DELETE_COMPLETED_NOTES:
      return { notes: state.notes.filter((note) => !note.completed) };
    default:
      return state;
  }
};

// Provedor do contexto
export const NotesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notesReducer, initialState);

  const addNote = (note) => {
    dispatch({ type: ADD_NOTE, note });
  };

  const toggleNote = (id) => {
    dispatch({ type: TOGGLE_NOTE, id });
  };

  const deleteCompletedNotes = () => {
    dispatch({ type: DELETE_COMPLETED_NOTES });
  };

  return (
    <NotesContext.Provider
      value={{
        notes: state.notes,
        addNote,
        toggleNote,
        deleteCompletedNotes,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

// Hook personalizado para utilizar o contexto
export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes deve ser usado dentro de um NotesProvider');
  }
  return context;
};
