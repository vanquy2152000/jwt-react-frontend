import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { createNewUser, fetchGroup, updateUser } from "../../../Services/userService";
import './ModalUser.scss'
import { toast } from 'react-toastify';
import _ from 'lodash';

const ModalUser = (props) => {
    const { show, onHideModalUser, action, dataModalUser } = props;

    const defaultUserData = {
        email: '',
        phone: '',
        username: '',
        password: '',
        address: '',
        sex: '',
        group: ''
    }

    const defaultInputsValid = {
        email: true,
        phone: true,
        username: true,
        password: true,
        address: true,
        sex: true,
        group: true
    }

    const [userData, setUserData] = useState(defaultUserData)
    const [validInputs, setValidInputs] = useState(defaultInputsValid)
    const [userGroups, setUserGroups] = useState([])

    useEffect(() => {
        getGroups();
    }, [])

    useEffect(() => {
        if (action === 'UPDATE') {
            setUserData({ ...dataModalUser, group: dataModalUser.Group ? dataModalUser.Group.id : '' })
        }

    }, [dataModalUser])

    useEffect(() => {
        if (action === 'CREATE') {
            setUserData({ ...userData, group: userGroups[0].id })
        }
    }, [action])

    // Get group id

    const getGroups = async () => {
        let res = await fetchGroup();
        if (res && res.DT && res.EC === 0) {
            setUserGroups(res.DT)

            if (res.DT && res.DT.length > 0) {
                setUserData({ ...userData, group: res.DT[0].id })
            }
        } else {
            toast.error("Fetch group failed");
        }
    }

    // custom handle on change
    const handleOnChangeInput = (value, name) => {
        let _userData = _.cloneDeep(userData);
        // value = e.target.value = userData.email
        _userData[name] = value;
        setUserData(_userData);
    }
    // Valid
    const checkValidateInputs = () => {
        setValidInputs(defaultInputsValid)

        if (action === "UPDATE") return true;

        let arr = ['email', 'phone', 'password', 'group']

        let check = true;

        for (let i = 0; i < arr.length; i++) {
            if (!userData[arr[i]]) {
                let _validInputs = _.cloneDeep(defaultInputsValid)
                _validInputs[arr[i]] = false;
                setValidInputs(_validInputs)

                toast.error(`Empty input ${arr[i]}`)

                check = false;
                break;
            }
        }
        return check;
    }

    // Create user

    const handleConfirmUser = async () => {
        let check = checkValidateInputs();
        if (check === true) {
            let res = action === "CREATE" ?
                await createNewUser({ ...userData, groupId: userData['group'] })
                :
                await updateUser({ ...userData, groupId: userData['group'] })

            if (res && res.DT && res.EC === 0) {
                toast.success(res.EM)
                handleCloseModalUser();
                setUserData({ ...defaultUserData, group: userGroups && userGroups.length > 0 ? userGroups[0].id : '' })
            }
            if (res && res.EC !== 0) {
                toast.error(res.EM)
                let _validInputs = _.cloneDeep(defaultInputsValid)

                _validInputs[res.DT] = false;
                setValidInputs(_validInputs)
            }
        }
    }

    const handleCloseModalUser = () => {
        onHideModalUser();
        setUserData(defaultUserData)
        setValidInputs(defaultInputsValid)
    }

    return (
        <Modal show={show} onHide={handleCloseModalUser} backdrop="static" size="xl">
            <Modal.Header closeButton>
                <Modal.Title>{action === "CREATE" ? "Create New User" : "Update User"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="content-body row">
                    <div className="col-12 col-sm-6 form-group">
                        <label htmlFor="email">Email address (<span className="require">*</span>) : </label>
                        <input
                            disabled={action === "CREATE" ? false : true}
                            type="text"
                            className={validInputs.email ? "form-control" : "form-control is-invalid"}
                            id="email"
                            value={userData.email}
                            onChange={(e) => handleOnChangeInput(e.target.value, "email")}
                        />
                    </div>
                    <div className="col-12 col-sm-6 form-group">
                        <label htmlFor="phone">Phone (<span className="require">*</span>) : </label>
                        <input
                            disabled={action === "CREATE" ? false : true}
                            type="text"
                            className={validInputs.phone ? "form-control" : "form-control is-invalid"}
                            id="phone"
                            value={userData.phone}
                            onChange={(e) => handleOnChangeInput(e.target.value, "phone")}
                        />
                    </div>
                    <div className="col-12 col-sm-6 form-group">
                        <label htmlFor="username">User name : </label>
                        <input
                            type="text"
                            className="form-control" id="username"
                            value={userData.username}
                            onChange={(e) => handleOnChangeInput(e.target.value, "username")}
                        />
                    </div>
                    <div className="col-12 col-sm-6 form-group">
                        {
                            action === "CREATE" &&
                            <>
                                <label htmlFor="password">Password (<span className="require">*</span>) : </label>
                                <input
                                    type="password"
                                    className={validInputs.password ? "form-control" : "form-control is-invalid"}
                                    id="password"
                                    value={userData.password}
                                    onChange={(e) => handleOnChangeInput(e.target.value, "password")}
                                />
                            </>
                        }
                    </div>
                    <div className="col-12 col-sm-12 form-group">
                        <label htmlFor="address">Address : </label>
                        <input
                            type="text"
                            className="form-control" id="address"
                            value={userData.address}
                            onChange={(e) => handleOnChangeInput(e.target.value, "address")}
                        />
                    </div>
                    <div className="col-12 col-sm-6 form-group">
                        <label>Gender : </label>
                        <select
                            className="form-select"
                            onChange={(e) => handleOnChangeInput(e.target.value, "sex")}
                            defaultValue={userData.sex}
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="col-12 col-sm-6 form-group">
                        <label>Group (<span className="require">*</span>) : </label>
                        <select
                            className={validInputs.group ? "form-select" : "form-select is-invalid"}
                            onChange={(e) => handleOnChangeInput(e.target.value, "group")}
                            value={userData.group}
                        >
                            {userGroups && userGroups.length > 0 &&
                                userGroups.map((item, index) => {
                                    return (
                                        <option key={`group-${index}`} value={item.id}>{item.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModalUser}>
                    Close
                </Button>
                <Button variant={action === "CREATE" ? "primary" : "warning"} onClick={() => handleConfirmUser()}>
                    {action === "CREATE" ? "Save" : "Update"}
                </Button>
            </Modal.Footer>
        </Modal >
    );
};

export default ModalUser;
