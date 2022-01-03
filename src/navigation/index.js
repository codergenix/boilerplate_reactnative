import React from 'react';
//import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//------
import Login from '../screen/login';
import Users from '../screen/user';

const Stack = createNativeStackNavigator();
//---
const Navigation = () => {

    return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="login">
                    <Stack.Screen
                        name="login"
                        options={{ title: 'login', animationEnabled: false, }}
                        component={Login} />
                    <Stack.Group>
                        <Stack.Screen
                            name="user"
                            options={{ title: 'user', animationEnabled: false, }}
                            component={Users} />
                    </Stack.Group>
                </Stack.Navigator>
            </NavigationContainer>
    );
};
export default Navigation;