
import { useNavigation } from '@react-navigation/native';
import theme from '../../../../shared/theme';
import * as S from './styles'
import { Entypo } from '@expo/vector-icons';
import { format, parseISO } from 'date-fns'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PrivateStackParamList } from '../../../../routes/PrivateRoutes';

export type HistoryItemDetail = {
  id: string;
  plate: string;
  departureDate: string;
}

type HistoryItemProps = {
  item: HistoryItemDetail
}

type HistoryNavigationProps = NativeStackNavigationProp<
  PrivateStackParamList,
  'HomeScreen'
>;

export const HistoryItem = ({item}: HistoryItemProps) => {
  const {navigate} = useNavigation<HistoryNavigationProps>();

  const handleShowHistoric = async () => {
    navigate('HistoricDetailScreen', {
      id: item.id
    })
  }

  return (
    <S.Container onPress={handleShowHistoric}>
      <S.ItemContainer>
        <S.Plate>{item.plate}</S.Plate>
        <S.Description>
          {
            format(
              parseISO(item.departureDate),
              "'Saída em 'dd/MM/yyyy' às 'HH:mm"
            )
          }
        </S.Description>
      </S.ItemContainer>
      <S.ItemButton>
        <Entypo name="chevron-right" size={30} color={theme.colors.brand} />
      </S.ItemButton>
    </S.Container>
  )
}