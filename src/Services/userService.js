import axios from 'axios';

const registerNewUser = (email, username, phone, password) => {
    return axios.post("http://localhost:8080/api/v1/register", {
        email, username, phone, password,
    });
}

const loginUser = (valueLogin, password) => {
    return axios.post("http://localhost:8080/api/v1/login", {
        valueLogin, password
    });
}

export {
    registerNewUser, loginUser
}