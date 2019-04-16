import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Button,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Camera, Permissions } from 'expo';
import t from 'tcomb-form-native';
import axios from 'axios';
import { getAilmentsByUsername } from '../assets/utils.js';
import AnalyticsScreen from './AilmentAnalytics';

export default class AilmentNotes extends React.Component {
  static navigationOptions = {
    header: null,
    title: 'ailmentNotes',
  };

  state = {
    image: null,
    imageURL: null,
    imageData: [],
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    isPatient: true,
    isLoggedIn: false,
    user: {},
    ailments: [],
    // user: {
    //   patient_username: 'snuffles3',
    //   patient_password: 'password2',
    //   first_name: 'chauncey',
    //   surname: 'von snuffles',
    //   telephone: '07987777790',
    //   email: 'chaunceyvonsnufflesthethird@guildwars.co.uk',
    //   address: '9 lions arch/divinitys reach/prestwich/M8 2CS',
    //   surgery_id: 1,
    //   emerg_contact: '01268930298',
    //   general_med: 'stress valium migraines'
    // },
    // ailments: [{
    //     ailment_description: "Woke up with this bruise",
    //     ailment_id: 16,
    //     ailment_name: "Unknown",
    //     ailment_type: "Bruise",
    //     date: "09:02 10-04-2019",
    //     image: "https://i.imgur.com/bXxHmiy.jpg",
    //     patient_username: "KDEVS",
    //     prescription: null,
    //     treatment_plan: null,
    //   },
    //   {
    //     ailment_description: "Got bigger I think",
    //     ailment_id: 17,
    //     ailment_name: "Unknown",
    //     ailment_type: "Bruise",
    //     date: "08:44 11-04-2019",
    //     image: "https://i.imgur.com/f0NTemp.jpg",
    //     patient_username: "KDEVS",
    //     prescription: null,
    //     treatment_plan: null,
    //   },
    //   {
    //     ailment_description: "Hurts on touch",
    //     ailment_id: 18,
    //     ailment_name: "Unknown",
    //     ailment_type: "Bruise",
    //     date: "09:13 12-04-2019",
    //     image: "https://i.imgur.com/xKHOJk4.jpg",
    //     patient_username: "KDEVS",
    //     prescription: null,
    //     treatment_plan: null,
    //   },
    // ]
  };

