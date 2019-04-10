import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import LinksScreen from "../screens/LinksScreen";
import SettingsScreen from "../screens/SettingsScreen";
import HomePageScreen from "../screens/HomePageScreen";
import AilmentNotesScreen from "../screens/AilmentNotesScreen";
import AnalyticsScreen from "../screens/AilmentAnalytics";

const HomePageStack = createStackNavigator({
  HomePage: HomePageScreen
});

HomePageStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-options" : "md-options"}
    />
  )
};

const AilmentNotesStack = createStackNavigator({
  AilmentNotes: AilmentNotesScreen
});

AilmentNotesStack.navigationOptions = {
  tabBarLabel: "Notes",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  )
};

const TreatmentStack = createStackNavigator({
  Treatment: LinksScreen
});

TreatmentStack.navigationOptions = {
  tabBarLabel: "GP Chat",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-link" : "md-link"}
    />
  )
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
});

SettingsStack.navigationOptions = {
  tabBarLabel: "Account",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  )
};

const AnalyticsStack = createStackNavigator({
  Analytics: AnalyticsScreen
});
AnalyticsStack.navigationOptions = {
  tabBarLabel: "Account",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-options" : "md-options"}
    />
  )
};

AnalyticsStack.navigationOptions = {
  tabBarLabel: "Analytics",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-options" : "md-options"}
    />
  )
};

export default createBottomTabNavigator({
  HomePageStack,
  SettingsStack,
  AilmentNotesStack,
  AnalyticsStack,
  TreatmentStack
});
