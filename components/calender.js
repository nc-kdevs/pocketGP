import React from 'react';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';


export default class calender extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
        <Text style={styles.getStartedText}>Calendar</Text>
        <Calendar
        // Collection of dates that have to be marked. Default = {}
        markedDates={{
          '2012-05-16': {selected: true, marked: true, selectedColor: 'blue'},
          '2012-05-17': {marked: true},
          '2012-05-18': {marked: true, dotColor: 'red', activeOpacity: 0},
          '2012-05-19': {disabled: true, disableTouchEvent: true}
        }}
      />
          </View>


        </ScrollView>
      </View>
    );
	};
};
