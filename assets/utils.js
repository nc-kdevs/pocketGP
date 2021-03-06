import axios from 'axios';
axios.defaults.baseURL = 'https://pocket-gp.herokuapp.com/api';

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

export const getAilmentsByUsername = () => {
  return axios
  .get(`/patients/KDEVS/ailments`)
  .then(({ data }) => {
    const ailmentsByUsername = data.ailments.filter(ailment => ailment.ailment_id > 15);
    return ailmentsByUsername;
  })
};

export const localNotification = {
  title: 'Pocket GP',
  body: 'Good morning. Please can you update your ailment notes?',
  ios: {
    sound: true
  },
  android:
  {
    sound: true,
    priority: 'high',
    sticky: false,
    vibrate: true
  }
};

let t = new Date();
t.setSeconds(t.getSeconds() + 120);

export const schedulingOptions = {
    time: (new Date()).getTime() + 5000,
    repeat: 'day'
  };