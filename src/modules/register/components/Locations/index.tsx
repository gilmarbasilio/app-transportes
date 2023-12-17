import { LocationInfo, LocationInfoProps } from '../LocationInfo';
import * as S from './styles';

type Props = {
  departure: LocationInfoProps;
  arrival: LocationInfoProps;
}

export const Locations = ({arrival, departure}: Props) => {
  return (
    <S.Container>
      <LocationInfo 
        icon={{
          iconName: 'FontAwesome5',
          name: 'car'
        }}
        label={departure.label}
        description={departure.description}
      />
      <S.Line />
      <LocationInfo 
        icon={{
          iconName: 'FontAwesome5',
          name: 'flag-checkered'
        }}
        label={arrival.label}
        description={arrival.description}
      />
    </S.Container>
  )
}