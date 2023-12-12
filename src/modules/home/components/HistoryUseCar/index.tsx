import { FlatList } from 'react-native'
import * as S from './styles'
import { HistoryItem, HistoryItemDetail } from '../HistoryItem'

const list: HistoryItemDetail[] = [
  {
    id: '1234354',
    plate: 'XXX-0000',
    departureDate: ''
  },
  {
    id: '1234354123123',
    plate: 'XXX-0001',
    departureDate: ''
  },
  {
    id: '1234312312354',
    plate: 'XXX-0002',
    departureDate: ''
  },
  {
    id: '12343453454354',
    plate: 'XXX-0003',
    departureDate: ''
  },
]

export const HistoryUseCar = () => {
  return (
    <S.Container>
      <S.Title>Histórico</S.Title>
      <FlatList 
        data={list}
        renderItem={({item}) => <HistoryItem key={item.id} item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{gap: 15}}
        showsVerticalScrollIndicator={false}
      />
    </S.Container>
  )
}