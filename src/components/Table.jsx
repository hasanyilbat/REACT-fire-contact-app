import { getDatabase, ref, remove } from "firebase/database";
import React, { useEffect, useState } from "react";
import { deleteElement, getData } from "../utils/firebase";
import { FaTrash, FaEdit } from "react-icons/fa";
const Table = () => {
  const [info, setInfo] = useState([]);
  useEffect(() => {
    getData(setInfo, info);
  }, []);

  const handleDelete = (row) => {
    // console.log(row);
    deleteElement(row);
  };

  console.log(info);

  return (
    <div className="w-50 p-5 me-5">
      <div>
        <h2 className="text-center display-6">CONTACTS</h2>
      </div>
      <div>
        <table class="table table-striped table-dark">
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
                    <FaEdit />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
