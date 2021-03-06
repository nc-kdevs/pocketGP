import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View
} from "react-native";
import AgendaScreen from "../components/Agenda";

export default class GPHomePageScreen extends Component {
  state = {
    selected: 0
  }

  onDayPress = day => {
    this.setState({
      selected: day.dateString
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.calendarContainer}>
          <AgendaScreen />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    paddingTop: Platform.OS === "ios" ? 20 : 0,
    margin: 0,
    marginTop: 0,
    marginBottom: 0,
    paddingBottom: 10,
    flexDirection: "column",
    flexWrap: "wrap"
  },
  container: {
    flexDirection: "column",
    flex: 1,
    flexWrap: "wrap"
  },
  logoContainer: {
    marginTop: 0,
    padding: 10,
    marginBottom: 10,
    borderBottomWidth: 3,
    borderColor: "rgba(61,176,215,0.2)"
  },
  logoImage: {
    position: "absolute",
    top: 0,
    width: 40,
    height: 50,
    resizeMode: "center",
    marginLeft: 20
  },
  mainHeaderText: {
    fontSize: 36,
    color: "rgba(0, 0, 0, 1)",
    lineHeight: 48,
    textAlign: "right",
    marginRight: 20
  },
  TextInputStyleClass: {
    textAlign: "left",
    height: 40,
    borderWidth: 2,
    borderColor: "#9E9E9E",
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    overflow: 'hidden'
  },
  calendarContainer: {
    flex: 2,
    backgroundColor: "gray"
  }
});
