import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IndexScreen from "../screens/IndexScreen";
import DetailsScreen from "../screens/DetailsScreen";
import InformationScreen from "../screens/InformationScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import IndexStack from "./IndexStack";
import DetailsStack from "./DetailsStack";
import { Icon } from "react-native-elements";
import ProfileScreen from "../screens/ProfileScreen";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Drawer = createDrawerNavigator();

// export default function AppNavigation() {
//   return (
//     <Drawer.Navigator>
//       <Drawer.Screen
//         component={IndexScreen}
//         name="index"
//         options={{ title: "inicio" }}
//       />
//       <Drawer.Screen
//         component={DetailsScreen}
//         name="details"
//         options={{ title: "Detalles" }}
//       />
//       <Drawer.Screen
//         component={InformationScreen}
//         name="information"
//         options={{ title: "Informacion" }}
//       />
//     </Drawer.Navigator>
//   );
// }

const Tab = createBottomTabNavigator();

export default function AppNavigation() {
  const [session, setsession] = useState(null);
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setsession(user ? true : false);
    });
  }, []);

  return session ? (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "red",
        tabBarInactiveTintColor: "green",
        tabBarIcon: ({ color, size }) => showIcon(route, color, size),
      })}
    >
      <Tab.Screen
        component={IndexStack}
        name="index"
        //para ocultar el titulo
        options={{ title: "Inicio", headerShown: false }}
      />
      <Tab.Screen
        component={DetailsStack}
        name="details"
        options={{ title: "Detalles" }}
      />
      <Tab.Screen
        component={ProfileScreen}
        name="Profile"
        options={{ title: "Profile", headerShown: true }}
      />
    </Tab.Navigator>
  ) : (
    <IndexStack />
  );
}

function showIcon(route, color, size) {
  let icono;
  if (route.name === "index") {
    icono = "home-circle";
  }
  if (route.name === "details") {
    icono = "details";
  }
  if (route.name === "Profile") {
    icono = "account-outline";
  }
  return (
    <Icon type="material-community" name={icono} color={color} size={size} />
  );
}

// const Tab = createNativeStackNavigator();

// export default function AppNavigation() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen
//         component={IndexScreen}
//         name="index"
//         options={{ title: "Inicio" }}
//       />
//       <Tab.Screen
//         component={DetailsScreen}
//         name="details"
//         options={{ title: "Detalles" }}
//       />
//       <Tab.Screen
//         component={InformationScreen}
//         name="information"
//         options={{ title: "Informacion" }}
//       />
//     </Tab.Navigator>
//   );
// }
