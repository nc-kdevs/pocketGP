import React, { Component } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button
} from "react-native";
import t from "tcomb-form-native";

export default class SettingsScreen extends Component {
  static navigationOptions = {
    header: null,
    title: "Settings"
  };

  state = {
    isPatient: true
  };

  render() {
    const { isPatient } = this.state;
    return isPatient ? (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/images/logo.png")}
              style={styles.logoImage}
            />
            <Text style={styles.mainHeaderText}>Pocket GP</Text>
          </View>
          <View style={styles.formContainer}>
            <Form
              type={User}
              ref={(patchSetting: object) => (this._form = patchSetting)}
              options={options}
            />
            <Button title="Submit Changes" onPress={this.handleSubmit} />
          </View>
        </ScrollView>
      </View>
    ) : (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/images/logo.png")}
              style={styles.logoImage}
            />
            <Text style={styles.mainHeaderText}>Pocket GP</Text>
          </View>
          <View style={styles.formContainer}>
            <Form
              type={Surgery}
              ref={(patchSetting: object) => (this._form = patchSetting)}
              options={options}
            />
            <Button title="Submit Changes" onPress={this.handleSubmit} />
          </View>
        </ScrollView>
      </View>
    );
  }

  handleSubmit = () => {
    // use ref to get the form value
    const value = this._form.getValue();
    console.log("value: ", value);
  };
}

const User = t.struct({
  username: t.String,
  password: t.String,
  firstname: t.String,
  surname: t.String,
  surgery: t.String,
  telephone: t.String,
  email: t.String,
  "address Line 1": t.String,
  "address Line 2": t.maybe(t.String),
  "address Town": t.String,
  "post Code": t.String,
  emergencyContact: t.String,
  surgeryName: t.String
});

const Surgery = t.struct({
  username: t.String,
  password: t.String,
  name: t.String,
  "address Line 1": t.String,
  "address Line 2": t.maybe(t.String),
  "address Town": t.String,
  "post Code": t.String
});

const Form = t.form.Form;

const formStyles = {
  ...Form.stylesheet,
  controlLabel: {
    normal: {
      color: "#000",
      fontSize: 18,
      marginBottom: 7,
      fontWeight: "600"
    },
    error: {
      color: "red",
      fontSize: 18,
      marginBottom: 7,
      fontWeight: "600"
    }
  }
};

const options = {
  fields: {
    username: {
      error: "Username Required To Make Changes"
    },
    password: {
      error: "Password Required To Make Changes"
    }
  },
  stylesheet: formStyles
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    paddingTop: 30
  },
  formContainer: {
    justifyContent: "center",
    marginTop: 10,
    padding: 10
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
  text: {
    fontSize: 16,
    color: "rgba(0, 0, 0, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  helpContainer: {
    marginTop: 10,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 16,
    color: "#00BFFF"
  }
});
