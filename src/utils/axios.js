import axios from "axios";
// Setting up base Url for fetching data
const fetcher = axios.create({
    // baseURL: "http://localhost:5000/api/v1/admin", 
    baseURL: "https://paint-app.onrender.com/api/v1/admin",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${typeof window !== 'undefined' && localStorage.getItem('token')}`,
        Accept: "application/json",
    },
});
export default fetcher;