import axios from './customize-axios';

const createNewRoles = (roles) => {
    return axios.post(`api/v1/role/create`, [...roles])
}

export {
    createNewRoles
}