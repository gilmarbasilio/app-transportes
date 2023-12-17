import { useEffect, useState } from 'react';
import { Map } from '../../../../shared/components/Map';
import { HeaderRegisterCar } from '../../components/HeaderRegisterCar';
import * as S from './styles';
import { getAddressLocation } from '../../../../shared/utils/getAddressLocation';
import { ScrollView } from 'react-native';
import { useToastStore } from '../../../../shared/store/useToastStore';
import {  getHistoricByIdService } from '../../../../shared/services/historiesService';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PrivateStackParamList } from '../../../../routes/PrivateRoutes';
import { LatLng } from 'react-native-maps';
import { Historic } from '../../../../shared/models/historicModel';
import { format } from 'date-fns';
import { Loading } from '../../../../shared/components/Loading';
import { Locations } from '../../components/Locations';

type HistoricDetailScreenProps = NativeStackScreenProps<
  PrivateStackParamList,
  "HistoricDetailScreen"
>;

export const HistoricDetailScreen = ({route}: HistoricDetailScreenProps) => {
  const setMessage = useToastStore(state => state.setMessage);
  const [isLoadingLocation, setIsLoadingForm] = useState(true);
  const [coordinates, setCoordinates] = useState<LatLng[]>([]);
  const [historic, setHistoric] = useState<Historic>();
  const [departure, setDeparture] = useState<any>();
  const [arrival, setArrival] = useState<any>();

  const getHistoricInfo = async () => {
    try {
      const responseHistoric = await getHistoricByIdService(route.params.id);

      setHistoric(responseHistoric);
      setCoordinates(responseHistoric.coords);

      if(responseHistoric?.coords?.[0]) {
        const location = responseHistoric?.coords?.[0];
        const departureStreetName = await getAddressLocation(location);
        setDeparture({
          label: `Saindo em ${departureStreetName ?? ""}`,
          description: format(
            new Date(location?.timestamp),
            "dd/MM/yyyy' às 'HH:hh"
          )
        })
      }

      if(responseHistoric?.coords?.length > 1) {
        const latLocation = responseHistoric?.coords[responseHistoric?.coords?.length - 1];
        const arrivalStreetName = await getAddressLocation(latLocation);
        setArrival({
          label: `Saindo em ${arrivalStreetName ?? ""}`,
          description: format(
            new Date(latLocation?.timestamp),
            "dd/MM/yyyy' às 'HH:hh"
          )
        })
      }
    } catch (error: any) {
      setMessage({
        text: error?.message,
        type: 'danger'
      });
    } finally {
      setIsLoadingForm(false);
    }
  }

  useEffect(() => {
    getHistoricInfo();
  }, [route.params.id])

  if(isLoadingLocation) {
    return <Loading />;
  }

  return (
    <S.Container>
      <HeaderRegisterCar title='Detalhes do Uso' />
      <ScrollView>
        {coordinates?.length > 0 && <Map coordinates={coordinates} />} 
        <S.Content>
          <Locations departure={departure} arrival={arrival} />

          <S.Label>Placa do veículo</S.Label>
          <S.LicensePlate>{historic?.licensePlate}</S.LicensePlate>
          
          <S.Label>Finalidade de uso</S.Label>
          <S.Description>{historic?.description}</S.Description>
        </S.Content>
      </ScrollView>
    </S.Container>
  )
}