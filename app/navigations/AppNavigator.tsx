import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Auth/LoginScreen';
import Signup from '../screens/Auth/SignUpScreen';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}
export default AppNavigator;