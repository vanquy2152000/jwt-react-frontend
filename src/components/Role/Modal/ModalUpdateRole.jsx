import { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { updateRole } from '../../../Services/roleService';

const ModalUpdateRole = (props) => {
    const { show, onHideModalRole, dataModalRole, getAllRoles } = props;

    const defaultRoleData = {
        url: '',
        description: '',
    }

    const [roleData, setRoleData] = useState(defaultRoleData)

    useEffect(() => {
        setRoleData(dataModalRole)
    }, [dataModalRole])


    const handleOnChangeInput = (value, name) => {
        let _roleData = _.cloneDeep(roleData);
        // value = e.target.value = userData.email
        _roleData[name] = value;
        setRoleData(_roleData);
    }


    const handleConfirmUpdateRole = async () => {
        console.log("check:", roleData)
        // call api
        let res = await updateRole(roleData)

        console.log("check res", res)

        if (res && res.DT && res.EC === 0) {
            toast.success(res.EM)
            handleCloseModalRole();
            setRoleData(res.DT)
            await getAllRoles();
        }
        if (res && res.EC !== 0) {
            toast.error(res.EM)
        }
    }

    const handleCloseModalRole = () => {
        onHideModalRole();
        setRoleData(defaultRoleData)
    }


    return (
        <Modal
            show={show}
            onHide={handleCloseModalRole}
            backdrop="static" size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Update Role</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="content-body row">
                    <div className="col-12 col-sm-6 form-group">
                        <label htmlFor="url">URL : </label>
                        <input
                            type="text"
                            className={"form-control"}
                            id="url"
                            value={roleData.url}
                            onChange={(e) => handleOnChangeInput(e.target.value, "url")}
                        />
                    </div>
                    <div className="col-12 col-sm-6 form-group">
                        <label htmlFor="description">Description : </label>
                        <input
                            type="text"
                            className={"form-control"}
                            id="description"
                            value={roleData.description}
                            onChange={(e) => handleOnChangeInput(e.target.value, "description")}
                        />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModalRole}>
                    Close
                </Button>
                <Button variant="warning" onClick={() => handleConfirmUpdateRole()}>
                    Update
                </Button>
            </Modal.Footer>
        </Modal >
    );
}


export default ModalUpdateRole;