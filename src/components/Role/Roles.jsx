import { useState, useEffect } from 'react';
import './Role.scss'
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { createNewRoles, deleteRole, fetchListRolesWithPagination } from '../../Services/roleService';
import TableRole from './TableRole/TableRole';
import ReactPaginate from 'react-paginate';
import ModalUpdateRole from './Modal/ModalUpdateRole';

const Roles = () => {
    const [totalPages, setTotalPages] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [currentLimit, setCurrentLimit] = useState(5)

    const defaultRole = { url: '', description: '', isValidUrl: true }
    // data create role
    const [listRoles, setListRoles] = useState({
        child1: defaultRole
    })
    // data get role
    const [listRolesData, setListRolesData] = useState([])

    // modalupdate user
    const [showModalRole, setShowModalRole] = useState(false)
    const [dataModalRole, setDataModalRole] = useState({})

    useEffect(() => {
        getAllRoles();
    }, [currentPage])

    const getAllRoles = async () => {
        let res = await fetchListRolesWithPagination(currentPage, currentLimit);
        console.log("res", res)

        if (res && +res.EC === 0) {
            setTotalPages(res.DT.totalPages)
            setListRolesData(res.DT.roles)
        } else {
            toast.error(res.EM)
        }

    }
    const handlePageClick = (e) => {
        setCurrentPage(+e.selected + 1)
    }

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

    // data luu vao list role
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
    // create role

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
                await getAllRoles(currentPage, currentLimit)
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

    const onHideModalRole = async () => {
        setShowModalRole(false)

        // await getAllRoles();
    }

    const handleDeleteRole = async (role) => {
        let res = await deleteRole(role)

        console.log("check res delete", role)

        if (res && res.EC === 0) {
            toast.success("Role deleted successfully")
            await getAllRoles();
        } else {
            toast.error("Error deleting role")
        }
    }

    const handleUpdateRole = async (role) => {
        setShowModalRole(true)
        setDataModalRole(role)
    }


    return (
        <>
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
                                <button
                                    className="btn btn-warning mt-3"
                                    onClick={() => handleSaveUser()}
                                >Save</button>
                            </div>

                        </div>
                    </div>
                    <div className="table-content mt-3">
                        <TableRole
                            listRolesData={listRolesData}
                            handleDelete={handleDeleteRole}
                            handleUpdateRole={handleUpdateRole}
                        />
                    </div>
                    <div className="role-footer">
                        <ReactPaginate
                            className="pagination d-flex justify-content-center"
                            breakLabel="..."
                            nextLabel="Next >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={2}
                            marginPagesDisplayed={2}
                            pageCount={totalPages}
                            previousLabel="< Previous"
                            renderOnZeroPageCount={null}
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            containerClassName="pagination"
                            activeClassName="active"
                        />
                    </div>
                </div>
            </div >
            <ModalUpdateRole
                show={showModalRole}
                onHideModalRole={onHideModalRole}
                dataModalRole={dataModalRole}
                getAllRoles={getAllRoles}
            />
        </>
    )
}

export default Roles