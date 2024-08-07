/*
DATE：2024/8/6
FILE_NAM： CallBackend.js
USER：renoy
NOTE：
*/
// api/index.js

import axios from 'axios';
import {ElMessage} from "element-plus";

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

const default_headers= {
    'Content-Type': 'application/json',
        'no-cors': true,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild',
        'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, OPTIONS'

};

export const postBackendData_old = async (data,method,url,headers=default_headers) =>{

    try {
        const response = await instance.post(url, data);
        return response.data;
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
};

export const postBackendData = async (data,method,url,headers=default_headers) =>{

    // 这里应该调用你的后端API获取新消息
    // console.info("data", data, "method",method,"url",url,"headers",headers)
        try {
            const response = await fetch(url,
                {
                    method: method,
                    headers:default_headers,
                    body: JSON.stringify(data),
                }
            )
            // console.info('Error posting data:', response)
            const res =  await response.json()
            console.info('response res:', res)
            return  res;
        } catch (error) {
            console.error('error', error)
            console.error('Error posting data:', response)
            ElMessage.error('Failed to fetch messages');
        }
    };
