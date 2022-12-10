import { useState } from 'react'
import './Role.scss'
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

const Roles = () => {
    const [listRoles, setListRoles] = useState({
        child1: { url: '', description: '' }
    })

    const handleOnChangeInput = (key, name, value) => {
        let _listRoles = _.cloneDeep(listRoles);
        _listRoles[key][name] = value;
        setListRoles(_listRoles);
    }

    const handleAddNewInputRole = () => {
        let _listRoles = _.cloneDeep(listRoles);
        _listRoles[`child-${uuidv4()}`] = {
            url: '',
            description: ''
        }
        setListRoles(_listRoles)
    }

    const handleDeleteInputRole = (key) => {
        let _listRoles = _.cloneDeep(listRoles);
        delete _listRoles[key];
        setListRoles(_listRoles)
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
                                            className="form-control"
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
                                            onClick={() => handleAddNewInputRole()}
                                        />
                                        <i className="fa-solid fa-trash-can delete"
                                            onClick={() => handleDeleteInputRole(key)}
                                        />
                                    </div>
                                </div>
                            )
                        })}

                        <div>
                            <button className="btn btn-warning mt-3">Save</button>
                        </div>

                    </div>
                </div>
            </div>
        </div >
    )
}

export default Roles