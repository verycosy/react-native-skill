import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Text} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

type TabParamList = {
  Home: undefined;
  Search: undefined;
  Notification: undefined;
  Message: undefined;
};

const Tab = createMaterialTopTabNavigator<TabParamList>();

function HomeScreen() {
  return <Text>Home</Text>;
}

function SearchScreen() {
  return <Text>Search</Text>;
}

function NotificationScreen() {
  return <Text>Notification</Text>;
}

function MessageScreen() {
  return <Text>Message</Text>;
}

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarIndicatorStyle: {
            backgroundColor: '#009688',
          },
          tabBarActiveTintColor: '#009688',
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: '홈',
            tabBarIcon: ({color}) => (
              <Icon name="home" color={color} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarLabel: '검색',
            tabBarIcon: ({color}) => (
              <Icon name="search" color={color} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="Notification"
          component={NotificationScreen}
          options={{
            tabBarLabel: '알림',
            tabBarIcon: ({color}) => (
              <Icon name="notifications" color={color} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="Message"
          component={MessageScreen}
          options={{
            tabBarLabel: '메시지',
            tabBarIcon: ({color}) => (
              <Icon name="message" color={color} size={24} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
