import { useEffect, useState } from 'react';
import { PermissionsAndroid } from 'react-native';

export const usePermissions = (permission: string) => {
  const [hasPermission, setHasPermission] = useState<
    'granted' | 'denied' | 'never_ask_again' | undefined
  >();

  useEffect(() => {
    const checkPermission = async () => {
      const status = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS[permission],
      );
      setHasPermission(status ? 'granted' : 'denied');
    };

    checkPermission();
  }, [permission]);

  const requestPermission = async () => {
    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS[permission],
    );

    setHasPermission(status);
  };

  return [hasPermission, requestPermission] as const;
};
