import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const data = {
      id: (new Date().getTime()),
      title: newTaskTitle,
      done: false
    }

    const titleExist = tasks.find(task=> task.title===newTaskTitle);
    if(titleExist){
      Alert.alert(
        'Task já cadastrada',
        'Você não pode cadastrar uma task com o mesmo nome');
    } else {
      setTasks(oldTasks=>[...oldTasks, data]);
    }

  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }));
    const foundTask = updatedTasks.find(task=>task.id===id);
    if(!foundTask){
      return;
    }
    foundTask.done = !foundTask.done;
    setTasks(updatedTasks); 
  }

  function handleEditTask(id:number,taskNewTitle:string){
    const updatedTasks = tasks.map(task => ({ ...task }));
    const foundTask = updatedTasks.find(task=>task.id===id);
    if(!foundTask){
      return;
    }
    foundTask.title = taskNewTitle;
    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {

    Alert.alert(
            "Remover item",
            "Tem certeza que você deseja remover esse item?",
            [
              {
                text: "Não",
                style: "cancel",
              },
              {
                text: "Sim",
                onPress: () => setTasks(oldTasks=>oldTasks.filter(
                  task=>task.id !=id
                )),
                style: "default",
              },
            ],
          );
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})