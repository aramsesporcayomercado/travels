import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Input, Button, Icon } from "react-native-elements";
import { useFormik } from "formik";
import * as yup from "yup";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";

export default function Registerform() {
  const navigation = useNavigation();
  const [password, setPassword] = useState(false);
  const [repeatPassword, setRepeatPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Formato de email no valido")
        .required("Email Obligatorio"),
      password: yup.string().required("Contraseña Obligatoria"),
      repeatPassword: yup
        .string()
        .required("Contraseña Obligatoria")
        .oneOf([yup.ref("password")], "contraseñas no coinciden"),
    }),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const auth = getAuth();
        await createUserWithEmailAndPassword(
          auth,
          formValue.email,
          formValue.password
        );
        //primera forma
        //navigation.navigate("indexS");
        //segunda forma
        navigation.goback();
      } catch (error) {
        Toast.show({
          type: "error",
          position: "top",
          text1: "Error al registrar la cuenta",
        });
      }
    },
  });
  const showPass = () => {
    setPassword(!password);
  };

  const showRepeatPass = () => {
    setRepeatPassword(!repeatPassword);
  };

  return (
    <View style={styles.ViewForm}>
      <Input
        placeholder="correo electronico"
        containerStyle={styles.input}
        rightIcon={
          <Icon type="material-community" name="at" iconStyle={styles.Icon} />
        }
        onChangeText={(text) => formik.setFieldValue("email", text)}
        errorMessage={formik.errors.email}
      />
      <Input
        placeholder="contraseña"
        secureTextEntry={password ? false : true}
        containerStyle={styles.input}
        rightIcon={
          <Icon
            type="material-community"
            name={password ? "eye-off-outline" : "eye-outline"}
            onPress={showPass}
          />
        }
        iconStyle={styles.Icon}
        onChangeText={(text) => formik.setFieldValue("password", text)}
        errorMessage={formik.errors.password}
      />
      <Input
        placeholder="repetir contraseña"
        secureTextEntry={repeatPassword ? false : true}
        containerStyle={styles.input}
        rightIcon={
          <Icon
            type="material-community"
            name={repeatPassword ? "eye-off-outline" : "eye-outline"}
            onPress={showRepeatPass}
          />
        }
        iconStyle={styles.Icon}
        onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
        errorMessage={formik.errors.repeatPassword}
      />
      <Button
        title="Registrar"
        containerStyle={styles.containerBtn}
        buttonStyle={styles.Btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  ViewForm: {
    marginTop: 30,
  },
  input: {
    width: "100%",
    marginTop: 20,
  },
  icon: {
    color: "#c1c1c1",
  },
  containerBtn: {
    width: "100%",
    marginTop: 20,
  },
  Btn: {
    backgroundColor: "#0D5BD7",
  },
});
