import { FlatList } from 'react-native'
import * as S from './styles'
import { HistoryItem, HistoryItemDetail } from '../HistoryItem'
import { useEffect, useState } from 'react'
import { getListHistoriesService } from '../../../../shared/services/historiesService'
import { useToastStore } from '../../../../shared/store/useToastStore'
import { useIsFocused } from '@react-navigation/native'

export const HistoryUseCar = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [skip, setSkip] = useState<number>(0);
  const [take, setTake] = useState<number>(6);
  const [listHistoric, setListHistoric] = useState<HistoryItemDetail[]>([]);
  const setMessage = useToastStore(state => state.setMessage);
  const isFocused = useIsFocused();

  const handleGetListHistories = async (_skip: number = skip) => {
    try {
      setIsLoading(true);

      const response = await getListHistoriesService({
        status: 'arrived',
        skip: _skip, 
        take: take,
      });

      const list = [
        ...listHistoric,
        ...response?.map((historic) => {
          return {
            id: historic.id,
            plate: historic.licensePlate,
            departureDate: historic.createdAt
          }
        })
      ]

      setListHistoric(list.reduce((item: HistoryItemDetail[], current) => {
        const x = item.find(historic => historic?.id === current.id);
        if (!x) {
          return item.concat([current]);
        } else {
          return item;
        }
      }, []));
      
    } catch (error: any) {
      setMessage({
        text: error?.message,
        type: 'danger'
      })
    } finally {
      setIsLoading(false);
    }
  }

  const handleMoreData = () => {
    const _skip = Number(skip) + Number(take);
    setSkip(_skip);
    handleGetListHistories(_skip);
  }

  useEffect(() => {
    handleGetListHistories();
  }, [isFocused]);

  return (
    <S.Container>
      <S.Title>Histórico</S.Title>
      <FlatList 
        data={listHistoric}
        renderItem={({item}) => <HistoryItem key={item.id} item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{gap: 15}}
        showsVerticalScrollIndicator={false}
        onEndReached={handleMoreData}
        onEndReachedThreshold={0.2}
      />
      {isLoading && <S.LoadingList />}
    </S.Container>
  )
}