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

const deleteUser = (user) => {
    return axios.delete(`api/v1/user/delete`, { data: { id: user.id } })
}

export {
    registerNewUser, loginUser, getListUser, deleteUser
}