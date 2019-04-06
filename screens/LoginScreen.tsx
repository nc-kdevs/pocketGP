import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';
import { WebBrowser } from 'expo';
import t from 'tcomb-form-native';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

          <Text style={styles.mainHeaderText}>Pocket GP</Text>
          
          <View style={styles.logoContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/logo.png')
                  : require('../assets/images/logo.png')
              }
              style={styles.logoImage}
            />
          </View>

          <View style={styles.formContainer}>
            <Form
              type={User}
              ref={c => this._form = c}
              options={options}
            />
            <Button
              title="Sign In"
              onPress={this.handleSubmit}
            />
          </View>

          <Text style={styles.text}>Or</Text>

          <View style={styles.helpContainer}>
            <TouchableOpacity onPress={this._handleHelpPress} style={styles.helpLink}>
              <Text style={styles.helpLinkText}>SIGN UP</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

      </View>
    );
  }

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };

  handleSubmit = () => {
    // use ref to get the form value
    const value = this._form.getValue();
    console.log('value: ', value);  
  }
}

const User = t.struct({
  username: t.String,
  password: t.String,
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
    marginTop: 50,
  },
  contentContainer: {
    paddingTop: 30,
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
