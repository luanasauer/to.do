import React, { useEffect, useRef, useState } from 'react';
import { Image, TouchableOpacity, View, Text, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../assets/icons/trash/trash.png';
import editingIcon from '../assets/icons/PenEdit.png';

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TasksListProps {
  index:number;
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id:number, taskNewTitle:string)=>void;
}

export function TasksItem({ task, toggleTaskDone, removeTask, editTask, index }:TasksListProps){

    const [isEditing, setIsEditing] = useState(false);
    const textInputRef = useRef<TextInput>(null);
    const [taskNewTitleValue,setTaskNewTitleValue] = useState(task.title);

    useEffect(()=>{
        if (textInputRef.current) {
            if (isEditing) {
              textInputRef.current.focus();
            } else {
              textInputRef.current.blur();
            }
          }
    },[isEditing]);

    function handleStartEditing(){
        setIsEditing(true);
    }
    function handleCancelEditing(){
        setTaskNewTitleValue(task.title);
        setIsEditing(false);
    }

    function handleSubmitEditing(){
        editTask(task.id,taskNewTitleValue );
        setIsEditing(false);
    }

    return(
        <>
        
            <View>
                <TouchableOpacity
                    testID={`button-${index}`}
                    activeOpacity={0.7}
                    style={styles.taskButton}
                    onPress={()=>toggleTaskDone(task.id)}
                >
                <View 
                    testID={`marker-${index}`}
                    style={task.done === true ? styles.taskMarkerDone : styles.taskMarker}
                >
                    { task.done && (
                    <Icon 
                        name="check"
                        size={12}
                        color="#FFF"
                    />
                    )}
                </View>

                <TextInput 
                    ref={textInputRef}
                    style={ task.done ? styles.taskTextDone : styles.taskText}
                    value={taskNewTitleValue}
                    editable={isEditing}
                    onChangeText={setTaskNewTitleValue}
                    onSubmitEditing={handleSubmitEditing}   
                />

                </TouchableOpacity>
            </View>
            <View>
                {isEditing&&
                    <TouchableOpacity onPress={handleCancelEditing} >
                    <Icon name="x" size={24} color="#b2b2b2"/>
                    </TouchableOpacity>
                }
                {!isEditing &&
                    <TouchableOpacity onPress={handleStartEditing} >
                    <Image source={editingIcon} />
                    </TouchableOpacity>
                }
            </View>

            <View style={ styles.iconsDivider }/>

            <TouchableOpacity
                testID={`trash-${index}`}
                style={{ paddingHorizontal: 24 }}
                onPress={()=>removeTask(task.id)}
                disabled={isEditing}
            >
                <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }}/>
            </TouchableOpacity>


        </>
    );
}

const styles = StyleSheet.create({
    taskButton: {
      flex: 1,
      paddingHorizontal: 24,
      paddingVertical: 15,
      marginBottom: 4,
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: 'center'
    },
    taskMarker: {
      height: 16,
      width: 16,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#B2B2B2',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskText: {
      color: '#666',
      fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
      height: 16,
      width: 16,
      borderRadius: 4,
      backgroundColor: '#1DB863',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskTextDone: {
      color: '#1DB863',
      textDecorationLine: 'line-through',
      fontFamily: 'Inter-Medium'
    },
    iconsDivider:{
        height:24,
        width:1,
        backgroundColor: 'rgba(196, 196, 196, 0.24)' 

    }
  })