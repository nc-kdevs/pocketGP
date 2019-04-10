import axios from 'axios';
axios.defaults.baseURL = 'https://pocket-gp.herokuapp.com/api';
import { Notifications } from 'expo';

export const getUserByUsername = (username) => {
  return axios
    .get(`/patients/${username}`)
    .then(({ data }) => {
      return data.patient
    })
    .catch(err => console.log(err))
};

export const getSurgeryByUsername = (username) => {
  return axios
  .get(`/surgeries`)
  .then(({ data }) => {
    const surgeryByUsername = data.surgeries.filter(surgery => surgery.surgery_username === username);
    // console.log(surgeryByUsername, '<-- surgery in utils')
    return surgeryByUsername[0];
  })
};

export const localNotification = {
  title: 'Pocket GP',
  body: 'Good morning. Please can you update your ailment notes?', // (string) — body text of the notification.
  ios: { // (optional) (object) — notification configuration specific to iOS.
    sound: true // (optional) (boolean) — if true, play a sound. Default: false.
  },
  android: // (optional) (object) — notification configuration specific to Android.
  {
    sound: true, // (optional) (boolean) — if true, play a sound. Default: false.
    //icon (optional) (string) — URL of icon to display in notification drawer.
    //color (optional) (string) — color of the notification icon in notification drawer.
    priority: 'high', // (optional) (min | low | high | max) — android may present notifications according to the priority, for example a high priority notification will likely to be shown as a heads-up notification.
    sticky: false, // (optional) (boolean) — if true, the notification will be sticky and not dismissable by user. The notification must be programmatically dismissed. Default: false.
    vibrate: true // (optional) (boolean or array) — if true, vibrate the device. An array can be supplied to specify the vibration pattern, e.g. - [ 0, 500 ].
    // link (optional) (string) — external link to open when notification is selected.
  }
};

let t = new Date();
t.setSeconds(t.getSeconds() + 10);

export const schedulingOptions = {
    time: t, // (date or number) — A Date object representing when to fire the notification or a number in Unix epoch time. Example: (new Date()).getTime() + 1000 is one second from now.
    repeat: repeat
  };