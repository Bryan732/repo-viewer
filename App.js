import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './src/redux/store';

// screens
import Home from './src/screens/Home';
import RepoDetails from './src/screens/RepoDetails';
import Search from './src/screens/Search';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Home'>
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='RepoDetails' component={RepoDetails} />
          <Stack.Screen name='Search' component={Search} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}