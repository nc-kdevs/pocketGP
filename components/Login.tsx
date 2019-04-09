import React, { Component } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';
import t from 'tcomb-form-native';

export default class LoginScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    isNewUser: false,
  }

  render() {
    console.log('hello there')
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
            <Button
              title="Join"
              onPress={this.handleSignUp}
            />
          </View>
            : <View style={styles.formContainer}>
            <Form
              type={User}
              ref={(login: object) => this._form = login}
              options={options}
            />
            <Button
              title="Sign In"
              onPress={this.handleSignIn}
            />
            <Text style={styles.text}>Or</Text>
            <View style={styles.helpContainer}>
              <TouchableOpacity onPress={this.toggleSignUp} style={styles.helpLink}>
                <Text style={styles.helpLinkText}>SIGN UP</Text>
              </TouchableOpacity>
            </View>
          </View>}
          
        </ScrollView>

      </View>
    );
  }

  toggleSignUp = () => {
    this.setState({ isNewUser: true })
  };

  handleSignIn = () => {
    // use ref to get the form value
    const value = this._form.getValue();
    console.log('value: ', value);  
  }

  handleSignUp = () => {
    // use ref to get the form value
    const value = this._form.getValue();
    console.log('value: ', value);  
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
      error: 'Please Try Again'
    },
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 10,
    
  },
  contentContainer: {
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
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
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 16,
    color: '#00BFFF',
  },
});
