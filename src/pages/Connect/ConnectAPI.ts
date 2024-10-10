import axios from "axios";

function login(data: any) {
  return axios.post("http://localhost:3001/login", data);
}
