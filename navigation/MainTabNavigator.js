import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import LoginScreen from "../screens/LoginScreen";
import LinksScreen from "../screens/LinksScreen";
import SettingsScreen from "../screens/SettingsScreen";
import HomePageScreen from "../screens/HomePageScreen";
import GPHomePageScreen from "../screens/GPHomePageScreen";
import AilmentNotesScreen from "../screens/AilmentNotesScreen";
import CalendarPageScreen from "../screens/CalendarPageScreen";

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

const GPHomePageStack = createStackNavigator({
  GPHomePage: GPHomePageScreen
});

GPHomePageStack.navigationOptions = {
  tabBarLabel: "GPHome",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-options" : "md-options"}
    />
  )
};

const CalendarStack = createStackNavigator({
  CalendarPage: CalendarPageScreen
});

CalendarStack.navigationOptions = {
  tabBarLabel: "Calendar",
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

const LoginStack = createStackNavigator({
  Login: LoginScreen
});

LoginStack.navigationOptions = {
  tabBarLabel: "Login",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-link" : "md-link"}
    />
  )
};

const TreatmentStack = createStackNavigator({
  Treatment: LinksScreen
});

TreatmentStack.navigationOptions = {
  tabBarLabel: "Plan",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-link" : "md-link"}
    />
  )
};

const LinksStack = createStackNavigator({
  Links: LinksScreen
});

LinksStack.navigationOptions = {
  tabBarLabel: "Analytics",
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

export default createBottomTabNavigator({
  HomePageStack,
  AilmentNotesStack,
  TreatmentStack,
  LoginStack,
  LinksStack,
  SettingsStack,
  GPHomePageStack,
  CalendarStack
});
