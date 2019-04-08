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
import Notifications from "./Notifications";

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
              uri: "http://i68.tinypic.com/ofy07b.png"
            }}
          />
        </View>
        <View style={styles.container2}>
          <Image
            style={styles.notification}
            source={{
              uri: "http://cdn.onlinewebfonts.com/svg/img_160048.png"
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
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW4CSfVQBlv7B0_kSE9_z_v6vg-kmGeYk6KOys3Nke_eB32mXhhw"
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
    flexDirection: "row",
    backgroundColor: "grey"
  },
  container1: {
    alignItems: "flex-start",
    flexDirection: "row"
  },
  container2: {
    alignItems: "flex-end",
    flexDirection: "row",
    marginLeft: 230,
    marginBottom: 30
  },
  logo: {
    width: 50,
    height: 50
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
