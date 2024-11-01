import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import store from './store/store'; 
import Screen1 from './components/addTodoList';
import Screen2 from './components/addOneList';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>  {/* Bọc NavigationContainer bằng Provider */}
      <NavigationContainer style={styles.container}>
        <Stack.Navigator initialRouteName="Screen1" screenOptions={{
            headerStyle: {
              height: 30, // độ dài của thanh title
            },
            headerTitleStyle: {
              fontSize: 15, // cỡ chữ trong thanh title
            },
          }}> 
          <Stack.Screen name="Screen1" component={Screen1} options={{title: 'screen01', headerShown: false }}/>
          <Stack.Screen name="Screen2" component={Screen2} options={{title: 'screen02', headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
