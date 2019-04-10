import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Button,
  Image,
  StyleSheet,
  ScrollView
} from "react-native";
import { Camera, Permissions } from "expo";
import t from "tcomb-form-native";
import axios from "axios";

export default class AilmentNotes extends React.Component {
  static navigationOptions = {
    header: null,
    title: "ailmentNotes"
  };

  state = {
    image: null,
    imageURL: null,
    hasCameraPermission: null,
    type: Camera.Constants.Type.back
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  render() {
    const { hasCameraPermission, image } = this.state;
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
              <Text style={styles.cameraText}>
                If your ailment is visual, please use the camera below.
              </Text>
              <Text style={styles.cameraText}>
                This will help keep you GP up to date with how the ailment is
                progressing
              </Text>
              {image ? (
                <View>
                  <Image source={{ uri: image }} style={styles.camera} />
                  <TouchableOpacity
                    style={{
                      alignItems: "center"
                    }}
                    onPress={() => this.cancelSnap()}
                  >
                    <Image
                      source={require("../assets/images/camera-cancel-icon.png")}
                      style={styles.cancelCameraImage}
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                <View>
                  <Camera
                    ref={cam => (this.camera = cam)}
                    style={styles.camera}
                    aspect={this.state.type}
                  />
                  <TouchableOpacity
                    style={{
                      alignItems: "center"
                    }}
                    onPress={() => this.snapPhoto()}
                  >
                    <Image
                      source={require("../assets/images/camera-icon.png")}
                      style={styles.cameraImage}
                    />
                  </TouchableOpacity>
                </View>
              )}
              <Form
                type={AilmentForm}
                ref={(patchSetting: object) => (this._form = patchSetting)}
                options={options}
              />
              <Button
                title="Submit Changes"
                onPress={() => {
                  const value = this._form.getValue();
                  if (value) this.handleSubmit(value);
                }}
              />
            </View>
          </ScrollView>
        </View>
      );
    }
  }

  // imgur stable baseURL: https://api.imgur.com/3/

  //   For accessing a user's account, please visit the OAuth2 section of the docs. OAuth Endpoints To access OAuth, the following endpoints must be used:

  // https://api.imgur.com/oauth2/addclient
  // https://api.imgur.com/oauth2/authorize
  // https://api.imgur.com/oauth2/token
  // You can also verify your OAuth 2.0 tokens by setting your header and visiting the page

  // https://api.imgur.com/oauth2/secret

  // Client ID - c6f21ab825b2cc5
  // Client Secret - 9d810a5a3b5a686ab332a445e4e6e9dce517d5d4

  // post request URL: https://api.imgur.com/3/upload
  // url is on data.link (type: string)
  // POST "https://api.imgur.com/3/image" \
  //   --header "Authorization: Client-ID {{clientId}}" \
  //   --form "image=R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"

  handleSubmit = (value: Object) => {
    const { image } = this.state;
    if (image) {
      return (
        axios
          .post(
            "https://api.imgur.com/3/image",
            { image: image },
            {
              headers: {
                Authorization: "Client-ID {c6f21ab825b2cc5}"
              }
            }
          )
          // .post('https://api.imgur.com/3/image', image)
          .then(({ data }) => console.log(data))
          .catch(err => console.log(err, "<-- imgur error"))
      );
    }
    // const ailmentObj = {
    //   image: `${image}`,
    //   ailment_type: value.type,
    //   ailment_name: value.name,
    //   ailment_description: value.description,
    //   prescription: value.prescription,
    //   treatment_plan: value.treatment
    // };
    // console.log(ailmentObj)
    // return axios
    // .post('https://pocket-gp.herokuapp.com/api/patients/spike/ailments', ailmentObj)
    // .then(({ data }) => {
    //   console.log(data, '<-- data')
    //   this.setState({ image: null })
    // })
    // .catch(err => console.log(err, '<-- BE error'))
  };

  cancelSnap = () => {
    this.setState({ image: null });
  };

  snapPhoto = () => {
    if (this.camera) {
      const options = {
        quality: 1,
        base64: true,
        fixOrientation: true,
        exif: true
      };
      this.camera.takePictureAsync(options).then(photo => {
        photo.exif.Orientation = 1;
        this.setState({ image: photo.uri });
      });
    }
  };
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
  stylesheet: formStyles,
  auto: "placeholders"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  camera: {
    flex: 1,
    height: 200,
    margin: 0,
    alignItems: "center",
    justifyContent: "center"
  },
  cameraText: {
    textAlign: "center"
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
    justifyContent: "center",
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
