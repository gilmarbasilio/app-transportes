import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';
import { ThemeProvider } from 'styled-components';
import theme from './src/shared/theme';
import { StatusBar } from 'react-native';
import {
  useFonts,
  Lato_400Regular,
  Lato_700Bold,
  Lato_900Black,
} from '@expo-google-fonts/lato';
import { Loading } from './src/shared/components/Loading';

export default function App() {
  const [fontsLoaded] = useFonts({
    Lato_400Regular,
    Lato_700Bold,
    Lato_900Black,
  });

  if(!fontsLoaded) {
    return <Loading />;
  }
  
  return (
    <ThemeProvider theme={theme} >
      <NavigationContainer>
        <StatusBar 
          barStyle='light-content' 
          backgroundColor="transparent" 
          translucent 
        />
        <Routes />
      </NavigationContainer>
    </ThemeProvider>
  );
}

