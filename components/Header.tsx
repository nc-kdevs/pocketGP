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
    console.log("Hello");
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
          <TouchableOpacity onPress={() => this.setModalVisible}>
            <TouchableHighlight>
              <Image
                source={{
                  uri:
                    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg=="
                }}
              />
            </TouchableHighlight>
            <View>
              <Text>Ailment Notes</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* <Navlinks modalVisible={this.state.modalVisible} /> */}
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
    marginBottom: 30,
    marginLeft: 200
  },
  logo: {
    width: 80,
    height: 80
  },
  notification: {
    width: 50,
    height: 50,
    marginRight: 15
  }
});
