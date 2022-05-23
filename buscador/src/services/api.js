import axios from "axios";

// numerodocep/json

const api = axios.create({
    baseURL: "https://viacep.com.br/ws/"
});

export default api;