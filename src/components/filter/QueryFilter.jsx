import React from "react";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import "./queryfilter.css";

export default function QueryFilter({ searchStudent, getStudents }) {
  // State information for the filter by StudentId or RFID or both
  const [name, setStudentId] = useState("");
  const [rfid, setRfId] = useState("");
  // // For page navigation during button click
  // const navigate = useNavigate();

  // Clear the input text
  const clearSearch = () => {
    setStudentId("");
    setRfId("");
    getStudents();
  };

  // Display the filter jsx
  return (
    <div className="filter">
      <div className="filterFields">
        <label htmlFor="name" className="filterLabel">
          Student Name
        </label>
        <input
          name="name"
          className="filterInputs"
          type="text"
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => setStudentId(e.target.value)}
        />
      </div>
      <div className="filterFields">
        <label htmlFor="rfid" className="filterLabel">
          RFID Number
        </label>
        <input
          name="rfid"
          className="filterInputs"
          type="text"
          placeholder="Enter RFID"
          value={rfid}
          onChange={(e) => setRfId(e.target.value)}
        />
      </div>
      <div className="filterFields">
        <div className="btn-container">
          <button
            type="button"
            className="queryBtn"
            onClick={() => searchStudent(name, rfid)}
          >
            Search Student
          </button>
          <button type="button" className="queryBtn" onClick={clearSearch}>
            Clear Search
          </button>
        </div>
      </div>
    </div>
  );
}
