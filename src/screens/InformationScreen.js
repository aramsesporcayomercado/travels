import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";

export default function InformationScreen(props) {
  const { navigation } = props;
  return (
    <View>
      <Text>informationScreen</Text>
      <Button
        title="Ir a Inicio"
        onPress={() => navigation.navigate("index")}
      />
      <Button
        title="Ir a detalles"
        onPress={() => navigation.navigate("details")}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