  async componentDidMount() {
    getAilmentsByUsername()
    .then((ailments) => {
      this.setState({ ailments, })
    })
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const ailment1 = this.state.ailments[0];
    const ailment2 = this.state.ailments[1];
    const ailment3 = this.state.ailments[2];
    const { hasCameraPermission, image } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/images/logo.png')}
              style={styles.logoImage}
            />
            <Text style={styles.mainHeaderText}>Pocket GP</Text>
          </View>

          {this.state.isPatient
            ? <View style={styles.formContainer}>
            <Text style={styles.cameraText}>
              If your ailment is visual, please use the camera below.
            </Text>
            <Text style={styles.cameraText}>
              This will help keep you GP up to date with how the ailment is
              progressing
            </Text>
            <Text style={styles.warningText}>
              Try to keep the lighting consistent for better results
            </Text>
            {image ? (
              <View>
                <Image source={{ uri: image }} style={styles.camera} />
                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                  }}
                  onPress={() => this.cancelSnap()}
                >
                  <Image
                    source={require('../assets/images/camera-cancel-icon.png')}
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
                    alignItems: 'center',
                  }}
                  onPress={() => this.snapPhoto()}
                >
                  <Image
                    source={require('../assets/images/camera-icon.png')}
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
              title='SUBMIT CHANGES'
              onPress={() => {
                const value = this._form.getValue();
                if (value) this.handleSubmit(value);
              }}
            />
          </View>
          : <View>
            <Text style={styles.mainText}>{this.state.user.first_name} {this.state.user.surname}'s Ailment Notes:</Text>
            {this.state.ailments.map(ailment => <View key={ailment.ailment_id}>
              <View style={styles.ailmentContainer}>
                <Text style={styles.ailmentText}>Decription: {ailment.ailment_description}</Text>
                <Text style={styles.ailmentText}>Condition (if known): {ailment.ailment_name}</Text>
                <Text style={styles.ailmentText}>Type: {ailment.ailment_type}</Text>
                <Text style={styles.ailmentText}>Date: {ailment.date}</Text>
                <Text style={styles.ailmentText}>Prescription: {ailment.prescription}</Text>
                <Text style={styles.ailmentText}>Treatment Plan: {ailment.treatment_plan}</Text>
                {ailment.image.includes('.')
                  ? <Image
                    source={ailment.image}
                    style={styles.ailmentImage}
                  />
                  : <Image
                  source={require('../assets/images/icon.png')}
                  style={styles.ailmentImage}
                />
                }
              </View>
            </View>)}
          </View>}
        </ScrollView>
      </View>
    );
  }

  handleSubmit = (value: Object) => {
    const { image } = this.state;
    const ailmentObj = {
      image: `${image}`,
      ailment_type: value.type,
      ailment_name: value.name,
      ailment_description: value.description,
      prescription: value.prescription,
      treatment_plan: value.treatment
    };
    return axios
    .post('https://pocket-gp.herokuapp.com/api/patients/KDEVS/ailments', ailmentObj)
    .then(({ data }) => {
      console.log(data, '<-- data')
      this.setState({ image: null })
      this.props.navigation.navigate('Analytics', {
        imageData: this.state.imageData
      });
    })
    .catch(err => console.log(err, '<-- BE error'))
  }

  cancelSnap = () => {
    this.setState({ image: null });
  }

  snapPhoto = () => {
    if (this.camera) {
      const options = {
        quality: 1,
        base64: true,
        fixOrientation: true,
        exif: true,
        // ratio: '16:9',
      };
      this.camera.takePictureAsync(options).then(photo => {
        photo.exif.Orientation = 1;
        this.setState({ image: photo.uri });
      });
      // this.camera.ratio = '16:9';
    }
  }
}

const AilmentForm = t.struct({
  type: t.String,
  name: t.String,
  description: t.String,
  prescription: t.maybe(t.String),
  treatment: t.maybe(t.String),
});

const Form = t.form.Form;

const formStyles = {
  ...Form.stylesheet,
  controlLabel: {
    normal: {
      color: '#000',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600',
    },
    error: {
      color: 'red',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600',
    },
  },
};

const options = {
  fields: {
    type: {
      error: 'Please give type of ailment (e.g rash, bruise, cough...)',
    },
    name: {
      error: "Please give name of ailment, if unknown please put 'unknown'",
    },
    description: {
      error: 'a short description of how you feel',
    },
  },
  stylesheet: formStyles,
  auto: 'placeholders',
};

const styles = StyleSheet.create({
  warningText: {
    color: 'red',
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  camera: {
    flex: 1,
    height: 200,
    margin: 0,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
    borderWidth: 2,
    borderColor: '#00BFFF',
  },
  cameraImage: {
    marginVertical: 10,
    padding: 0,
    height: 50,
    width: 50,
  },
  cameraText: {
    textAlign: 'center',
    paddingBottom: 10,
    fontSize: 16,
  },
  contentContainer: {
    paddingTop: 30,
  },
  ailmentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    padding: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    backgroundColor: 'rgba(61,176,215,0.2)',
    borderColor: '#00BFFF',
  },
  formContainer: {
    justifyContent: 'center',
    padding: 10,
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
  ailmentImage: {
    height: 200,
    width: 150
  },
  ailmentText: {
    fontSize: 16,
    textAlign: 'center'
  },
  mainText: {
    fontSize: 18,
    textAlign: 'center'
  },
  cancelCameraImage: {
    justifyContent: 'center',
    height: 50,
    width: 50,
  },
  mainHeaderText: {
    fontSize: 36,
    color: 'rgba(0, 0, 0, 1)',
    lineHeight: 48,
    textAlign: 'right',
    marginRight: 20,
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
  hidden: {
    height: 0,
    width: 0
  }
});
