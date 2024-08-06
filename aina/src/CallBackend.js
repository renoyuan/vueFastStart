/*
DATE：2024/8/6
FILE_NAM： CallBackend.js
USER：renoy
NOTE：
*/
// api/index.js

import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://your-api-url.com',
    timeout: 10000,
});

export const fetchData = async () => {
    try {
        const response = await instance.get('/endpoint');
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const postData = async (data) => {
    try {
        const response = await instance.post('/endpoint', data);
        return response.data;
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
};