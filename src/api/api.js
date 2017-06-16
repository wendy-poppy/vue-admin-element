import axios from 'axios';

let base = '';

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };
