import axios from "axios";

const API_URL = "http://api.nbp.pl/api/exchangerates/";

export function createHttpClient(headers?: Object) {
  const http = axios.create({
    baseURL: API_URL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...headers
    }
  });

  return http;
}
