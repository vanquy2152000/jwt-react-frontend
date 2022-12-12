import { fetchListRoles } from '../../../Services/roleService';
import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import './TableRole.scss'

const TableRole = (props, ref) => {
    const { listRolesData, handleDelete, handleUpdateRole } = props;

    const handleDeleteRole = async (role) => {
        console.log("check role delete table :", role)
        handleDelete(role);
    }

    const handleEditRole = (item) => {
        handleUpdateRole(item);
    }


    return (
        <>
            <div>
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listRolesData && listRolesData.length > 0 ? (
                            <>
                                {listRolesData.map((item, index) => {
                                    return (
                                        <tr key={`row-${index}`}>
                                            <td>{item.id}</td>
                                            <td>{item.url}</td>
                                            <td>{item.description}</td>
                                            <td className="actions">
                                                <span
                                                    className="edit"
                                                    onClick={() => handleEditRole(item)}
                                                >
                                                    <i className="fa-sharp fa-solid fa-pencil" />
                                                </span>
                                                <span
                                                    className="delete"
                                                    onClick={() => handleDeleteRole(item)}
                                                >
                                                    <i className="fa-solid fa-trash-can" />
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </>
                        ) : (
                            <>
                                <tr colSpan="4">
                                    <td>Not Found User</td>
                                </tr>
                            </>
                        )}
                    </tbody>
                </Table>
            </div>

        </>
    )
}


export default TableRole