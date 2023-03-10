import { StyleSheet, Text, View, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import LoginScreen from "./LoginScreen";
import Loading from "../components/common/Loading";

export default function IndexScreen(props) {
  const [session, setsession] = useState(null);
  const { navigation } = props;
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setsession(user ? true : false);
    });
  }, []);

  if (session === null) {
    return <Loading text={"Cargando"} />;
  }

  return session ? (
    <View>
      <Text>IndexScreen</Text>
      <Button
        title="Ir a detalles"
        onPress={() => navigation.navigate("details")}
      />
      <Button
        title="Ir a perfil"
        onPress={() => navigation.navigate("Profile")}
      />
      <Button
        title="Ir a login"
        onPress={() => navigation.navigate("details", { screen: "loginS" })}
      />
    </View>
  ) : (
    <LoginScreen />
  );
}
