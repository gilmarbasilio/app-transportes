import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import theme from '../../../../shared/theme';
import * as S from './styles'
import { FontAwesome5 } from '@expo/vector-icons';
import { PrivateStackParamList } from '../../../../routes/PrivateRoutes';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { getCarInUseService } from '../../../../shared/services/historiesService';
import { Historic } from '../../../../shared/models/historicModel';
import { Loading } from '../../../../shared/components/Loading';

type RegisterUserCarProps = NativeStackNavigationProp<
  PrivateStackParamList,
  'HomeScreen'
>;

export const RegisterUseCar = () => {
  const [isLoading, setisLoading] = useState(true);
  const [historic, setHistoric] = useState<Historic | null>();
  const { navigate } = useNavigation<RegisterUserCarProps>();

  const handleGetCarInUse = async () => {
    try {
      const response = await getCarInUseService();
      setHistoric(response);
    } catch (error) {
      console.error(error);
    } finally {
      setisLoading(false);
    }
  }

  const handleRegisterCar = async () => {
    if(historic) {
      navigate('CheckOutScreen', {
        id: historic.id
      });
    } else {
      navigate('CheckInScreen');
    }
  }

  useEffect(() => {
    handleGetCarInUse();
  }, [])

  return (
    <S.Container>
      <S.CarInfo onPress={handleRegisterCar}>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {historic ? (
              <>
                <S.CarIcon>
                <FontAwesome5 name="car" size={40} color={theme.colors.brand} />
                </S.CarIcon>
                <S.CarDescription>
                  <S.CartText>Veículo <S.CartTextBold>{historic.licensePlate}</S.CartTextBold> em uso. <S.CartTextBold>Clique aqui para registrar a chegada.</S.CartTextBold></S.CartText>
                </S.CarDescription>
              </>
            ):(
              <>
                <S.CarIcon>
                  <FontAwesome5 name="key" size={40} color={theme.colors.brand} />
                </S.CarIcon>
                <S.CarDescription>
                  <S.CartText>Nenhum veículo em uso. <S.CartTextBold>Clique aqui para registrar a saída.</S.CartTextBold></S.CartText>
                </S.CarDescription>
              </>
            )}
          </>
        )}
      </S.CarInfo>
    </S.Container>
  )
}