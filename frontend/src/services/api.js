import axios from 'axios'

const API = axios.create({
  baseURL: 'https://algoritmo-astar.onrender.com'
})

export default API