import { useState } from 'react'
import './Role.scss'
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { createNewRoles } from '../../Services/roleService';

const Roles = () => {

    const defaultRole = { url: '', description: '', isValidUrl: true }
    const [listRoles, setListRoles] = useState({
        child1: defaultRole
    })

    const handleOnChangeInput = (key, name, value) => {
        let _listRoles = _.cloneDeep(listRoles);
        _listRoles[key][name] = value;

        if (value && name === "url") {
            _listRoles[key]['isValidUrl'] = true;
        }

        setListRoles(_listRoles);
    }

    const handleAddNewInputRole = () => {
        let _listRoles = _.cloneDeep(listRoles);
        _listRoles[`child-${uuidv4()}`] = defaultRole;
        setListRoles(_listRoles)
    }

    const handleDeleteInputRole = (key) => {
        let _listRoles = _.cloneDeep(listRoles);
        delete _listRoles[key];
        setListRoles(_listRoles)
    }

    const buildDataToPersist = () => {
        let _listRoles = _.cloneDeep(listRoles);
        let result = [];
        Object.entries(_listRoles).map(([key, role], i) => {
            result.push({
                url: role.url,
                description: role.description
            })
        })
        return result;
    }

    const handleSaveUser = async () => {
        let invalidObj = Object.entries(listRoles).find(([key, role], i) => {
            return role && !role.url;
        })

        if (!invalidObj) {
            /// call api
            let data = buildDataToPersist();
            let res = await createNewRoles(data);

            if (res && res.EC === 0) {
                toast.success(res.EM)
            } else {
                toast.error(res.EM)
            }
        } else {
            // check coi co invalid hay khong
            let _listRoles = _.cloneDeep(listRoles)
            let key = invalidObj[0]
            _listRoles[key]["isValidUrl"] = false;
            setListRoles(_listRoles)
            toast.error("Input URL must not be empty....")
        }
    }
    return (
        <div className="role-container">
            <div className="container">
                <div className="role-content">
                    <div className="title-role">
                        <h4>Add a new role</h4>
                    </div>
                    <div className="role-parent">
                        {Object.entries(listRoles).map(([key, val], i) => {
                            return (
                                <div className="row role-child" key={`child-${key}`}>
                                    <div className={`col-5 form-group ${key}`}>
                                        <label htmlFor="url">URL :</label>
                                        <input
                                            type="text"
                                            className={val.isValidUrl ? "form-control" : "form-control is-invalid"}
                                            id="url"
                                            value={val.url}
                                            onChange={(event) => handleOnChangeInput(key, 'url', event.target.value)}
                                        />
                                    </div>
                                    <div className="col-5 form-group">
                                        <label htmlFor="description">Description</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="description"
                                            value={val.description}
                                            onChange={(event) => handleOnChangeInput(key, 'description', event.target.value)}
                                        />
                                    </div>
                                    <div className="col-2 actions">
                                        <i className="fa fa-plus-circle add"
                                            onClick={() => handleAddNewInputRole(val)}
                                        />
                                        {
                                            i >= 1 &&
                                            <i className="fa-solid fa-trash-can delete"
                                                onClick={() => handleDeleteInputRole(key)}
                                            />
                                        }
                                    </div>
                                </div>
                            )
                        })}

                        <div>
                            <button className="btn btn-warning mt-3"
                                onClick={() => handleSaveUser()}
                            >Save</button>
                        </div>

                    </div>
                </div>
            </div>
        </div >
    )
}

export default Roles