import './GroupRole.scss'
import { useEffect, useState } from 'react';
import { fetchGroup } from '../../Services/userService';
import { toast } from 'react-toastify';
import { assignRolesToGroup, fetchListRoles, fetchRoleByGroup } from '../../Services/roleService';
import _ from 'lodash'

const GroupRole = () => {
    const [userGroups, setUserGroups] = useState([])
    const [listRolesData, setListRolesData] = useState([])
    const [selectGroup, setSelectGroup] = useState("")
    const [assignRolesByGroup, setAssignRolesByGroup] = useState([])

    useEffect(() => {
        getGroups();
        getAllRoles();
    }, [])

    const getAllRoles = async () => {
        let res = await fetchListRoles();

        if (res && +res.EC === 0) {
            setListRolesData(res.DT)
        } else {
            toast.error(res.EM)
        }

    }


    const getGroups = async () => {
        let res = await fetchGroup();
        if (res && res.DT && res.EC === 0) {
            setUserGroups(res.DT)
        } else {
            toast.error("Fetch group failed");
        }
    }

    const handleOnChangeSelectGroup = async (value) => {
        setSelectGroup(value)
        if (value) {
            let res = await fetchRoleByGroup(value);

            if (res && +res.EC === 0) {
                let result = buildDataRolesByGroup(res.DT.Roles, listRolesData)
                setAssignRolesByGroup(result)
            }
        }
    }

    const buildDataRolesByGroup = (groupRoles, allRoles) => {
        let result = [];
        if (allRoles && allRoles.length > 0) {
            allRoles.map(role => {
                let object = {}
                object.url = role.url;
                object.id = role.id;
                object.description = role.description;
                object.isAssigned = false;

                if (groupRoles && groupRoles.length > 0) {
                    // ham some check neu co group co url role = object role trong all role thi tra ve true
                    // object.isAssigned === true;
                    object.isAssigned = groupRoles.some(item => item.url === object.url);
                }

                result.push(object);
            })
        }
        return result
    }

    const handleSelectRole = (value) => {
        let _assignRoleByGroup = _.cloneDeep(assignRolesByGroup)
        let foundIndex = _assignRoleByGroup.findIndex(item => +item.id === +value)
        if (foundIndex > -1) {
            _assignRoleByGroup[foundIndex].isAssigned = !_assignRoleByGroup[foundIndex].isAssigned
        }

        setAssignRolesByGroup(_assignRoleByGroup)
    }

    const buildDataToSave = () => {
        // data = { groupId: , groupRoles: [{}, {}] }
        let result = {}
        let _assignRolesByGroup = _.cloneDeep(assignRolesByGroup)
        result.groupId = +selectGroup
        let groupRolesFilter = _assignRolesByGroup.filter(item => item.isAssigned === true)
        let finalGroupRoles = groupRolesFilter.map(item => {
            let data = { groupId: +selectGroup, roleId: +item.id }
            return data
        })
        result.groupRoles = finalGroupRoles
        console.log("check result", result)
        return result
    }

    const handleSave = async () => {
        let data = buildDataToSave()
        console.log("data", data)
        let res = await assignRolesToGroup(data);
        if (res && +res.EC === 0) {
            toast.success(res.EM)
        } else {
            toast.error(res.EM)
        }
    }

    return (
        <div className="group-role-container">
            <div className="container">
                <div className="col-12 col-sm-6 mt-3">
                    <h4>Group Role</h4>
                </div>
                <div className="col-12 col-sm-6 form-group">
                    <label>Select Group (<span className="require">*</span>) : </label>
                    <select
                        className={"form-select"}
                        onChange={(e) => handleOnChangeSelectGroup(e.target.value)}
                        value={userGroups.group}
                    >
                        <option value="">Please select group</option>
                        {userGroups && userGroups.length > 0 &&
                            userGroups.map((item, index) => {
                                return (
                                    <option key={`group-${index}`} value={item.id}>{item.name}</option>
                                )
                            })
                        }
                    </select>
                    <hr />
                </div>
                {selectGroup &&
                    <>
                        <div className="roles">
                            <h5>Assign Roles :</h5>
                            {assignRolesByGroup && assignRolesByGroup.length > 0 &&
                                assignRolesByGroup.map((item, index) => {
                                    return (
                                        <div className="form-check" key={`list-role-${index}`}>
                                            <label className="form-check-label" htmlFor={`list-role-${index}`}>
                                                {item.url}
                                            </label>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value={item.id}
                                                id={`list-role-${index}`}
                                                checked={item.isAssigned}
                                                onChange={(event) => handleSelectRole(event.target.value)}
                                            />
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="mt-3">
                            <button
                                className="btn btn-warning"
                                onClick={() => handleSave()}
                            >Save</button>
                        </div>
                    </>
                }


            </div>
        </div>
    )
}

export default GroupRole