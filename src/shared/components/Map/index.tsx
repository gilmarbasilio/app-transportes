import Mapview, {LatLng, MapViewProps, Marker} from 'react-native-maps';
import { IconBox } from '../IconBox';

type Props = MapViewProps & {
  coordinates: LatLng[];
}

export const Map = ({coordinates}: Props) => {

  const lastCoodinate = coordinates[coordinates.length - 1];

  return (
    <Mapview 
      style={{width: '100%', height: 200}}
      region={{
        latitude: lastCoodinate.latitude,
        longitude: lastCoodinate.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
      }}
    >
      <Marker 
        coordinate={coordinates[0]}
      >
        <IconBox icon={{iconName: 'FontAwesome5', name: 'car'}} size='small' />
      </Marker>
    </Mapview>
  )
}