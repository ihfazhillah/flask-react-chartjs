import axios from "axios";

const baseUrl = "http://localhost:5000/"


class Client {
  getAllData() {
    return axios.get(`${baseUrl}sales/`).then(
      response => {
        return response.data
      }
    )

  }

  addData(data) {
    return axios.post(`${baseUrl}sales/`).then(
      response => {
        return response.data
      }
    )
  }

  getMultiplier(){
    return axios.get(`${baseUrl}multiplier/`).then(
      response => response.data
    )
  }
}

export default Client