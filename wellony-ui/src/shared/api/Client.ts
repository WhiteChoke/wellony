import axios from 'axios';

export const apiClient = axios.create({
    baseURL: "http://10.8.1.9:8080/api/v1",
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});