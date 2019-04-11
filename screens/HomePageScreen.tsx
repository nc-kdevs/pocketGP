import React from "react";
import { StyleSheet, View, ScrollView, Image, Text, Button } from "react-native";
import LoginScreen from "../components/Login";
import { getUserByUsername, getSurgeryByUsername, localNotification, schedulingOptions } from "../assets/utils.js";
import PatientHome from "../components/PatientHome";
import GPHomePageScreen from "./GPHomePageScreen";
import { Permissions, Constants, Notifications } from "expo";

export default class HomePageScreen extends React.Component {
  static navigationOptions = {
    header: null,
    title: "homePage"
  };

  state = {
    isPatient: false,
    isLoggedIn: false,
    user: {}
  };

  async componentDidMount() {
    let result = await
      Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (Constants.lisDevice && result.status === 'granted') {
      console.log('Notification permissions granted.')
    }
  }

  render() {
    const navigate = this.props.navigation;
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          {/* <Button
          title="TEST"
          onPress={this.testNotifications}
        /> */}
          {this.state.isLoggedIn && <View style={styles.logoContainer}>
            <Image
              source={require("../assets/images/logo.png")}
              style={styles.logoImage}
            />
            <Text style={styles.mainHeaderText}>Pocket GP</Text>
          </View>}
          {this.state.isLoggedIn
            ? ((this.state.isPatient)
              ? <PatientHome navigate={navigate} />
              : <View style={styles.center}><GPHomePageScreen /></View>)
            : <View style={styles.center}><LoginScreen
              signIn={this.handleSignIn} /></View>}

        </ScrollView>
      </View>
    );
  }

  testNotifications = () => {
    Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions);
  }

  handleSignIn = (value: Object) => {
    const username = value.username;
    const password = value.password;
    getUserByUsername(username)
      .then((newPatient: Object) => {
        if (newPatient.patient_password === password) {
          this.setState({
            user: newPatient,
            isLoggedIn: true,
            isPatient: true
          });
        }
      })
      .catch(() => "sorry, not found");
    getSurgeryByUsername(username)
      .then((newSurgery: Object) => {
        if (newSurgery.surgery_password === password) {
          this.setState({
            user: newSurgery,
            isLoggedIn: true,
            isPatient: false
          });
        }
      })
      .catch(() => "sorry, not found");
  };
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    flexWrap: "wrap",
    textAlign: "center"
  },
  content: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "white",
    overflow: "hidden"
  },
  contentContainer: {
    paddingTop: 30,
  },
  center: {
    width: "100%",
    height: "100%",
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
