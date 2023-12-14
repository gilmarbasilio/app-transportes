
import theme from '../../../../shared/theme';
import * as S from './styles'
import { Entypo } from '@expo/vector-icons';
import { format, parseISO } from 'date-fns'

export type HistoryItemDetail = {
  id: string;
  plate: string;
  departureDate: string;
}

type HistoryItemProps = {
  item: HistoryItemDetail
}

export const HistoryItem = ({item}: HistoryItemProps) => {
  return (
    <S.Container>
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