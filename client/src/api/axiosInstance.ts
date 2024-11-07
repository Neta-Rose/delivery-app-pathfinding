import axios from "axios";

export default axios.create({
  baseURL: import.meta.env.SERVER_BASE_URL,
});