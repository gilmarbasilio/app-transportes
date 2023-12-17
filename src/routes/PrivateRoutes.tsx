import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../modules/home/screens/HomeScreen';
import { CheckInScreen } from '../modules/register/screens/CheckInScreen';
import { CheckOutScreen } from '../modules/register/screens/CheckOutScreen';
import { HistoricDetailScreen } from '../modules/register/screens/HistoricDetailScreen';

export type PrivateStackParamList = {
  HomeScreen: undefined;
  CheckInScreen: undefined;
  CheckOutScreen: {
    id: string
  };
  HistoricDetailScreen: {
    id: string
  };
}

const Stack = createNativeStackNavigator<PrivateStackParamList>();

export default function PrivateRoutes() {
  return (
    <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="CheckInScreen" component={CheckInScreen} />
      <Stack.Screen name="CheckOutScreen" component={CheckOutScreen} />
      <Stack.Screen name="HistoricDetailScreen" component={HistoricDetailScreen} />
    </Stack.Navigator>
  )
}