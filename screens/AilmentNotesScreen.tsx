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
import Camera from 'react-native-camera';

export default class AilmentNotesScreen extends Component {
  static navigationOptions = {
    header: null,
    title: "AilmentNotes"
  };

  render() {
    return <View style={styles.container}>
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
            <Camera
              ref={cam => {this.camera = cam}}
              // style={styles.preview}
              aspect={Camera.constants.Aspect.fill}
            >
              <Text style={styles.capture} onPress={this.takePicture.bind(this)}>
                [CAPTURE]
              </Text>
            </Camera>
            <Form
              type={User}
              ref={(patchSetting: object) => (this._form = patchSetting)}
              options={options}
            />
            <Button title="Submit" onPress={this.handleSubmit} />
          </View>
        </ScrollView>
      </View>
  }

  takePicture = () => {
    this.camera
      .capture()
      .then((data) => console.log(data))
      .catch(err => console.error(err));
  }

  handleSubmit = () => {
    const value = this._form.getValue();
  };
}

const User = t.struct({
  'ailment description': t.maybe(t.String),
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
  stylesheet: formStyles
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 50
  },
  contentContainer: {
    paddingTop: 30
  },
  logoContainer: {
    marginTop: 20,
    marginBottom: 20
  },
  formContainer: {
    justifyContent: "center",
    marginTop: 10,
    padding: 10
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
