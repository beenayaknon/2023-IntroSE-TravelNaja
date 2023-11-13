import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Register_email from './page/Register_email.js';
import Register_personal_info from './page/Register_personal_info.js';
import Register_payment_info from './page/Register_payment_info.js';
import Menu from './page/Menu.js';
import ApplyGuide from './page/ApplyGuide.js';
const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#E9967A',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >

      <Stack.Screen
        name="Menu"
        component={Menu}
        options={{ title: 'Menu' }}
      />

      <Stack.Screen
        name="Register_email"
        component={Register_email}
        options={{ title: 'Register Travel Naja' }}
      />

      <Stack.Screen
        name="Register_personal_info"
        component={Register_personal_info}
        options={{ title: 'Register Travel Naja' }}
      />

      <Stack.Screen
        name="Register_payment_info"
        component={Register_payment_info}
        options={{ title: 'Register Travel Naja' }}
      />

<Stack.Screen
        name="ApplyGuide"
        component={ApplyGuide}
        options={{ title: 'Apply Local Guide' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
