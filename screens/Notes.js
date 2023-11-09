import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Notes() {
  const navigation = useNavigation();
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');
  const [title, setTitle] = useState('Minhas Tarefas');

  const handleAddTask = () => {
    if (taskText) {
      const newTask = { id: tasks.length + 1, text: taskText, completed: false };
      setTasks([...tasks, newTask]);
      setTaskText('');
    }
  };

  const handleToggleTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleRemoveTask = (taskId) => {
    const filteredTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(filteredTasks);
  };

  const handleChangeTitle = (newTitle) => {
    setTitle(newTitle);
  };

  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>{title}</Text>
      <TextInput
        style={estilos.input}
        placeholder={'Adicionar Tarefa'}
        value={taskText}
        onChangeText={(text) => setTaskText(text)}
      />
      <Button title="Adicionar Tarefa" onPress={handleAddTask} />
      <TextInput
        style={estilos.input}
        placeholder={'Título da Lista'}
        value={title}
        onChangeText={(text) => handleChangeTitle(text)}
      />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={estilos.taskItem}>
            <Text
              style={[estilos.taskText, item.completed && estilos.completedTask]}
              onPress={() => handleToggleTask(item.id)}
            >
              {item.text}
            </Text>
            <Button
              title="Remover"
              onPress={() => handleRemoveTask(item.id)}
              color="red"
            />
          </View>
        )}
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    marginTop: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    lineHeight: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginBottom: 16,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  taskText: {
    fontSize: 18,
    flex: 1,
  },
  completedTask: {
    textDecorationLine: 'line-through',
  },
});

export default Notes;