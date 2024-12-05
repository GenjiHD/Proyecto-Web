import axios from "axios";

const PersonalAPI = axios.create({
    baseURL: 'http://localhost:3001/api/personal/'
});

export default PersonalAPI;