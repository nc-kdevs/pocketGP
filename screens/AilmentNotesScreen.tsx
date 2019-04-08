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
       const options = { quality: 1, base64: true, fixOrientation: true,
       exif: true};
       await this.camera.takePictureAsync(options).then(photo => {
          photo.exif.Orientation = 1;
           });
    }
  }
}
