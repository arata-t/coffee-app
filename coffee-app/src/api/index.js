import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: process.env.NODE_ENV === 'production'
      ? 'https://coffee-app-20230304.herokuapp.com/v1'
      : 'http://localhost:3000/v1'
  })
}
