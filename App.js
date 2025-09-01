import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import HomeScreen from "./screens/Jogo";

const Stack = createStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{headerShown: false}} name={"Parabens"} component={Parabens} />
        </Stack.Navigator>
      </NavigationContainer>
  )
}