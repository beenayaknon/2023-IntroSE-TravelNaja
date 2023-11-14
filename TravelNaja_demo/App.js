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
import Profile from './page/Profile.js';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FFECEF',
        },
        headerTintColor: '#372948',
      }}
    >

      <Stack.Screen
        name="Menu"
        component={Menu}
        options={{ title: 'Travel Naja Demo' }}
      />

      <Stack.Screen
        name="Register_email"
        component={Register_email}
        options={{ title: 'Travel Naja Registration demo' }}
      />

      <Stack.Screen
        name="Register_personal_info"
        component={Register_personal_info}
        options={{ title: 'Travel Naja Registration demo' }}
      />

      <Stack.Screen
        name="Register_payment_info"
        component={Register_payment_info}
        options={{ title: 'Travel Naja Registration demo' }}
      />

      <Stack.Screen
        name="ApplyGuide"
        component={ApplyGuide}
        options={{ title: 'Apply Local Guide demo' }}
      />

      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ title: 'Travel Naja Registration demo' }}
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
    alignItems: 'center',
    justifyContent: 'center',
  },
});
