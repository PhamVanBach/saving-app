//Write useCamera hook here with react-native-vision-camera
import { useEffect, useState } from 'react';
import { CameraDevice } from 'react-native-vision-camera';
import { usePermissions } from './usePermissions';
import { useBackHandler } from './useBackHandler';

export const useCamera = () => {
  const [camera, setCamera] = useState<CameraDevice>();
  const [hasPermission, requestPermission] = usePermissions('CAMERA');
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    if (hasPermission === 'granted') {
      CameraDevice.getAvailableCameraDevices().then(
        (cameras: CameraDevice[]) => {
          setCamera(cameras[0]);
        },
      );
    }
  }, [hasPermission]);

  useBackHandler(() => {
    if (isRecording) {
      setIsRecording(false);
      return true;
    }
    return false;
  });

  const toggleRecording = async () => {
    if (camera) {
      if (isRecording) {
        await camera.stopRecording();
      } else {
        await camera.startRecording({
          video: {
            codec: 'H264',
            flash: 'off',
          },
        });
      }
      setIsRecording(!isRecording);
    }
  };

  return [camera, toggleRecording, requestPermission] as const;
};
