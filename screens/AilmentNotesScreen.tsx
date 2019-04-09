// import React, { Component } from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import Camera from 'react-native-camera';

// export default class AilmentNotes extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Camera
//         ref={(cam) => {
//           this.camera = cam
//         }}
//         style={styles.view}
//         aspect={Camera.constants.Aspect.fill}
//         >
//           <Text
//           style={styles.capture}
//           onPress={() => this.takePicture()}
//           >
//             [CAPTURE_IMAGE]
//           </Text>
//         </Camera>
//       </View>
//     )
//   }
//   takePicture = () => {
//     const options = {}
//     this.camera.capture({metadata: options})
//     .then(console.log)
//     .catch(console.log)
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'row',
//   },
//   view: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center'
//   },
//   capture: {
//     flex: 0,
//     backgroundColor: 'steelBlue',
//     BorderRadius: 10,
//     color: 'red',
//     padding: 15,
//     margin: 45
//   }
// })

import React from 'react';
import { Text, View, TouchableOpacity, Button, Image } from 'react-native';
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
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={this.state.type}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.snapPhoto();
                }}>
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                  {' '}Take Photo{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </Camera>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
              title="Pick an image from camera roll"
              onPress={this._pickImage}
            />
            {image &&
              <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
          </View>
        </View>
      );
    }
  }
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    console.log(result);
    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  }

  async snapPhoto() {
    console.log('Button Pressed');
    if (this.camera) {
      console.log('Taking photo');
      const options = {
        quality: 1, base64: true, fixOrientation: true,
        exif: true
      };
      await this.camera.takePictureAsync(options).then(photo => {
        photo.exif.Orientation = 1;
      });
    }
  }
}
