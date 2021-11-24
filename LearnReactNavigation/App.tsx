import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Button, Text, TouchableOpacity, View} from 'react-native';
import {
  createDrawerNavigator,
  DrawerScreenProps,
} from '@react-navigation/drawer';
import {SafeAreaView} from 'react-native-safe-area-context';

type DrawerParamList = {
  Home: undefined;
  Setting: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

function HomeScreen({navigation}: DrawerScreenProps<DrawerParamList, 'Home'>) {
  return (
    <View>
      <Text>Home</Text>
      <Button title="Drawer 열기" onPress={() => navigation.openDrawer()} />
      <Button
        title="Setting 열기"
        onPress={() => navigation.navigate('Setting')}
      />
    </View>
  );
}

function SettingScreen({
  navigation,
}: DrawerScreenProps<DrawerParamList, 'Setting'>) {
  return (
    <View>
      <Text>Setting</Text>
      <Button title="뒤로가기" onPress={() => navigation.goBack()} />
    </View>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        backBehavior="history"
        screenOptions={{
          drawerActiveBackgroundColor: '#fb8c00',
          drawerActiveTintColor: 'white',
        }}
        drawerContent={({navigation}) => (
          <SafeAreaView>
            <Text>A Custom Drawer</Text>
            <Button onPress={() => navigation.closeDrawer()} title="닫기" />
          </SafeAreaView>
        )}>
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{title: '홈'}}
        />
        <Drawer.Screen
          name="Setting"
          component={SettingScreen}
          options={{title: '설정'}}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
