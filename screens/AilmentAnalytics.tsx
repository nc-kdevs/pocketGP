import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import ChartGraph from '../components/Chart';

export default class AnalyticsScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    isPatient: true,
    isLoggedIn: false,
    user: {},
  };

  render() {
    const defaultImagedata = [{r: 110, g: 10, b: 181},
      {r: 115, g: 10, b: 199},
      {r: 121, g: 12, b: 215},
      {r: 127, g: 16, b: 227},
      {r: 120, g: 22, b: 232},
      {r: 109, g: 25, b: 235},
      {r: 92, g: 18, b: 236}]
    const imageData = this.props.navigation.getParam('imageData', defaultImagedata);
    const red = "Redness"
    const blue = "Bruising"
    const green = "Infection"
    const redData = this.getRedData(imageData)
    const blueData = this.getBlueData(imageData)
    const greenData = this.getGreenData(imageData)
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
          <View>
            <ChartGraph data={redData} name={red} />
          </View>
          <View>
            <ChartGraph data={blueData} name={blue} />
          </View>
          <View>
            <ChartGraph data={greenData} name={green} />
          </View>
        </ScrollView>
      </View>
    );
  }

  getRedData = (imageData) => {
    return imageData.reduce((acc, val) => {
      acc.push(val.r)
      return acc;
    }, [])
  }
  getBlueData = (imageData) => {
    return imageData.reduce((acc, val) => {
      acc.push(val.b)
      return acc;
    }, [])
  }
  getGreenData = (imageData) => {
    return imageData.reduce((acc, val) => {
      acc.push(val.g)
      return acc;
    }, [])
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 10,
  },
  contentContainer: {
    paddingTop: 10,
  },
  logoContainer: {
    marginTop: 0,
    padding: 10,
    marginBottom: 10,
    borderBottomWidth: 3,
    borderColor: "rgba(61,176,215,0.2)"
  },
  formContainer: {
    justifyContent: 'center',
    marginTop: 10,
    padding: 10,
    backgroundColor: '#ffffff',
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
