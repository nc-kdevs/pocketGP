import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { getUserByUsername } from '../assets/utils.js';
import Main from '../components/Main.js';

export default class HomePageScreen extends React.Component {
  static navigationOptions = {
    header: null,
    title: 'homePage',
  };

  state = {
    isLoggedIn: true,
    user: {},
  };

  render() {
    console.log(this.state.isLoggedIn, this.state.user);
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        />
        <Main user={this.state.user} />
      </View>
    );
  }

  handleSignIn = (value: Object) => {
    const username = value.username;
    const password = value.password;
    getUserByUsername(username).then((patient: Object) => {
      if (patient.patient_password === password) {
        this.setState({ user: patient, isLoggedin: true });
      }
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    flexWrap: 'wrap',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  contentContainer: {
    paddingTop: 30,
    alignItems: 'center',
  },
  logoContainer: {
    marginTop: 0,
    padding: 10,
    marginBottom: 10,
    borderBottomWidth: 3,
    borderColor: 'rgba(61,176,215,0.2)',
  },
  logoImage: {
    position: 'absolute',
    top: 0,
    width: 40,
    height: 50,
    resizeMode: 'center',
    marginLeft: 20,
  },
  mainHeaderText: {
    fontSize: 36,
    color: 'rgba(0, 0, 0, 1)',
    lineHeight: 48,
    textAlign: 'right',
    marginRight: 20,
  },
  button: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 150,
    backgroundColor: '#00BFFF',
    borderRadius: 80,
    overflow: 'hidden',
    margin: 20,
  },
  imageContainer: {
    height: 150,
    width: 50,
    marginRight: 120,
  },
  image: {
    height: 150,
    width: 50,
    backgroundColor: 'white',
  },
  innertext: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
    fontSize: 20,
  },
  textContainer: {
    paddingLeft: 30,
    position: 'absolute',
    flexWrap: 'wrap',
    width: 150,
  },
});
