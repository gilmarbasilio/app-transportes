import * as S from './styles';
import { HeaderHome } from "../../components/HeaderHome";
import { RegisterUseCar } from '../../components/RegisterUseCar';
import { HistoryUseCar } from '../../components/HistoryUseCar';

export default function HomeScreen () {
  return (
    <S.Container>
      <HeaderHome />
      <RegisterUseCar />
      <HistoryUseCar />
    </S.Container>
  )
}