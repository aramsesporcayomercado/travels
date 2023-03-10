import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { Image } from "react-native-elements";
import Registerform from "../components/account/Registerform";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function RegisterScreen() {
  return (
    <KeyboardAwareScrollView>
      <Image
        source={require("../../assets/images/IMG_20230301_145409.jpg")}
        style={styles.logo}
      />
      <View style={styles.viewForm}>
        <Registerform />
      </View>
    </KeyboardAwareScrollView>
  );
}
const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 170,
    resizeMode: "contain",
    marginTop: 30,
  },
  viewForm: {
    marginHorizontal: 5,
  },
});
