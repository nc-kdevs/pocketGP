import React from "react";
import {
  Platform,
  StyleSheet,
  Button,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Text,
  View,
  RecyclerViewBackedScrollView
} from "react-native";
import { WebBrowser } from "expo";
import Header from "../components/Header";

export default class HomePageScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  navigate = () => {};

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigate("Home")}
          >
            <TouchableHighlight style={styles.imageContainer}>
              <Image style={styles.image} source={{}} />
            </TouchableHighlight>
            <View style={styles.textContainer}>
              <Text style={styles.innertext}>Ailment Notes</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigate("Home")}
          >
            <TouchableHighlight style={styles.imageContainer}>
              <Image style={styles.image} source={{}} />
            </TouchableHighlight>
            <View style={styles.textContainer}>
              <Text style={styles.innertext}>Analytics</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigate("Home")}
          >
            <TouchableHighlight style={styles.imageContainer}>
              <Image style={styles.image} source={{}} />
            </TouchableHighlight>
            <View style={styles.textContainer}>
              <Text style={styles.innertext}>Treatment Plan</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigate("Home")}
          >
            <TouchableHighlight style={styles.imageContainer}>
              <Image style={styles.image} source={{}} />
            </TouchableHighlight>
            <View style={styles.textContainer}>
              <Text style={styles.innertext}>Account Settings</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  onPressLearnMore = () => {};
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    flexWrap: "wrap"
  },
  content: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "rgba(61,176,215,0.1)",
    overflow: "hidden",
    borderTopWidth: 3,
    borderColor: "rgba(61,176,215,0.2)"
  },
  button: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 160,
    height: 200,
    backgroundColor: "rgba(184,76,53,1)",
    borderRadius: 80,
    overflow: "hidden",
    margin: 20
  },
  imageContainer: {
    height: 200,
    width: 50,
    marginRight: 120
  },
  image: {
    height: 200,
    width: 50,
    backgroundColor: "white"
  },
  innertext: {
    textAlign: "center",
    textAlignVertical: "center",
    color: "white",
    fontSize: 20
  },
  textContainer: {
    paddingLeft: 30,
    position: "absolute",
    flexWrap: "wrap",
    width: 150
  }
});
