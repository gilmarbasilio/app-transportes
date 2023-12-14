import { useTheme } from 'styled-components/native';
import * as S from './styles';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';

type HeaderRegisterCarProps = {
  title: string
}

export const HeaderRegisterCar = ({title}: HeaderRegisterCarProps) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { goBack } = useNavigation();

  const paddingTop = insets.top;

  return (
    <S.Container style={{paddingTop}}>
      <S.Goback onPress={goBack}>
        <FontAwesome5 name="arrow-left" size={24} color={theme.colors.brand} />
      </S.Goback>
      <S.Title>{title}</S.Title>
    </S.Container>
  )
}