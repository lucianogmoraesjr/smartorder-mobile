import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignIn } from '../screens/SignIn';

const Auth = createNativeStackNavigator();

export function AuthRoutes() {
  return (
    <Auth.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#fafafa' },
      }}
    >
      <Auth.Screen name="SignIn" component={SignIn} />
    </Auth.Navigator>
  );
}
