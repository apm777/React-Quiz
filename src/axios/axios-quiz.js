import axios from 'axios'

export default axios.create({
  baseURL: 'https://react-quiz-ddfd5.firebaseio.com/'
})