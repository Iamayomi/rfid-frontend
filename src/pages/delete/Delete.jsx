import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./delete.css";
import Message from "../../components/message/Message";
import Header from "../../components/header/Header";

export default function Delete() {
  // For navigation during button click
  const navigate = useNavigate();
  // Extract the ID from the browser url
  const { id } = useParams();
  // Our student state information
  const [student, setStudent] = useState({
    name: "",
    course: "",
    matric_no: "",
    rfid_badge: "",
  });

  const [message, setMessage] = useState({
    show: false,
    msg: "",
    type: "",
  });

  // Get the student information by passing the ID into our MongoDB Atlas database
  useEffect(() => {
    const getStudent = async () => {
      const res = await axios.get(
        "https://rfid-project-j60u.onrender.com/api/v1/rfid-attendance-project/students/" +
          id +
          "/getStudent"
      );

      const { user } = res.data.data;

      setStudent(user);
    };
    getStudent();
  }, []);

  // Function to show or hide messages
  const showMessage = (show = false, type = "", msg = "") => {
    setMessage({ show, type, msg });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(
        "https://rfid-project-j60u.onrender.com/api/v1/rfid-attendance-project/students/" +
          id +
          "/delete-student"
      );

      clearStudentInfo();
    } catch (error) {
      showMessage(true, "error", error);
    }
  };

  // Clear student info after deletion
  const clearStudentInfo = () => {
    setStudent({
      name: "",
      course: "",
      matric_no: "",
      rfid_badge: "",
    });
  };

  // The user interface for the Delete page
  return (
    <>
      <Header />
      <div className="header">
        <h1>Delete Student</h1>
      </div>
      <section className="managePage">
        <form className="editForm" onSubmit={handleSubmit}>
          <div className="fields">
            <div className="imgColumn">
              <img
                src={
                  student.image
                    ? "https://rfid-project-j60u.onrender.com/images/" + student.image
                    : "https://rfid-project-j60u.onrender.com/images/defaultPic.png"
                }
                alt="Profile Pic"
              />
            </div>
            <div className="fieldsColumn">
              <div className="fieldRow">
                <label htmlFor="name" className="fieldLabel">
                  Student Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={student.name}
                  readOnly={true}
                  className="deleteInputs"
                />
              </div>
              <div className="fieldRow">
                <label htmlFor="course" className="fieldLabel">
                  Course
                </label>
                <input
                  type="text"
                  name="course"
                  id="course"
                  value={student.course}
                  readOnly={true}
                  className="deleteInputs"
                />
              </div>
              <div className="fieldRow">
                <label htmlFor="firstName" className="fieldLabel">
                  RFID Badge Number
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={student.rfid_badge}
                  readOnly={true}
                  className="deleteInputs"
                />
              </div>
              <div className="fieldRow">
                <label htmlFor="address" className="fieldLabel">
                  Matric No
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={student.matric_no}
                  readOnly={true}
                  className="deleteInputs"
                />
              </div>
            </div>
          </div>

          <div className="btnContainer">
            <button type="submit" className="bottomButton">
              Delete
            </button>
            <button
              type="button"
              className="bottomButton"
              onClick={() => navigate("/")}
            >
              Back
            </button>
          </div>
          <div>
            {message.show && (
              <Message {...message} removeMessage={showMessage} />
            )}
          </div>
        </form>
      </section>
    </>
  );
}
