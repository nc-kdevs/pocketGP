import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Text,
  View,
  ScrollView
} from "react-native";
import Header from "../components/Header";
import LoginScreen from "../components/Login";

export default class HomePageScreen extends React.Component {
  static navigationOptions = {
    header: null,
    title: "homePage"
  };

  state = {
    isLoggedIn: true,
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
      <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
      {this.state.isLoggedIn
      ? <View>  
        <View style={styles.logoContainer}>
            <Image
              source={require("../assets/images/logo.png")}
              style={styles.logoImage}
            />
            <Text style={styles.mainHeaderText}>Pocket GP</Text>
          </View>
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigate("AilmentNotes");
            }}
          >
            <TouchableHighlight style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{
                  uri:
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWhCyDCBjeUbP6E6XtDZqiU6P5mK8BntDB1OpFoI5YqwMeBsHt"
                }}
              />
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
              <Image
                style={styles.image}
                source={{
                  uri:
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6-c6GABdTIfS6Rm1EIZdB8FlyGomnbrYSKNRKHvns2S9WVQroKQ"
                }}
              />
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
              <Image
                style={styles.image}
                source={{
                  uri:
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_BoyG4HqSBqLQjOyCDi5iJZ8o3jNPXBsd9ckzt07oHtJVLrp6"
                }}
              />
            </TouchableHighlight>
            <View style={styles.textContainer}>
              <Text style={styles.innertext}>Treatment Plan</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigate("Settings")}
          >
            <TouchableHighlight style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{
                  uri:
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM3QB7ooA8Iaf7soYlCuYcoDSo4liUaJ5YGpP0JoG3pbm3pnO4xA"
                }}
              />
            </TouchableHighlight>
            <View style={styles.textContainer}>
              <Text style={styles.innertext}>Account Settings</Text>
            </View>
          </TouchableOpacity>
          </View>
          </View>
          : <LoginScreen />}
        </ScrollView>
      </View>
    );
  }

  onPressLearnMore = () => {};
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    flexWrap: "wrap",
    textAlign: 'center'
  },
  content: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "white",
    overflow: "hidden",
  },
  contentContainer: {
    paddingTop: 30,
    alignItems: 'center'
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
  button: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 120,
    height: 150,
    backgroundColor: "#00BFFF",
    borderRadius: 80,
    overflow: "hidden",
    margin: 20
  },
  imageContainer: {
    height: 150,
    width: 50,
    marginRight: 120
  },
  image: {
    height: 150,
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
