import { useEffect, useState } from 'react';
import { Map } from '../../../../shared/components/Map';
import { HeaderRegisterCar } from '../../components/HeaderRegisterCar';
import * as S from './styles';
import { 
  LocationAccuracy, 
  LocationObjectCoords, 
  useForegroundPermissions, 
  watchPositionAsync 
} from 'expo-location';
import { getAddressLocation } from '../../../../shared/utils/getAddressLocation';
import { LocationInfo } from '../../components/LocationInfo';

export const CheckInScreen = () => {
  const [currentCoords, setCurrentCoords] = useState<LocationObjectCoords>();
  const [currentAddress, setCurrentAddress] = useState<string>();
  const [locationForegroundPermission, requestLocationForegroundPermission] = useForegroundPermissions();

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

  console.log({currentAddress})

  return (
    <S.Container>
      <HeaderRegisterCar title='Saída' />
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
      </S.FormContainer>
    </S.Container>
  )
}