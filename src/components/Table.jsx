import React, { useEffect, useState } from "react";
import { deleteElement, getData, updateElement } from "../utils/firebase";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toastWarnNotify } from "../utils/customToastify";
const Table = () => {
  const [info, setInfo] = useState([]);
  const [tempId, setTempId] = useState("");
  const [editUsername, setEditUsername] = useState("");
  const [editNumber, setEditNumber] = useState("");
  const [editGender, setEditGender] = useState("");

  useEffect(() => {
    getData(setInfo, info);
  }, []);

  const handleDelete = (row) => {
    deleteElement(row);
  };

  const openEditWindow = (row) => {
    setTempId(row.id);
    setEditUsername(row.username);
    setEditNumber(row.phoneNumber);
    setEditGender(row.gender);
  };

  const editSubmit = (e) => {
    e.preventDefault();

    editUsername && editNumber && editGender
      ? updateElement(tempId, editUsername, editNumber, editGender)
      : toastWarnNotify("required field cannot be left blank");
  };

  return (
    <div className="w-50 p-5 me-5 border border-3 border-dark">
      <div>
        <h2 className="text-center display-6">CONTACTS</h2>
      </div>
      <div>
        <table className="table table-striped table-dark text-center m-auto mt-4">
          <thead>
            <tr>
              <th scope="col">Username</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Gender</th>
              <th scope="col">Delete</th>
              <th scope="col">Edit</th>
            </tr>
          </thead>
          <tbody>
            {info.map((row, index) => {
              const { username, phoneNumber, gender } = row;
              return (
                <tr key={index}>
                  <td scope="row">{username}</td>
                  <td>{phoneNumber}</td>
                  <td>{gender}</td>
                  <td
                    className="text-center text-danger"
                    onClick={() => handleDelete(row)}
                  >
                    <FaTrash />
                  </td>
                  <td className="text-center text-success">
                    <FaEdit
                      data-bs-toggle="modal"
                      data-bs-target="#edit-modal"
                      onClick={() => openEditWindow(row)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="modal" tabIndex="-1" id="edit-modal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modal title</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="text-center" onSubmit={editSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    aria-describedby="username"
                    placeholder="Enter username"
                    onChange={(e) => setEditUsername(e.target.value)}
                    value={editUsername}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    placeholder="Phone Number"
                    onChange={(e) => setEditNumber(e.target.value)}
                    value={editNumber}
                  />
                </div>

                <div className="mt-2">
                  <select
                    className="custom-select w-100"
                    style={{ height: "2.5rem" }}
                    onChange={(e) => setEditGender(e.target.value)}
                  >
                    <option value="">Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                  >
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
