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

const redData = [20, 30, 35, 37, 40, 40, 40]
const blueData = [40, 35, 25, 20, 20, 15, 10]
const greenData = [40, 50, 25, 50, 35, 20, 50]

const red = "Redness"
const blue = "Bruising"
const green = "Infection"


export default class AnalyticsScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    isPatient: true,
  };

  render() {
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
