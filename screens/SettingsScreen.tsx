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
import axios from 'axios';

export default class SettingsScreen extends Component {
  static navigationOptions = {
    header: null,
    title: "Settings"
  };

  state = {
    isPatient: true,
    isLoggedIn: false,
    // user: {},
    // for testing
    user: {
      patient_username: 'snuffles3',
      patient_password: 'password2',
      first_name: 'chauncey',
      surname: 'von snuffles',
      telephone: '07987777790',
      email: 'chaunceyvonsnufflesthethird@guildwars.co.uk',
      address: '9 lions arch/divinitys reach/prestwich/M8 2CS',
      surgery_id: 1,
      emerg_contact: '01268930298',
      general_med: 'stress valium migraines'
    },
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
              if (value) this.handlePatientSubmit(value)
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
            <Button title="Submit Changes" onPress={() => {
              const value = this._form.getValue();
              if (value) this.handleSurgerySubmit(value)
              else this.setState({ isIncorrectPassword: false })
            }} />
          </View>
        </ScrollView>
      </View>
    );
  }

  handleSurgerySubmit = (value) => {
    if (value.password === 'cats4ever') {
      const updatedSurgery = {
        surgery_name: value.name,
        surgery_address: `${value["address Line 1"]}/${value["address Line 2"]}/${value["address Town"]}/${value["post Code"]}`
      }
      return axios
      .patch('https://pocket-gp.herokuapp.com/api/surgeries/1', updatedSurgery)
      .then(() => {
        this.setState({ isIncorrectPassword: false })
      })
      .catch(err => console.log(err, '<-- BE error'))
    }
    else this.setState({ isIncorrectPassword: true })
  };

  handlePatientSubmit = (value) => {
    if (value.password === this.state.user.patient_password) {
      const updatedPatient = {
        first_name: value.firstname,
        surname: value.surname,
        telephone: value.telephone,
        email: value.email,
        address: `${value["address Line 1"]}/${value["address Line 2"]}/${value["address Town"]}/${value["post Code"]}`,
        surgery_id: +value.surgery,
        emerg_contact: value.emergencyContact,
      }
      return axios
      .patch(`https://pocket-gp.herokuapp.com/api/patients/${user.username}`, updatedPatient)
      .then(() => {
        this.setState({ isIncorrectPassword: false })
      })
      .catch(err => console.log(err, '<-- BE error'))
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
