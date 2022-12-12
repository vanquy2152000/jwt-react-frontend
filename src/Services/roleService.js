import axios from './customize-axios';

const fetchListRoles = (page, limit) => {
    return axios.get(`api/v1/role/read?page=${page}&limit=${limit}`)

}
const createNewRoles = (roles) => {
    return axios.post(`api/v1/role/create`, [...roles])
}

const updateRole = (role) => {
    console.log("check role axios : " , role)
    return axios.put(`api/v1/role/update`, { ...role })
}

const deleteRole = (role) => {
    return axios.delete(`api/v1/role/delete`, { data: { id: role.id } })
}

export {
    createNewRoles, fetchListRoles, deleteRole, updateRole
}