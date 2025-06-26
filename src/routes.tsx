import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const AppStack = createStackNavigator();

import Login from "./pages/Login";
import Form from "./pages/Form";

//<AppStack.Screen name="Login" component={Login} />

export default function Routes() {
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                
                <AppStack.Screen name="Form" component={Form} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
}