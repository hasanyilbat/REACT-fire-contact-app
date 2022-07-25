import React, { useState } from "react";
import { writeUserData } from "../utils/firebase";
import { uid } from "uid";
import { toastWarnNotify } from "../utils/customToastify";

const Form = () => {
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const uuid = uid();

    userName || phoneNumber || gender
      ? writeUserData(uuid, userName, phoneNumber, gender)
      : toastWarnNotify("required field cannot be left blank");

    setUserName("");
    setPhoneNumber("");
  };
  return (
    <div className="w-25 p-5 ms-5 border border-2 border-dark">
      <div className="design-form">
        <div className="design">
          <p className="display-6 text-center">ADD CONTACT</p>
        </div>
        <form className="text-center" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              aria-describedby="username"
              placeholder="Enter username"
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
            />
          </div>
          <div className="form-group my-2">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              className="form-control"
              id="phone"
              placeholder="Phone Number"
              onChange={(e) => setPhoneNumber(e.target.value)}
              value={phoneNumber}
            />
          </div>

          <div className="mt-2">
            <select
              className="custom-select w-100 text-center"
              style={{ height: "2rem" }}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary mt-3">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
