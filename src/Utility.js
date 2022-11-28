import ImagePicker from 'react-native-image-crop-picker';
import {PermissionsAndroid, Platform, Linking, Alert} from 'react-native';

const requestGalleryPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return Promise.resolve(granted);
    } else {
      console.log('Gallery permission denied');
      Alert.alert(
        'Permission Error',
        'Please allow gallery permissions to upload from gallery.',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => Linking.openSettings()},
        ],
      );

      return Promise.reject(false);
    }
  } catch (err) {
    return Promise.reject(err);
  }
};

const getMediaItemsFromImagePicker = (success, error, isOld) => {
  ImagePicker.openPicker(
    // isOld

    //?
    {
      width: 150,
      height: 150,
      cropping: true,
      mediaType: 'photo',
      minFiles: 1,
      maxFiles: 1,
      useFrontCamera: false,
      includeBase64: true,
    },
    //   : {
    //       multiple: false,
    //       loadingLabelText: 'Checking size...',
    //     },
  )
    .then(image => {
      console.log(image);
      success(image);
    })
    .catch(err => {
      console.log('UTILS: PICKER ERROR:', err?.message);
      if (
        Platform.OS === 'ios' &&
        err?.message === 'User did not grant library permission.'
      ) {
        Alert.alert(
          'Permission Error',
          'Please allow gallery permissions to upload from gallery.',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => Linking.openSettings()},
          ],
        );
      } else {
        console.log('Picker Error:', err);
      }
      error(err);
    });
};

export const openImagePicker = (success, error, isOld) => {
  // try {
  if (Platform.OS === 'ios') {
    getMediaItemsFromImagePicker(
      image => {
        success(image);
      },
      err => {
        error(err);
      },
      isOld,
    );
  } else {
    requestGalleryPermission()
      .then(isGranted => {
        getMediaItemsFromImagePicker(
          image => {
            success(image);
          },
          err => {
            error(err);
          },
          isOld,
        );
      })
      .catch(err => {
        console.log('ERROR:', err);
        error(err);
      });
  }
  // } catch (err) {
  //   error(err)
  // }
};
