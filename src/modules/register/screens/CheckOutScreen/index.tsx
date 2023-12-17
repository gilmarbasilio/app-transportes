import { useEffect, useState } from 'react';
import { Map } from '../../../../shared/components/Map';
import { HeaderRegisterCar } from '../../components/HeaderRegisterCar';
import * as S from './styles';
import { getAddressLocation } from '../../../../shared/utils/getAddressLocation';
import { LocationInfo } from '../../components/LocationInfo';
import { LicensePlateInput } from '../../components/LicensePlateInput';
import { JustificationInput } from '../../components/JustificationInput';
import { Alert, ScrollView } from 'react-native';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToastStore } from '../../../../shared/store/useToastStore';
import { checkOutHistoricService, createHistoricService, getHistoricByIdService } from '../../../../shared/services/historiesService';
import { startLocationTask, stopLocationTask } from '../../../../shared/tasks/backgroundLocationTask';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { PrivateStackParamList } from '../../../../routes/PrivateRoutes';
import { useNavigation } from '@react-navigation/native';
import { LatLng } from 'react-native-maps';
import { getStorageLocations } from '../../../../shared/storage/locationStorage';
import { Historic } from '../../../../shared/models/historicModel';
import { format, parseISO } from 'date-fns';
import { Loading } from '../../../../shared/components/Loading';
import { Locations } from '../../components/Locations';

const registerCarUseSchema = z.object({
  plate: z.string({
    required_error: 'A placa é obrigatória'
  }).min(8, {message: 'A placa tem que ter no mínimo 8 caracteres.'}),
  justification: z.string({
    required_error: 'A finalidade de uso é obrigatória'
  }).min(3, {message: 'A finalidade tem que ter no mínimo 3 caracteres'}),
});

type RegisterCarUseSchema = z.infer<typeof registerCarUseSchema>;

type CheckOutScreenProps = NativeStackScreenProps<
  PrivateStackParamList,
  "CheckOutScreen"
>;

export const CheckOutScreen = ({route, navigation}: CheckOutScreenProps) => {
  const setMessage = useToastStore(state => state.setMessage);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingLocation, setIsLoadingForm] = useState(true);
  const [coordinates, setCoordinates] = useState<LatLng[]>();
  const [historic, setHistoric] = useState<Historic>();
  const [departure, setDeparture] = useState<any>();
  const [arrival, setArrival] = useState<any>();

  const getHistoricInfo = async () => {
    try {
      const responseHistoric = await getHistoricByIdService(route.params.id);
      const locationStorage = await getStorageLocations();

      setHistoric(responseHistoric);
      setCoordinates(locationStorage);

      if(locationStorage?.[0]) {
        const location = locationStorage?.[0];
        const departureStreetName = await getAddressLocation(location);
        setDeparture({
          label: `Saindo em ${departureStreetName ?? ""}`,
          description: format(
            new Date(location?.timestamp),
            "dd/MM/yyyy' às 'HH:hh"
          )
        })
      }

      if(locationStorage?.length > 1) {
        const latLocation = locationStorage[locationStorage.length - 1];
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

  const handleCheckOutRegister = async () => {
    try {
      setIsLoading(true);

      if(!historic) {
        return setMessage({
          text: 'Não foi possível obeter os dados para registar a chegada do veículo.',
          type: 'danger'
        });
      }

      const locations = await getStorageLocations();

      await checkOutHistoricService({
        id: historic.id,
        coords: locations
      });

      await stopLocationTask();

      setMessage({
        text: 'Chegada registrada com sucesso',
        type: 'success'
      });

      // navigation.navigate('HomeScreen');
      navigation.goBack();
    } catch (error: any) { 
      setMessage({
        text: error?.message || 'Não foi possível registar a chegada do veículo',
        type: 'danger'
      });
    } finally {
      setIsLoading(false);
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
      <HeaderRegisterCar title='Chegada' />
      <ScrollView>
        {coordinates && <Map coordinates={coordinates} />} 
        <S.Content>
          <Locations departure={departure} arrival={arrival} />

          <S.Label>Placa do veículo</S.Label>
          <S.LicensePlate>{historic?.licensePlate}</S.LicensePlate>
          
          <S.Label>Finalidade de uso</S.Label>
          <S.Description>{historic?.description}</S.Description>

          <S.ButtonCheckOutOutput 
            title='Registrar Chegada'
            onPress={handleCheckOutRegister}
            isLoading={isLoading}
          />
        </S.Content>
      </ScrollView>
    </S.Container>
  )
}