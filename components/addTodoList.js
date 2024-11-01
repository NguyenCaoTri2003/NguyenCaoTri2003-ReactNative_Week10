import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { fetchTasks, updateTask, deleteTask } from '../store/actions';
import { fetchTasks, updateTask, deleteTask } from '../store/tasksSlice';
import { selectTasks, selectLoading } from '../store/tasksSlice'; 
import { useIsFocused } from '@react-navigation/native';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity, FlatList } from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome6';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import IconsC from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Task = ({ item, handleEdit, handleDelete }) => {
  return (
    <View style={styles.task}>
      <View style={styles.headerTask}>
        <IconsC name='checkbox-outline' color='#14923E' size={20} />
        <Text style={styles.textTask}>{item.title}</Text>
      </View>
      <View style={styles.footerTask}>
        <TouchableOpacity onPress={() => handleEdit(item)}>
          <EvilIcons name='pencil' color='#E05858' size={18} style={styles.iconEdit} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <AntDesign name='delete' color='#E05858' size={17} style={styles.iconDelete} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function AddTodoList({ navigation }) {
  //khi dùng bằng Redux saga
  // const dispatch = useDispatch();
  // const tasks = useSelector((state) => state.tasks);
  // const isFocused = useIsFocused();
  // const [editTask, setEditTask] = useState(null);
  // const [editModalVisible, setEditModalVisible] = useState(false);

  // React.useEffect(() => {
  //   if (isFocused) {
  //     dispatch(fetchTasks());
  //   }
  // }, [dispatch, isFocused]);

  // const handleEdit = (task) => {
  //   setEditTask(task);
  //   setEditModalVisible(true);
  // };

  // const handleSaveEdit = () => {
  //   dispatch(updateTask(editTask));
  //   setEditModalVisible(false);
  // };

  // const handleDelete = (taskId) => {
  //   dispatch(deleteTask(taskId));
  // };

  //khi dùng bằng redux Toolkit
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);
  const loading = useSelector(selectLoading);
  const isFocused = useIsFocused();
  const [editModalVisible, setEditModalVisible] = useState(false);

  useEffect(() => {
    if (isFocused) {
      dispatch(fetchTasks());
    }
  }, [dispatch, isFocused]);

  const handleEdit = (task) => {
    setEditTask(task);
    setEditModalVisible(true);
  };

  const handleSaveEdit = () => {
    if (editTask) {
      dispatch(updateTask(editTask));
      setEditModalVisible(false);
    }
  };

  const handleDelete = (taskId) => {
    dispatch(deleteTask(taskId));
  };
  const renderItem = ({ item }) => {
    return <Task item={item} handleEdit={handleEdit} handleDelete={handleDelete} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.myInfo}>
          <TouchableOpacity onPress={() => navigation.navigate('Screen1')}>
            <Icons name='arrow-left' color='black' size={20} />
          </TouchableOpacity>
          <View style={styles.info}>
            <Image source={require('../assets/avt.jpg')} style={styles.imgInfo} />
            <View style={styles.textView}>
              <Text style={styles.textName}>Hi</Text>
              <Text style={styles.textIntro}>Have a great day ahead</Text>
            </View>
          </View>
        </View>
        <View style={styles.input}>
          <EvilIcons name='search' color='#171A1F' size={20} style={styles.iconSearch} />
          <TextInput placeholder='Search' placeholderTextColor="#171A1F" style={styles.inputSearch} />
        </View>
      </View>
      <View style={styles.content}>
        <FlatList
          data={tasks}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Text>No tasks available</Text>}
        />
      </View>
      {editModalVisible && (
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.editInput}
              value={editTask?.title}
              onChangeText={(text) => setEditTask({ ...editTask, title: text })}
            />
            <TouchableOpacity onPress={handleSaveEdit}>
              <Text style={styles.saveButton}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setEditModalVisible(false)}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.add} onPress={() => navigation.navigate('Screen2')}>
          <Text style={styles.textAdd}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  imgInfo:{
    height: 40,
    width: 40,
    borderRadius: 90
  },
  header:{
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 5,
    justifyContent: 'space-around'
  },
  myInfo:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    
  },
  info:{
    flexDirection: 'row',
    width: '50%',
    justifyContent: 'space-between'
  },
  textName:{
    fontSize: 15,
    fontWeight: 700,
    color: '#171A1F',
    marginLeft: 10
  },
  textIntro:{
    fontSize: 12,
    fontWeight: 400,
    color: '#171A1F'
  },
  input:{
    width: '100%',
    height: 34,
    borderWidth: 1,
    borderColor: '#9095A0',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8
  },
  inputSearch:{
    width: '100%',
    height: 34,
    marginLeft: 10,
    alignItems: 'center'
  },
  iconSearch:{
    marginLeft: 10
  },
  content:{
    flex: 3,
    paddingHorizontal: 10,
    paddingTop: 10
  },
  task:{
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 24,
    backgroundColor: '#DEE1E678',
  },
  headerTask:{
    flexDirection: 'row',
    width: '80%',
    marginLeft: 10,
    alignItems: 'center'
  },
  textTask:{
    fontSize: 14,
    textAlign: 'center',
    marginLeft: 5
  },
  footerTask:{
    flexDirection: 'row',
    marginRight: 10,
    alignItems: 'center'
  },
  iconEdit:{
    marginRight: 5
  },
  footer:{
    flex: 1,
    alignItems: 'center'
  },
  add:{
    width: 49,
    height: 49,
    borderRadius: 90,
    backgroundColor: '#00BDD6',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  },
  textAdd:{
    color: '#fff',
    fontSize: 60,
    textAlign: 'center',
    fontWeight: 700,
    marginBottom: 15
  },
  modalContainer: {
    position: 'absolute',
    top: '30%',
    left: '10%',
    right: '10%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  editInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginBottom: 15,
    fontSize: 16,
    width: '100%',
  },
  saveButton: {
    color: 'blue',
    textAlign: 'center',
    marginVertical: 10,
  },
  cancelButton: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  },
});
