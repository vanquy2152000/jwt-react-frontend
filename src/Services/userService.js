import axios from './customize-axios';

const registerNewUser = (email, username, phone, password) => {
    return axios.post("api/v1/register", {
        email, username, phone, password,
    });
}

const loginUser = (valueLogin, password) => {
    return axios.post("api/v1/login", {
        valueLogin, password
    });
}

const getListUser = (page, limit) => {
    return axios.get(`api/v1/user/read?page=${page}&limit=${limit}`)
}

const createNewUser = (userData) => {
    return axios.post(`api/v1/user/create`, { ...userData })
}

const updateUser = (userData) => {
    return axios.put("api/v1/user/update", { ...userData })
}

const deleteUser = (user) => {
    return axios.delete(`api/v1/user/delete`, { data: { id: user.id } })
}


const fetchGroup = () => {
    return axios.get("api/v1/group/read")
}


export {
    registerNewUser, loginUser, getListUser, deleteUser, fetchGroup, createNewUser, updateUser
}