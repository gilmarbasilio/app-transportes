import { reverseGeocodeAsync } from "expo-location";

type Props = {
  latitude: number;
  longitude: number;
}

export const getAddressLocation = async ({ latitude, longitude }: Props) => {
  try {
    const addressResponse = await reverseGeocodeAsync({ latitude, longitude });

    return addressResponse[0]?.street;
  } catch (error) {
    throw error;
  }
}