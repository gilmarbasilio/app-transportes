import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../modules/home/screens/HomeScreen';
import { CheckInScreen } from '../modules/register/screens/CheckInScreen';

export type PrivateStackParamList = {
  HomeScreen: undefined;
  CheckInScreen: undefined;
}

const Stack = createNativeStackNavigator<PrivateStackParamList>();

export default function PrivateRoutes() {
  return (
    <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="CheckInScreen" component={CheckInScreen} />
    </Stack.Navigator>
  )
}