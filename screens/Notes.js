import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Pressable, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function Notes() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
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

    const completedTask = updatedTasks.find((task) => task.id === taskId && task.completed);

    if (completedTask) {
      setCompletedTasks([...completedTasks, completedTask]);
    }

    setTasks(updatedTasks.filter((task) => task.id !== taskId));
  };

  const handleRemoveCompletedTasks = () => {
    Alert.alert(
      'Confirmação',
      'Tem certeza que deseja excluir todas as tarefas concluídas?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          onPress: () => {
            setCompletedTasks([]);
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleChangeTitle = (newTitle) => {
    setTitle(newTitle);
  };

  const renderTaskItem = ({ item }) => (
    <View style={estilos.taskItem}>
      <Text
        style={[estilos.taskText, item.completed && estilos.completedTask]}
        onPress={() => handleToggleTask(item.id)}
      >
        {item.text}
      </Text>
      {!item.completed && (
        <Pressable onPress={() => handleToggleTask(item.id)}>
          <Icon name="check" size={20} color="green" style={estilos.icon} />
        </Pressable>
      )}
    </View>
  );

  const estilos = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16,
      marginTop: 20,
    },
    titulo: {
      fontSize: 28,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 24,
    },
    inputContainer: {
      flexDirection: 'row',
      marginBottom: 16,
    },
    input: {
      flex: 1,
      lineHeight: 24,
      borderBottomWidth: 1,
      borderBottomColor: 'black',
    },
    addButton: {
      backgroundColor: 'green',
      borderRadius: 25,
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 16,
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
      color: 'gray',
    },
    icon: {
      marginLeft: 8,
    },
    completedContainer: {
      marginTop: -8,
    },
    completedTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 16,
    },
    removeCompletedContainer: {
      marginTop: -8,
    },
    removeCompletedButton: {
      backgroundColor: 'red',
      borderRadius: 25,
      paddingVertical: 10,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 70,
    },
    removeCompletedButtonText: {
      color: 'white',
    },
  });

  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo} role="heading" aria-level="1">
        {title}
      </Text>
      <View style={estilos.inputContainer}>
        <TextInput
          style={estilos.input}
          placeholder={'Adicionar Tarefa'}
          value={taskText}
          onChangeText={(text) => setTaskText(text)}
          inputMode="text"
        />
        <Pressable style={estilos.addButton} onPress={handleAddTask}>
          <Icon name="plus" size={20} color="white" />
        </Pressable>
      </View>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTaskItem}
      />
      {completedTasks.length > 0 && (
        <View style={estilos.completedContainer}>
          <Text style={estilos.completedTitle} role="heading" aria-level="2">
            Tarefas Concluídas
          </Text>
          <FlatList
            data={completedTasks}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderTaskItem}
          />
          <View style={estilos.removeCompletedContainer}>
            <Pressable
              style={estilos.removeCompletedButton}
              onPress={handleRemoveCompletedTasks}
              aria-label="Excluir Tarefas Concluídas"
            >
              <Text style={estilos.removeCompletedButtonText}>
                Excluir Tarefas Concluídas
              </Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}

export default Notes;
