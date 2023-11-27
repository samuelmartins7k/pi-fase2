// Notes.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { NotesProvider, useNotes } from '../contexts/NotesContexts';

const NotesScreen = () => {
  const { notes, addNote, toggleNote, deleteCompletedNotes } = useNotes();
  const [newNote, setNewNote] = useState('');

  const handleAddNote = () => {
    if (newNote.trim() !== '') {
      addNote({
        id: notes.length + 1,
        text: newNote,
        completed: false,
      });
      setNewNote('');
    }
  };

  const confirmDeleteCompletedNotes = () => {
    Alert.alert(
      'Excluir Notas Concluídas',
      'Tem certeza que deseja excluir todas as notas concluídas?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          onPress: () => deleteCompletedNotes(),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <View style={{ marginBottom: 16 }}>
        <TextInput
          style={styles.input}
          placeholder="Nova nota"
          value={newNote}
          onChangeText={(text) => setNewNote(text)}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddNote}
        >
          <Text style={styles.addButtonText}>Adicionar Nota</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.noteContainer}>
            <TouchableOpacity onPress={() => toggleNote(item.id)}>
              <Text style={[styles.noteText, { textDecorationLine: item.completed ? 'line-through' : 'none' }]}>
                {item.text}
              </Text>
            </TouchableOpacity>
            {!item.completed && (
              <TouchableOpacity
                style={styles.completeButton}
                onPress={() => toggleNote(item.id)}
              >
                <Feather name="check" size={20} color="green" />
              </TouchableOpacity>
            )}
          </View>
        )}
      />

      <TouchableOpacity style={styles.deleteCompletedButton} onPress={confirmDeleteCompletedNotes}>
        <Text style={styles.deleteCompletedButtonText}>Excluir Notas Concluídas</Text>
      </TouchableOpacity>
    </View>
  );
};

// Wrap da tela no provedor de contexto
const Notes = () => {
  return (
    <NotesProvider>
      <NotesScreen />
    </NotesProvider>
  );
};

const styles = {
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: 'green',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 16,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
  noteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  noteText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
  },
  completeButton: {
    padding: 8,
  },
  deleteCompletedButton: {
    backgroundColor: 'red',
    padding: 10,
    alignItems: 'center',
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 25,
  },
  deleteCompletedButtonText: {
    color: 'white',
    fontSize: 16,
  },
};

export default Notes;
