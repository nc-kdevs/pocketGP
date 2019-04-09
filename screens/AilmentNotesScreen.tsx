import React from 'react';
import { Text, View, TouchableOpacity, Button, Image, StyleSheet, ScrollView, KeyboardAvoidingViewBase } from 'react-native';
import { Camera, Permissions } from 'expo';
import t from "tcomb-form-native";
import axios from 'axios';

// axios.defaults.baseURL = 'https://pocket-gp.herokuapp.com/api';

export default class AilmentNotes extends React.Component {
  state = {
    image: null,
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission, image } = this.state;
    console.log(image)
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
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
                type={AilmentForm}
                ref={(patchSetting: object) => (this._form = patchSetting)}
                options={options}
              />
              <Text style={styles.cameraText}>If your ailment is visual, please use the camera below.</Text>
              <Text style={styles.cameraText}>This will help keep you GP up to date with how the ailment is progressing</Text>
              {image
                ? <View>
                  <Image source={{ uri: image }} style={styles.camera} />
                  <TouchableOpacity
                    style={{
                      alignItems: 'center',
                    }}
                    onPress={() => this.cancelSnap()}
                  >
                    <Image source={require("../assets/images/camera-cancel-icon.png")} style={styles.cancelCameraImage} />
                  </TouchableOpacity>
                </View>
                : <View><Camera
                  ref={(cam) => this.camera = cam}
                  style={styles.camera}
                  aspect={this.state.type}
                />
                  <TouchableOpacity
                    style={{
                      alignItems: 'center',
                    }}
                    onPress={() => this.snapPhoto()}
                  >
                    <Image source={require("../assets/images/camera-icon.png")} style={styles.cameraImage} />
                  </TouchableOpacity>
                </View>}
              <Button title="Submit Changes" onPress={this.handleSubmit} />
            </View>
          </ScrollView>
        </View>
      );
    }
  }

  handleSubmit = () => {
    const { image } = this.state;
    // use ref to get the form value
    const value = this._form.getValue();
    console.log("value: ", value);
    const ailmentObj = {
      image,
      // patient_username: 'KDEVS',
      ailment_type: value.type,
      ailment_name: value.name,
      ailment_description: value.description,
      prescription: value.prescription,
      treatment_plan: value.treatment,
    };
    console.log(ailmentObj)
    return axios
    .post('https://pocket-gp.herokuapp.com/api/patients/KDEVS/ailments', ailmentObj)
    .then(({ data }) => console.log(data, '<-- data'))
    .catch(err => console.log(err, '<-- error'))
  };

  cancelSnap = () => {
    this.setState({ image: null })
  }

  snapPhoto = () => {
    if (this.camera) {
      const options = {
        quality: 1, base64: true, fixOrientation: true,
        exif: true
      };
      this.camera.takePictureAsync(options)
        .then(photo => {
          photo.exif.Orientation = 1;
          this.setState({ image: photo.uri });
        })
    }
  }
}

const AilmentForm = t.struct({
  type: t.String,
  name: t.String,
  description: t.String,
  prescription: t.maybe(t.String),
  treatment: t.maybe(t.String)
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
    type: {
      error: "Please give type of ailment (e.g rash, bruise, cough...)"
    },
    name: {
      error: "Please give name of ailment, if unknown please put 'unknown'"
    },
    description: {
      error: "a short description of how you feel"
    }
  },
  stylesheet: formStyles
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  camera: {
    flex: 1,
    height: 200,
    margin: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraText: {
    textAlign: 'center'
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
  cameraImage: {
    marginBottom: 10,
    padding: 0,
    height: 50,
    width: 50
  },
  cancelCameraImage: {
    justifyContent: 'center',
    height: 50,
    width: 50
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