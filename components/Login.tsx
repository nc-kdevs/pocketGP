import React, { Component } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import t from 'tcomb-form-native';
import axios from 'axios';

export default class LoginScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    isNewUser: false,
  }

  render() {
    const { signIn } = this.props;
    console.log(this.props)
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

          <Text style={styles.mainHeaderText}>Pocket GP</Text>
          
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/images/logo.png')}
              style={styles.logoImage}
            />
          </View>

          {this.state.isNewUser
            ? <View style={styles.formContainer}>
            <Form
              type={SignUp}
              ref={(signUp: object) => this._form = signUp}
              options={options}
            />
            <View style={styles.sideBySide}><Button
              title="JOIN"
              onPress={this.handleSignUp}
            />
            <Button
              title="CANCEL"
              onPress={this.toggleSignUp}
            /></View>
          </View>
            : <View style={styles.formContainer}>
            <Form
              type={User}
              ref={(login: object) => this._form = login}
              options={options}
            />
            <Button
              title="SIGN IN"
              onPress={() => {
                const value = this._form.getValue()
                if (value) signIn(value)
              }}
            />
            <Text style={styles.text}>Or</Text>
            <View style={styles.helpContainer}>
            <Button
              title="JOIN"
              onPress={this.toggleSignUp}
            />
            </View>
          </View>}
          
        </ScrollView>

      </View>
    );
  }

  toggleSignUp = () => {
    if (this.state.isNewUser) this.setState({ isNewUser: false })
    else this.setState({ isNewUser: true })
  };

  handleSignUp = () => {
    // use ref to get the form value
    const value = this._form.getValue();
    console.log('value: ', value);
    const newPatient = {
      patient_username: value.username,
      patient_password: value.password,
      first_name: value.firstname,
      surname: value.surname,
      telephone: value.telephone,
      email: value.email,
      address: `${value["address Line 1"]}/${value["address Line 2"]}/${value["address Town"]}/${value["post Code"]}`,
      surgery_id: +value.surgery,
      emerg_contact: value.emergencyContact,
      general_med: value["general medical history"]
    }
    return axios
    .post('https://pocket-gp.herokuapp.com/api/patients', newPatient)
    .then(({ data }) => {
      this.setState({ isNewUser: true })
      this.props.navigation.navigate('Home', {
        user: newPatient
      });
    })
    .catch(err => console.log(err, '<-- BE error'))
  }

}

const User = t.struct({
  username: t.String,
  password: t.String,
});
const SignUp = t.struct({
  username: t.String,
  password: t.String,
  firstname: t.String,
  surname: t.String,
  surgery: t.String,
  telephone: t.String,
  email: t.String,
  'address Line 1': t.String,
  'address Line 2': t.maybe(t.String),
  'address Town': t.String,
  'post Code': t.String,
  emergencyContact: t.String,
  'general medical history': t.maybe(t.String),
});

const Form = t.form.Form;

const options = {
  fields: {
    username: {
      error: 'Please Try Again'
    },
    password: {
      password: true,
      secureTextEntry: true,
      error: 'Please Try Again'
    },
  },
  auto: 'placeholders'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 0,
    
  },
  contentContainer: {
    paddingTop: 10,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 0,
  },
  formContainer: {
    justifyContent: 'center',
    marginTop: 10,
    padding: 10,
    width: 250,
    backgroundColor: '#ffffff',
  },
  logoImage: {
    width: 200,
    height: 250,
    resizeMode: 'center',
  },
  mainHeaderText: {
    fontSize: 36,
    color: 'rgba(0, 0, 0, 1)',
    lineHeight: 48,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: 'rgba(0, 0, 0, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  helpContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  helpLink: {
    paddingTop: 0,
    paddingBottom: 40,
    margin: 0,
  },
  helpLinkText: {
    fontSize: 16,
    color: '#00BFFF',
  },
  sideBySide: {
    flexDirection: "row",
    justifyContent: 'space-around'
  }
});
