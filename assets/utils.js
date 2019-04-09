import axios from 'axios';
axios.defaults.baseURL = 'https://pocket-gp.herokuapp.com/api';

export const getUserByUsername = (username) => {
  return axios
    .get(`/patients/${username}`)
    .then(({ data }) => {
      return data.patient
    })
};