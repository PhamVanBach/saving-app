import { Alert } from 'react-native';

export const ErrorManager = (error: string) => {
  Alert.alert('Error', error);
};
