import { useEffect, useState } from 'react';
import {
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';

export const useUploadImage = () => {
  const [image, setImage] = useState<ImagePickerResponse>();

  useEffect(() => {
    const uploadImage = async () => {
      launchImageLibrary(
        { mediaType: 'photo' },
        (response: ImagePickerResponse) => {
          if (!response.didCancel) {
            setImage(response);
          }
        },
      );
    };

    uploadImage();
  }, []);

  return image;
};
