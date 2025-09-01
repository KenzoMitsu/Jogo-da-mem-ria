import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import Jogo from "./screens/Jogo";

const Stack = createStackNavigator()

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator >
          <Stack.Screen options={{ headerShown: false }}
                        name={"Jogo"}
                        component={Jogo} />
        </Stack.Navigator>
      </NavigationContainer>
  )
}