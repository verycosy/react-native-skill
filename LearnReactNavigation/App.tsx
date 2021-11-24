import React, {useCallback} from 'react';
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
  useFocusEffect,
} from '@react-navigation/native';
import {Text} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

type TabParamList = {
  Home: undefined;
  Search: undefined;
  Notification: undefined;
  Message: undefined;
};

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator<TabParamList>();

function HomeScreen() {
  useFocusEffect(
    useCallback(() => {
      console.log('화면 보는중');

      return () => {
        console.log('다른 화면 이동');
      };
    }, []),
  );

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

function MainScreen() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarColor: 'black',
          tabBarLabel: '홈',
          tabBarIcon: ({color}) => <Icon name="home" color={color} size={24} />,
          tabBarBadge: 'new',
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarColor: 'gray',
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
          tabBarColor: 'green',
          tabBarLabel: '알림',
          tabBarIcon: ({color}) => (
            <Icon name="notifications" color={color} size={24} />
          ),
          tabBarBadge: 30,
        }}
      />
      <Tab.Screen
        name="Message"
        component={MessageScreen}
        options={{
          tabBarColor: 'blue',
          tabBarLabel: '메시지',
          tabBarIcon: ({color}) => (
            <Icon name="message" color={color} size={24} />
          ),
          tabBarBadge: true,
        }}
      />
    </Tab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
  const nameMap = {
    Home: '홈',
    Search: '검색',
    Notification: '알림',
    Message: '메시지',
  };

  return nameMap[routeName];
}

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={MainScreen}
            options={({route}) => ({title: getHeaderTitle(route)})}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
