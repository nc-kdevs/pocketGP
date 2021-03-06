import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import ChatScreen from "../screens/ChatScreen";
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
          ? "ios-add-circle-outline"
          : "md-add-circle-outline"
      }
    />
  )
};

const ChatStack = createStackNavigator({
  Chat: ChatScreen
});

ChatStack.navigationOptions = {
  tabBarLabel: "GP Chat",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-people" : "md-people"}
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
  tabBarLabel: "Analytics",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-barcode" : "md-barcode"}
    />
  )
};

export default createBottomTabNavigator({
  HomePageStack,
  AilmentNotesStack,
  AnalyticsStack,
  ChatStack,
  SettingsStack
});
