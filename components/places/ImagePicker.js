import { useState } from 'react';
import { Alert, Button, Image, Text, View, StyleSheet } from 'react-native';
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from 'expo-image-picker';
import { Colors } from '../../constants/colors';
import { OutlineButton } from '../UI/OutlineButton';

export const ImagePicker = () => {
  const [imageUri, setImageUri] = useState('');
  const [permissionInformation, requestPermission] = useCameraPermissions();
  const verifyPermission = async () => {
    if (permissionInformation.status === PermissionStatus.GRANTED) {
      const permissonResponse = await requestPermission();
      return permissonResponse.granted;
    }
    if (permissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permission',
        'You need to grant camera permission to use this app.'
      );
      return false;
    }
    return true;
  };
  const imagePickHandler = async () => {
    const hasPermission = await verifyPermission();

    if (!hasPermission) return;

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    if (!image.canceled) {
      setImageUri(image.assets[0].uri);
    }
  };

  let imagePreview = <Text>No image taking yet.</Text>;
  if (imageUri) {
    imagePreview = <Image source={{ uri: imageUri }} style={styles.image} />;
  }
  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlineButton icon="camera" onPress={imagePickHandler}>
        Take Image
      </OutlineButton>
    </View>
  );
};

const styles = StyleSheet.create({
  imagePreview: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
    maxWidth: '100%',
    height: 200,
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
