import React, { useState, useEffect } from "react";
import QueryFilter from "../../components/filter/QueryFilter";
import Pagination from "../../components/pagination/Pagination";
import Cards from "../../components/cards/Cards";
import axios from "axios";
import "./home.css";
import Header from "../../components/header/Header";

export default function Home() {
  // state variables
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(12);

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = students.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(students.length / recordsPerPage);

  // Get Students on initial load
  useEffect(() => {
    getStudents();
  }, []);

  const getStudents = (e) => {
    axios
      .get(
        "https://rfid-project-j60u.onrender.com/api/v1/rfid-attendance-project/students/get-Students"
      )
      .then((response) => {
        const { user } = response.data.data;
        setStudents(user);
        setLoading(false);
      })
      .catch((err) => console.log(err.message));
  };

  // function called to search for student
  const searchStudent = (name, rfid) => {
    const capitalizeName = name
      .split(" ")
      .map((el) => el.charAt(0).toUpperCase() + el.slice(1))
      .join(" ");

    const changeToupperCase = rfid.toUpperCase();

    let url;
    if (capitalizeName && rfid) {
      url = `https://rfid-project-j60u.onrender.com/api/v1/rfid-attendance-project/students/home?name=${capitalizeName}&rfid_badge=${changeToupperCase}`;
    } else if (capitalizeName) {
      url = `https://rfidattendance.koyeb.app/api/v1/rfid-attendance-project/students/home?name=${capitalizeName}`;
    } else if (rfid) {
      url = `https://rfid-project-j60u.onrender.com/api/v1/rfid-attendance-project/students/home?rfid_badge=${changeToupperCase}`;
    }
    axios
      .get(url)
      .then((response) => {
        const { user } = response.data.data;

        let studentList = [];

        studentList.push(user);

        setStudents(studentList);
      })
      .catch((err) => console.log(err.message));
  };

  // the jsx code that contains our components
  return (
    <section className="main">
      {loading && <div>Loading page....</div>}
      <Header />
      <QueryFilter searchStudent={searchStudent} getStudents={getStudents} />
      <Cards students={currentRecords} />
      <Pagination
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </section>
  );
}
