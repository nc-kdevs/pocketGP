import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  TouchableHighlight
} from "react-native";
import Navlinks from "./Navlinks";

export interface HeaderState {
  modalVisible: boolean;
}

class Header extends Component<null, HeaderState> {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
  }

  setModalVisible = () => {
    console.log(this.state.modalVisible);
    this.setState({
      modalVisible: !this.state.modalVisible
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container1}>
          <Image
            style={styles.logo}
            source={{
              uri:
                "https://facebook.github.io/react-native/docs/assets/favicon.png"
            }}
          />
        </View>
        <View style={styles.container2}>
          <Image
            style={styles.notification}
            source={{
              uri:
                "https://facebook.github.io/react-native/docs/assets/favicon.png"
            }}
          />
          <TouchableOpacity
            style={styles.HBcontainer}
            onPress={() => this.setModalVisible()}
          >
            <TouchableHighlight>
              <Image
                style={styles.hamburger}
                source={{
                  uri:
                    "https://image.shutterstock.com/image-vector/burger-menu-web-icon-vector-450w-1077487118.jpg"
                }}
              />
            </TouchableHighlight>
          </TouchableOpacity>
        </View>
        <Navlinks
          modalVisible={this.state.modalVisible}
          setModalVisible={this.setModalVisible}
        />
      </View>
    );
  }
}

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    height: 104,
    flexDirection: "row"
  },
  container1: {
    alignItems: "flex-start",
    flexDirection: "row"
  },
  container2: {
    alignItems: "flex-end",
    flexDirection: "row",
    marginLeft: 200,
    marginBottom: 30
  },
  logo: {
    width: 80,
    height: 80
  },
  notification: {
    width: 50,
    height: 50,
    marginRight: 15
  },
  hamburger: {
    width: 50,
    height: 50,
    position: "absolute"
  },
  HBcontainer: {
    marginTop: 50,
    height: 50,
    width: 50
  }
});
