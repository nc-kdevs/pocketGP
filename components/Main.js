import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image
} from "react-native";
import Chat from "../components/Chat.js";

class Main extends Component {
  static navigationOptions = {
    title: "Chat",
    header: null
  };

  state = {
    name: "",
    toggleChat: true
  };

  onPress = () => {
    this.state.toggleChat
      ? this.setState({ toggleChat: false })
      : this.setState({ toggleChat: true });
  };

  onChangeText = name => this.setState({ name });

  render() {
    return (
      <View style={styles.container}>
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
            <TextInput
              style={styles.nameInput}
              placeHolder="Full Name"
              selectionColor="black"
              onChangeText={this.onChangeText}
              value={this.state.name}
            />
            <TouchableOpacity onPress={this.onPress}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Chat name={this.state.name} />
        )}
      </View>
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
    borderColor: "rgba(0,0,0,0.2)",
    borderRadius: 5,
    borderWidth: 1,
    textAlign: "center",
    fontSize: offset,
    color: "#00BFFF"
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
  }
});

export default Main;
