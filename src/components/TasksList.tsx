import React from 'react';
import { FlatList} from 'react-native';
import { ItemWrapper } from './ItemWrapper';
import { TasksItem } from './TaskItem';

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TasksListProps {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
   editTask: (id:number, taskNewTitle:string)=>void;
}
export function TasksList({ tasks, toggleTaskDone, removeTask, editTask }: TasksListProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={item => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <ItemWrapper index={index}>
            
            <TasksItem
              toggleTaskDone={() => toggleTaskDone(item.id)}
              removeTask={() => removeTask(item.id)}
              editTask={() => editTask(item.id, item.title)}
              index={index}
              task={item} 
            />

          </ItemWrapper>
        )
      }}
      style={{
        marginTop: 32
      }}
    />
  )
}
