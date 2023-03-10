import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React from "react";
import { Overlay } from "react-native-elements";

export default function Loading(props) {
  const { visible, text } = props;
  return (
    <Overlay isVisible={visible} overlayStyle={styles.Overlay}>
      <View style={styles.viewLoad}>
        <ActivityIndicator size="large" color="#0D5BD7" />
        {text && <Text style={styles.text}>Cargando...</Text>}
      </View>
    </Overlay>
  );
}
Loading.defaultProps = {
  visible: false,
};

const styles = StyleSheet.create({
  Overlay: {
    height: 100,
    width: 200,
    backgroundColor: "#fff",
    borderColor: "#0D5BD7",
    borderWidth: 2,
    borderRadius: 8,
  },
  viewLoad: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#0D5BD7",
    textTransform: "uppercase",
    marginVertical: 15,
  },
});
