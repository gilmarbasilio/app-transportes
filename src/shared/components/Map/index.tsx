import Mapview, {LatLng, MapViewProps, Marker, Polyline} from 'react-native-maps';
import { IconBox } from '../IconBox';
import { useRef } from 'react';
import theme from '../../theme';

type Props = MapViewProps & {
  coordinates: LatLng[];
}

export const Map = ({coordinates}: Props) => {
  const mapRef = useRef<Mapview>(null);
  const lastCoodinate = coordinates[coordinates.length - 1];

  const onMapLoaded = () => {
    if(coordinates.length > 1) {
      mapRef.current?.fitToSuppliedMarkers(['departure', 'arrival'], {
        edgePadding: {
          top: 100,
          right: 50,
          bottom: 50,
          left:50
        }
      })
    }
  }

  return (
    <Mapview 
      ref={mapRef}
      style={{width: '100%', height: 200}}
      region={{
        latitude: lastCoodinate.latitude,
        longitude: lastCoodinate.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
      }}
      onMapLoaded={onMapLoaded}
    >
      <Marker 
        identifier='departure'
        coordinate={coordinates[0]}
      >
        <IconBox icon={{iconName: 'FontAwesome5', name: 'car'}} size='small' />
      </Marker>

      {coordinates.length > 1 && (
        <>
          <Marker 
            identifier='arrival'
            coordinate={lastCoodinate}
          >
            <IconBox icon={{iconName: 'FontAwesome5', name: 'flag-checkered'}} size='small' />
          </Marker>

          <Polyline 
            coordinates={[...coordinates]}
            strokeColor={theme.colors.gray_700}
            strokeWidth={5}
          />
        </>
      )} 

    </Mapview>
  )
}