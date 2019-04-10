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
}