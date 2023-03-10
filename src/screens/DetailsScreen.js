import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";

export default function DetailsScreen(props) {
  const { navigation } = props;
  return (
    <View>
      <Text>DetailsScreen</Text>
      <Button
        title="Ir a Inicio"
        onPress={() => navigation.navigate("index")}
      />
      <Button
        title="Ir a Informacion"
        onPress={() => navigation.navigate("Profile")}
      />
      <Button
        title="Ir a login"
        onPress={() => navigation.navigate("loginS")}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
