import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { deleteUser, getListUser } from "../../Services/userService";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import ModalDeleteUser from "./Modal/ModalDeleteUser";
import ModalUser from "./Modal/ModalUser";
import './User.scss';

const User = () => {
  const [listUser, setListUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  // modal Delete user
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [dataModal, setDataModal] = useState({});

  // modal Create/Update user
  const [showModalUser, setShowModalUser] = useState(false);
  const [actionModalUser, setActionModalUser] = useState("UPDATE");
  const [dataModalUser, setDataModalUser] = useState({})

  useEffect(() => {
    fetchListUser();
  }, [currentPage]);

  const fetchListUser = async () => {
    let res = await getListUser(currentPage, currentLimit);

    if (res && res.DT && res.EC === 0) {
      setTotalPages(res.DT.totalPages);
      setListUser(res.DT.users);
    }
  };

  const handlePageClick = async (e) => {
    setCurrentPage(+e.selected + 1);
  };

  const onHideModalUser = async () => {
    setShowModalUser(false);
    setDataModalUser({})
    await fetchListUser();
  }

  //Delete user
  const handleCloseModalDelete = () => {
    setDataModal({});
    setShowModalDelete(false);
  };

  const handleDeleteUser = async (user) => {
    setDataModal(user);
    setShowModalDelete(true);
  };

  const handleConfirmDeleteUser = async () => {
    let res = await deleteUser(dataModal);

    if (res && res.DT && res.EC === 0) {
      toast.success("Delete user success");
      await fetchListUser();
      setShowModalDelete(false);
    } else {
      toast.error("Delete user failed!");
    }
  };

  // UPdate user
  const handleEditUser = (user) => {
    setActionModalUser("UPDATE")
    setShowModalUser(true);
    setDataModalUser(user)
  }

  const handleCreateNewUser = () => {
    setActionModalUser("CREATE")
    setShowModalUser(true);
  }

  const handleRefresh = async () => {
    await fetchListUser();
  }

  return (
    <>
      <div className="container">
        <div className="manage-user-container mt-3  ">
          <div className="user-header d-sm-flex d-flex justify-content-between align-items-center">
            <h1 className="title">Manage User</h1>
            <div className="actions d-flex gap-3">
              <button
                className="btn btn-primary"
                onClick={handleRefresh}
              >
                <i className="fa-solid fa-rotate" />
                &nbsp;
                <span>Refresh</span>
              </button>
              <button className="btn btn-success" onClick={handleCreateNewUser}>
                <i className="fa-solid fa-plus" />
                &nbsp;
                <span>Create User</span>
              </button>
            </div>
          </div>
          <div className="user-body mt-3">
            <Table bordered hover>
              <thead>
                <tr>
                  <th>No</th>
                  <th>ID</th>
                  <th>Email</th>
                  <th>Username</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Sex</th>
                  <th>Group</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {listUser && listUser.length > 0 ? (
                  <>
                    {listUser.map((item, index) => {
                      return (
                        <tr key={`row-${index}`}>
                          <td>{(currentPage - 1) * currentLimit + index + 1}</td>
                          <td>{item.id}</td>
                          <td>{item.email}</td>
                          <td>{item.username}</td>
                          <td>{item.phone}</td>
                          <td>{item.address}</td>
                          <td>{item.sex}</td>
                          <td>{item.Group ? item.Group.name : ""}</td>
                          <td className="action">
                            <span
                              className="edit"
                              onClick={() => handleEditUser(item)}
                            >
                              <i className="fa-sharp fa-solid fa-pencil" />
                            </span>
                            <span
                              className="delete"
                              onClick={() => handleDeleteUser(item)}
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
                    <tr>
                      <td>Not Found User</td>
                    </tr>
                  </>
                )}
              </tbody>
            </Table>
          </div>
          {totalPages > 0 && (
            <div className="user-footer">
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
          )}
        </div>
      </div>
      <ModalUser
        action={actionModalUser}
        show={showModalUser}
        dataModalUser={dataModalUser}
        onHideModalUser={onHideModalUser}
      />
      <ModalDeleteUser
        show={showModalDelete}
        handleCloseModal={handleCloseModalDelete}
        dataModal={dataModal}
        handleConfirmDeleteUser={handleConfirmDeleteUser}
      />
    </>
  );
};

export default User;
