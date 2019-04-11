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
    isPatient: false,
    isIncorrectPassword: false,
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
            {this.state.isIncorrectPassword && <Text style={styles.incorrectPassword}>Incorrect Password</Text>}
            <Form
              type={User}
              ref={(patchSetting: object) => (this._form = patchSetting)}
              options={options}
            />
            <Button title="Submit Changes" onPress={() => {
              const value = this._form.getValue();
              if (value) this.handleSubmit(value)
              else this.setState({ isIncorrectPassword: false })
            }} />
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

  handleSubmit = (value: object) => {
    console.log("value: ", value);
    if (value.password === 'PocketGP') {
      console.log('do patch request')
      this.setState({ isIncorrectPassword: false })
    }
    else this.setState({ isIncorrectPassword: true })
  };
}

const User = t.struct({
  password: t.String,
  firstname: t.maybe(t.String),
  surname: t.maybe(t.String),
  surgery: t.maybe(t.String),
  telephone: t.maybe(t.String),
  email: t.maybe(t.String),
  "address Line 1": t.maybe(t.String),
  "address Line 2": t.maybe(t.String),
  "address Town": t.maybe(t.String),
  "post Code": t.maybe(t.String),
  emergencyContact: t.maybe(t.String),
  surgeryName: t.maybe(t.String)
});

const Surgery = t.struct({
  password: t.String,
  name: t.maybe(t.String),
  "address Line 1": t.maybe(t.String),
  "address Line 2": t.maybe(t.String),
  "address Town": t.maybe(t.String),
  "post Code": t.maybe(t.String)
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
  },
  textInput: {
    normal: {
      borderColor: 'blue'
    }
  }
};

const options = {
  fields: {
    password: {
      password: true,
      secureTextEntry: true,
      error: "Password Required To Make Changes"
    },
  },
  stylesheet: formStyles,
  auto: 'placeholders'
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
  incorrectPassword: {
    fontSize: 16,
    color: "#8B0000",
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
