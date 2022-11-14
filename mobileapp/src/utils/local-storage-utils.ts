import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeDataToLocalStorage = async (key: string, value: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error('Hiba történt Localstorage-be mentés során:', e);
  }
};

export const getDataFromLocalStorage = async (key: string) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    console.error('Hiba történt a Localstorage item kiolvasása során:', e);
  }
};

export const deleteDataFromLocalStorage = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error('Hiba történt Localstorage-ben való törléskor:', e);
  }
};

export const clearLocalStorage = (): void => {
  AsyncStorage.clear();
};
