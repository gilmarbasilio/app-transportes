import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import theme from '../../../../shared/theme';
import * as S from './styles'
import { FontAwesome5 } from '@expo/vector-icons';
import { PrivateStackParamList } from '../../../../routes/PrivateRoutes';
import { useNavigation } from '@react-navigation/native';

type RegisterUserCarProps = NativeStackNavigationProp<
  PrivateStackParamList,
  'HomeScreen'
>;

export const RegisterUseCar = () => {
  const { navigate } = useNavigation<RegisterUserCarProps>();
  return (
    <S.Container>
      <S.CarInfo onPress={() => navigate('CheckInScreen')}>
        <S.CarIcon>
          <FontAwesome5 name="key" size={40} color={theme.colors.brand} />
        </S.CarIcon>
        <S.CarDescription>
          <S.CartText>Nenhum veículo em uso. <S.CartTextBold>Clique aqui para registrar a saída.</S.CartTextBold></S.CartText>
        </S.CarDescription>
      </S.CarInfo>
    </S.Container>
  )
}