import React, { useEffect, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./src/Redux/reducers";
import middleware from "./src/Redux/middlewares";
import { createStackNavigator } from "@react-navigation/stack";
import Deck from "./src/components/Deck";
import AddCard from "./src/components/AddCard";
import Quiz from "./src/components/Quiz";
import { setNotification } from "./src/utils/api";
import BottomTabNavigator from "./src/components/BottomTabNavigator";

const store = createStore(reducer, middleware);
const Stack = createStackNavigator();

export default function App() {
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted.current) setNotification();
    return () => (isMounted.current = false);
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="BottomTabNavigator"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Deck" component={Deck} />
          <Stack.Screen name="AddCard" component={AddCard} />
          <Stack.Screen name="Quiz" component={Quiz} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}