// import React from "react";
// import { createAppContainer, createSwitchNavigator } from "react-navigation";

// import MainTabNavigator from "./MainTabNavigator";

// export default createAppContainer(
//   createSwitchNavigator({
//     // You could add another route here for authentication.
//     // Read more at https://reactnavigation.org/docs/en/auth-flow.html
//     Main: MainTabNavigator
//   })
// );

import { createStackNavigator, createAppContainer } from "react-navigation";
import HomePageScreen from "../screens/HomePageScreen";
import SettingsScreen from "../screens/SettingsScreen";

import MainTabNavigator from "./MainTabNavigator";

const MainNavigator = createStackNavigator({
  Main: MainTabNavigator,
  Home: { screen: HomePageScreen },
  Settings: { screen: SettingsScreen }
});

const AppNavigator = createAppContainer(MainNavigator);

export default AppNavigator;
