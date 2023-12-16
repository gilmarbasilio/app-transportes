import AsyncStorage from "@react-native-async-storage/async-storage";
import { Coords } from "../models/historicModel";
import { STORAGE_KEY } from "../constants/storageConstants";


export const getStorageLocations = async (): Promise<Coords[]> => {
  const storage = await AsyncStorage.getItem(STORAGE_KEY);

  return storage ? JSON.parse(storage) : [];
}

export const saveStorageLocation = async (newLocation: Coords) => {
  const storage = await getStorageLocations();

  storage.push(newLocation);

  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(storage))
}

export const removeStorageLocations = async () => {
  await AsyncStorage.removeItem(STORAGE_KEY);
}