import { getDatabase, ref, remove, update } from "firebase/database";
import React, { useEffect, useState } from "react";
import { deleteElement, getData, updateElement } from "../utils/firebase";
import { FaTrash, FaEdit } from "react-icons/fa";
const Table = () => {
  const [info, setInfo] = useState([]);
  const [tempId, setTempId] = useState("");
  const [editUsername, setEditUsername] = useState("");
  const [editNumber, setEditNumber] = useState("");
  const [editGender, setEditGender] = useState("");

  useEffect(() => {
    getData(setInfo, info);
  }, []);

  console.log(info);
  const handleDelete = (row) => {
    deleteElement(row);
  };

  const openEditWindow = (row) => {
    setTempId(row.id);
    setEditUsername(row.username);
    setEditNumber(row.phoneNumber);
    setEditNumber(row.gender);
  };

  const editSubmit = (e) => {
    console.log(e.target);
    e.preventDefault();
    console.log(tempId, editUsername, editNumber, editGender);
    updateElement(tempId, editUsername, editNumber, editGender);
  };

  return (
    <div className="w-50 p-5 me-5">
      <div>
        <h2 className="text-center display-6">CONTACTS</h2>
      </div>
      <div>
        <table class="table table-striped table-dark text-center">
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
            <div></div>
            {info.map((row) => {
              const { username, phoneNumber, gender } = row;
              return (
                <tr>
                  <td scope="row">{username}</td>
                  <td>{phoneNumber}</td>
                  <td>{gender}</td>
                  <td className="text-center" onClick={() => handleDelete(row)}>
                    <FaTrash />
                  </td>
                  <td className="text-center">
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

      <div class="modal" tabindex="-1" id="edit-modal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Modal title</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
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
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    class="btn btn-primary"
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
