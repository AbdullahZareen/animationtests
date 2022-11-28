import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {openImagePicker} from './Utility';
import ImagePicker from 'react-native-image-crop-picker';

const ImagePickerScreen = () => {
  const [image, setimage] = useState('');
  const onimageSelected = image => {
    console.log(`data:${image.mime};base64,${image.data}`);
    setimage(`data:${image.mime};base64,${image.data}`);
    console.log('image data', image.data);
    //  setimage(image.data);
  };
  const openPicker = () => {
    openImagePicker(
      image => {
        onimageSelected(image);
      },
      error => {
        console.log('Image Picker Error:', error);
        // alert('Unable to pick image')
      },
      true,
    );
  };
  const takePicture = () => {
    ImagePicker.openCamera({
      width: 150,
      height: 150,
      cropping: true,
      mediaType: 'photo',
      minFiles: 1,
      maxFiles: 1,
      useFrontCamera: false,
      includeBase64: true,
    })
      .then(image => onimageSelected(image))
      .catch(e => console.log(e));
  };

  ///////////////////dosra code.
  //   const onPressDelete = () => {
  //     logAmplitudeEvent({
  //       eventName: AmplitudeConst.User_Askstep_Upload_Review_Bin,
  //     })
  //     setContentMedia(
  //       contentMedia.filter((item, index) => {
  //         return index != selectedIndex
  //       }),
  //     )
  //     onPressItem(0)
  //   }
  ///
  //   const onPressAdd = () => {
  //     if (contentMedia.length < 4) {
  //       openImagePicker(
  //         (image) => {
  //           if (image?.mime.includes('image') || image?.duration <= 60000) {
  //             logAmplitudeEvent({
  //               eventName: AmplitudeConst.User_Askstep_Upload_SelectMedia,
  //               properties: { mediaType: image?.duration ? 'video' : 'image' },
  //             })
  //             let array = [image]
  //             setContentMedia([...contentMedia, ...array])
  //           } else {
  //             logAmplitudeEvent({
  //               eventName:
  //                 AmplitudeConst.User_Askstep_Upload_SelectMedia_TooLarge,
  //             })
  //             setIsMediaLargeSize(true)
  //           }
  //         },
  //         (error) => {
  //           console.log('Image Picker Error:', error)
  //           alert('Unablt to pick image')
  //         },
  //       )
  //     }}
  // }
  //   const onPressItem = selectedIndex => {
  //     contentMedia.forEach((element, index) => {
  //       if (selectedIndex === index) {
  //         element.isSelected = true;
  //         setSelectedIndex(index);
  //       } else {
  //         element.isSelected = false;
  //       }
  //     });
  //   };
  return (
    <View>
      <TouchableOpacity
        style={{height: 50, width: 100, marginTop: 100, borderWidth: 1}}
        onPress={openPicker}>
        <Text>Pick image</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={takePicture}>
        <Text>TakeImage</Text>
      </TouchableOpacity>
      <Image
        style={{
          width: 100,
          height: 50,
          //  resizeMode: Image.resizeMode.contain,
          borderWidth: 1,
          borderColor: 'red',
        }}
        source={{uri: image}}
      />
    </View>
  );
};

export default ImagePickerScreen;

const styles = StyleSheet.create({});
