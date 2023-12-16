import { useEffect, useState } from 'react';
import { Map } from '../../../../shared/components/Map';
import { HeaderRegisterCar } from '../../components/HeaderRegisterCar';
import * as S from './styles';
import { 
  LocationAccuracy, 
  LocationObjectCoords, 
  useForegroundPermissions, 
  watchPositionAsync,
  requestBackgroundPermissionsAsync
} from 'expo-location';
import { getAddressLocation } from '../../../../shared/utils/getAddressLocation';
import { LocationInfo } from '../../components/LocationInfo';
import { LicensePlateInput } from '../../components/LicensePlateInput';
import { useForm } from 'react-hook-form';
import { JustificationInput } from '../../components/JustificationInput';
import { Alert, ScrollView } from 'react-native';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToastStore } from '../../../../shared/store/useToastStore';
import { createHistoricService } from '../../../../shared/services/historiesService';
import { startLocationTask } from '../../../../shared/tasks/backgroundLocationTask';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PrivateStackParamList } from '../../../../routes/PrivateRoutes';
import { useNavigation } from '@react-navigation/native';

const registerCarUseSchema = z.object({
  plate: z.string({
    required_error: 'A placa é obrigatória'
  }).min(8, {message: 'A placa tem que ter no mínimo 8 caracteres.'}),
  justification: z.string({
    required_error: 'A finalidade de uso é obrigatória'
  }).min(3, {message: 'A finalidade tem que ter no mínimo 3 caracteres'}),
});

type RegisterCarUseSchema = z.infer<typeof registerCarUseSchema>;

type CheckInScreenProps = NativeStackNavigationProp<
  PrivateStackParamList,
  "CheckInScreen"
>;

export const CheckInScreen = () => {
  const {navigate} = useNavigation<CheckInScreenProps>();
  const setMessage = useToastStore(state => state.setMessage);
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [currentCoords, setCurrentCoords] = useState<LocationObjectCoords>();
  const [currentAddress, setCurrentAddress] = useState<string>();
  const [locationForegroundPermission, requestLocationForegroundPermission] = useForegroundPermissions();


  const { 
    control,
    handleSubmit
  } = useForm<RegisterCarUseSchema>({
    resolver: zodResolver(registerCarUseSchema)
  });

  useEffect(() => {
    requestLocationForegroundPermission();
  }, []);

  useEffect(() => {
    if(!locationForegroundPermission?.granted) {
      return;
    }

    watchPositionAsync({
      accuracy: LocationAccuracy.High,
      timeInterval: 1000
    }, 
    (location)=> {
      setCurrentCoords(location.coords);
      getAddressLocation(location.coords)
        .then((address) => {
          if(address) {
            setCurrentAddress(address);
          }
        })
    });

  }, [locationForegroundPermission?.granted]);

  const handleDepartureRegister = async (data: RegisterCarUseSchema) => {
    try {
      setIsLoadingForm(true);

      const backgroundPermissions = await requestBackgroundPermissionsAsync();

      if(!backgroundPermissions.granted) {
        return Alert.alert(
          "Localização",
          'É necessário permitir que o App tenha acesso a localização em segundo plano. Acesse as configurações do dispositivo e habilite a opção "Permitir o tempo todo".'   
        );
      }

      await createHistoricService({
        licensePlate: data.plate,
        description: data.justification,
        coords: [
          {
            latitude: Number(currentCoords?.latitude),
            longitude: Number(currentCoords?.longitude),
            timestamp: new Date().getTime(),
          }
        ]
      });

      await startLocationTask();

      setMessage({
        text: 'Veículo registrado com sucesso!',
        type: 'success'
      });

      navigate('HomeScreen');

    } catch (error: any) {
      setMessage({
        text: error?.message,
        type: 'danger'
      });
    } finally {
      setIsLoadingForm(false);
    }
  }

  if (!locationForegroundPermission?.granted) {
    return (
      <S.Container>
        <HeaderRegisterCar title='Saída' />
        <S.Message>
          Você precisa permitir que o aplicativo tenha acesso a localização para 
          acessar essa funcionabilidade.
        </S.Message>
      </S.Container>
    )
  }

  return (
    <S.Container>
      <HeaderRegisterCar title='Saída' />
      <ScrollView>
        {currentCoords && <Map coordinates={[currentCoords]} />} 
        <S.FormContainer>
          {currentAddress && (
            <LocationInfo 
              label='Localização atual'
              description={currentAddress}
              icon={{
                iconName: 'FontAwesome5',
                name: 'car'
              }}
            />
          )}

          <LicensePlateInput 
            control={control}
            label="Placa do veículo"
            placeholder="XXX-0000"
          />

          <JustificationInput 
            control={control}
            label="Finalidade do uso"
            placeholder="Vou utilizar o veículo para..."
          />

          <S.ButtonRegisterOutput 
            title="Registrar Saída"
            onPress={handleSubmit(handleDepartureRegister)}
            isLoading={isLoadingForm}
          />
        </S.FormContainer>
      </ScrollView>
    </S.Container>
  )
}