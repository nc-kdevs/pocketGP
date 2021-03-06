import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  Image,
  KeyboardAvoidingView
} from "react-native";
import Chat from "../components/Chat.js";
import { YellowBox } from "react-native";
import _ from "lodash";

YellowBox.ignoreWarnings(["Setting a timer"]);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};

class Main extends Component {
  static navigationOptions = {
    title: "Chat",
    header: null
  };

  state = {
    name: "KDEVS",
    toggleChat: false,
    backPressed: false
  };

  onPress = () => {
    this.state.name
      ? this.setState({ toggleChat: false })
      : this.setState({ toggleChat: true });
  };

  onChangeText = name =>
    (this.state.patient = this.setState({ name, patient: false }));

  render() {
    // const { navigation } = this.props;
    // const username = navigation.getParam('user', '');
    // console.log(username)
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {this.state.toggleChat ? (
          <View>
            <View style={styles.logoContainer}>
              <Image
                source={require("../assets/images/logo.png")}
                style={styles.logoImage}
              />
              <Text style={styles.mainHeaderText}>Pocket GP</Text>
            </View>
            <Text style={styles.title}>Confirm your name:</Text>
            {this.state.name ? (
              <Text style={styles.emergencyText}>
                This is for Emergency Use Only!
              </Text>
            ) : null}
            <TextInput
              style={styles.nameInput}
              placeHolder="Full Name"
              selectionColor="black"
              onChangeText={this.onChangeText}
              value={this.state.name}
            />
              <Button title='CONTINUE'onPress={this.onPress} style={styles.buttonText}/>
          </View>
        ) : (
            <Chat name={this.state.name} />
          )}
      </KeyboardAvoidingView>
    );
  }
}

const offset = 20;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%"
  },
  title: {
    margin: offset,
    paddingTop: offset,
    fontSize: offset,
    textAlign: "center",
    color: "#00BFFF",
    textDecorationColor: "rgba(61,176,215,0.2)"
  },
  nameInput: {
    fontSize: offset,
    height: offset * 2,
    margin: offset,
    paddingHorizontal: offset,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 1,
    borderRadius: 5,
    color: "rgba(96,100,109, 0.8)"
  },
  buttonText: {
    marginLeft: offset * 3,
    marginRight: offset * 3,
    textAlign: "center",
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
  emergencyText: {
    marginLeft: offset * 3,
    marginRight: offset * 3,
    borderColor: "rgba(0,0,0,0.2)",
    borderRadius: 5,
    borderWidth: 1,
    textAlign: "center",
    fontSize: offset,
    backgroundColor: "white",
    color: "red"
  }
});

export default Main;
