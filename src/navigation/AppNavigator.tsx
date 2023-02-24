import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen/components/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen/components/ProfileScreen';
import {FilteredUser} from '../shared/types';

export type RootStackParamList = {
  Home: undefined;
  Profile: {user: FilteredUser};
};

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
