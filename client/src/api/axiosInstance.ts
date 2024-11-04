import axios from "axios";

export default axios.create({
  baseURL: "https://delivery-app-pathfinding-backend.vercel.app/",
});