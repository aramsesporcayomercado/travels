import { View, StyleSheet } from "react-native";
import React from "react";
import { Avatar, Text } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { getAuth, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { async } from "@firebase/util";

export default function PofileInfo() {
  const { uid, photoURL, displayName, email } = getAuth().currentUser;
  console.log(uid);

  const changePhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 4],
    });
    if (!result.canceled) {
      uploadPhoto(result.uri);
    }
  };
  const uploadPhoto = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const storage = getStorage();
    const refStorage = ref(storage, `imgProfile/${uid}`);
    uploadBytes(refStorage, blob).then((snapshot) => {
      // console.log(snapshot.metadata);
      updatePhoto(snapshot.metadata.fullPath);
    });
  };

  const updatePhoto = async (imgPath) => {
    const storage = getStorage();
    const refImg = ref(storage, imgPath);
    const urlImg = await getDownloadURL;
  };
  return (
    <View style={styles.viewPhoto}>
      <Avatar
        size="large"
        rounded={true}
        icon={{ type: "material", name: "person" }}
        containerStyle={styles.avatar}
      >
        <Avatar.Accessory size={25} onPress={changePhoto} />
      </Avatar>
      <View>
        <Text style={styles.nameUser}>{displayName || "User"}</Text>
        <Text>{email}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewPhoto: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: "#f2f2f2",
  },
  avatar: {
    marginRight: 20,
    backgroundColor: "#0D5BD7",
  },
  nameUser: {
    fontWeight: "bold",
    paddingBottom: 5,
  },
});
