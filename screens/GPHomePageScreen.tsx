import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View,
  TextInput,
  Image,
  Text,
  Button,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  Alert,
  ScrollView,
  ListView
} from "react-native";
import AgendaScreen from "../components/Agenda";
import { Calendar } from "react-native-calendars";

export default class GPHomePageScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0
    };
  }

  onDayPress = day => {
    this.setState({
      selected: day.dateString
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.logoImage}
          />
          <Text style={styles.mainHeaderText}>Pocket GP</Text>
        </View>
        <View style={styles.MainContainer}>
          <TextInput
            style={styles.TextInputStyleClass}
            underlineColorAndroid="transparent"
            placeholder={"Surgery Information Will Go Here."}
            placeholderTextColor={"#9E9E9E"}
            numberOfLines={10}
            multiline={true}
          />
        </View>
        <View style={styles.calendarContainer}>
          <AgendaScreen />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    // flex: 1,
    paddingTop: Platform.OS === "ios" ? 20 : 0,
    margin: 10,
    marginTop: 15,
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
    marginTop: 30,
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
    height: 100
  },
  calendarContainer: {
    flex: 2,
    backgroundColor: "gray"
  }
});
