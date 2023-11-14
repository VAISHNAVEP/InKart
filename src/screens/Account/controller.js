import {Platform} from 'react-native';
import storage from '@react-native-firebase/storage';
import RNFetchBlob from 'rn-fetch-blob';

export const updateProfileImage = async image => {
  return new Promise(async resolve => {
    try {
      const filename = image.substring(image.lastIndexOf('/') + 1);
      const pathForFirebaseStorage = await getPathforFirebaseStorage(image);
      await storage().ref(filename).putFile(pathForFirebaseStorage);
      await storage()
        .ref(filename)
        .getDownloadURL()
        .then(url => {
          resolve(url);
        });
    } catch (error) {
      console.warn(error);
    }
  });
};

const getPathforFirebaseStorage = async uri => {
  if (Platform.OS === 'ios') {
    return uri;
  }
  const stat = await RNFetchBlob.fs.stat(uri);
  return stat.path;
};
// ee processukalellam cheyyunnath nammude image url firebasil upload cheyyanan//
