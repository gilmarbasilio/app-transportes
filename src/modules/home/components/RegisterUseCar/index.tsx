import theme from '../../../../shared/theme';
import * as S from './styles'
import { FontAwesome5 } from '@expo/vector-icons';

export const RegisterUseCar = () => {
  return (
    <S.Container>
      <S.CarInfo>
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