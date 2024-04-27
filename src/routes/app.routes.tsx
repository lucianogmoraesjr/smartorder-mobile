import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Main } from '../Main';

const App = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <App.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#fafafa' },
      }}
    >
      <App.Screen name="Main" component={Main} />
    </App.Navigator>
  );
}
