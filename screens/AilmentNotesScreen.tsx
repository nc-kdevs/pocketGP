import React from 'react';
import { Text, View, TouchableOpacity, Button, Image, StyleSheet, ScrollView } from 'react-native';
import { Camera, Permissions, ImagePicker } from 'expo';

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
          </ScrollView>
        </View>
      );
    }
  }

  cancelSnap = () => {
    this.setState({ image: null })
  }

  snapPhoto = () => {
    if (this.camera) {
       const options = { quality: 1, base64: true, fixOrientation: true,
       exif: true};
       this.camera.takePictureAsync(options)
        .then(photo => {
          photo.exif.Orientation = 1;
          this.setState({ image: photo.uri });
        });
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  camera: {
    flex: 1,
    height: 200,
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
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
