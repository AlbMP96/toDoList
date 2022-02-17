import React, {useState} from 'react';
import { Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, ViewPropTypes } from 'react-native';
import Task from './components/Task';

export default function App() {

  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handledAddTask = () => {
    Keyboard.dismiss();
    console.log(task);
    setTaskItems([...taskItems, task])
    setTask(null);
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];

    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }

  return (
    <View style={styles.container}>
     {/* Today's tasks */}

      <ScrollView style={styles.tasksWraper}>
        <Text style={styles.sectionTitle}>Today's tasks</Text>

        <View style={styles.items}>
          {/* Where the tasks go */}
          {
            taskItems.map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                  <Task text={item}/>
                </TouchableOpacity>
              );
            })
          }
        </View>      
      </ScrollView>
      {/*Write the tasks*/}
      <KeyboardAvoidingView
          behavior={Platform.OS === "android" ? "height" : "padding"}
          style={styles.writeTaskWrapper}
        >
          <TextInput style={styles.input} placeholder='Write a task' value={task} onChangeText={text => setTask(text)}/>

          <TouchableOpacity onPress={() => handledAddTask()}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
    paddingBottom: 120,
  },
  tasksWraper :{
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle :{
    fontSize: 24,
    fontWeight: 'bold',
  },
  items :{
    marginTop: 30,
    paddingBottom: 80,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {},
});
