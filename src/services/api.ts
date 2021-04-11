import axios from "axios";

export const api = axios.create({
  baseURL: "https://api-teste-app-offline-first.herokuapp.com/",
});
