import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
//import { addTask } from '../store/actions';
import { addTask } from '../store/tasksSlice';
import Icons from 'react-native-vector-icons/FontAwesome6';

export default function AddOneList({ navigation }) {
  const dispatch = useDispatch();
  const [todo, setTodo] = useState('');
  const [error, setError] = useState('');

  const handleAdd = () => {
    if (todo.trim()) {
      setError('');
      dispatch(addTask(todo)); // Dispatch the request action
      navigation.goBack();
    } else {
      setError('Vui lòng nhập một công việc!');
    }
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
      </View>

      <View style={styles.content}>
        <Text style={styles.textContent}>ADD YOUR JOB</Text>
        <View style={styles.input}>
          <Icons name='rectangle-list' color='#1DD75B' size={20} style={styles.iconList} />
          <TextInput
            placeholder='Input your job'
            placeholderTextColor="#171A1F"
            style={styles.inputList}
            value={todo}
            onChangeText={setTodo}
          />
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={styles.btnSubmit} onPress={handleAdd}>
          <Text style={styles.textBtnSubmit}>FINISH</Text>
          <Icons name='arrow-right' color='#fff' size={16} />
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Image source={require('../assets/imgMain.png')} style={styles.imgMain} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  header: {
    flex: 1,
    marginTop: 30
  },
  imgInfo: {
    height: 40,
    width: 40,
    borderRadius: 90
  },
  myInfo: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
  },
  info: {
    flexDirection: 'row',
    width: '55%',
    justifyContent: 'space-between'
  },
  textName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#171A1F',
    marginLeft: 10
  },
  textIntro: {
    fontSize: 12,
    fontWeight: '400',
    color: '#171A1F'
  },
  content: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContent: {
    fontSize: 25,
    fontWeight: '700'
  },
  input: {
    width: '100%',
    height: 34,
    borderWidth: 1,
    borderColor: '#9095A0',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8
  },
  inputList: {
    width: '100%',
    height: 34,
    marginLeft: 10,
    alignItems: 'center'
  },
  iconList: {
    marginLeft: 10
  },
  btnSubmit: {
    width: 190,
    height: 44,
    backgroundColor: '#00BDD6',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 70,
  },
  textBtnSubmit: {
    fontSize: 16,
    color: '#fff',
    marginRight: 10,
  },
  errorText: { // Thêm style cho thông báo lỗi
    color: 'red',
    marginTop: 5,
    marginBottom: 10,
  },
  footer: {
    flex: 1,
    alignItems: 'center'
  },
  imgMain: {
    width: 120,
    height: 120
  },
});
