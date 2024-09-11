import React, { useState, useEffect } from "react";
import "./cards.css";
import { Link } from "react-router-dom";

export default function Cards({ students }) {
  // Helper function to format the time of day
  function formatTimeOfDay(date) {
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return new Date(date).toLocaleTimeString([], options);
  }

  // Helper function to calculate time ago
  function timeAgo(date) {
    const now = new Date();
    const past = new Date(date);
    const diff = Math.floor((now - past) / 1000);

    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      min: 60,
      sec: 1,
    };

    for (const interval in intervals) {
      const timeDiff = Math.floor(diff / intervals[interval]);
      if (timeDiff > 0) {
        return timeDiff === 1
          ? `${timeDiff} ${interval} ago`
          : `${timeDiff} ${interval}s ago`;
      }
    }
    return "just now";
  }

  // State to store the current time
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update the current time every minute
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every 60 seconds

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="cardsWrapper">
      <div className="cards">
        {students.length === 0 && <p>No student(s) found</p>}
        {students.map((student) => {
          return (
            <div key={student.id} className="card">
              <img
                src={
                  student.image
                    ? "http://localhost:8080/images/" + student.image
                    : "http://localhost:8080/images/defaultPic.png"
                }
                alt="profile pic"
              />
              <h3>{student.name}</h3>
              <div className="text">
                <p>
                  <span className="label">
                    <b>Course:</b> {student.course}
                  </span>
                </p>
                <p>
                  <span className="label">
                    <b>Matric No:</b> {student.matric_no}
                  </span>
                </p>
                <p>
                  <span className="label">
                    <b>RFID Number:</b> {student.rfid_badge}
                  </span>
                </p>
                <p>
                  <span className="label">
                    <b>Date:</b> {new Date(student.created_at).toDateString()}
                  </span>
                </p>
                <p>
                  <span className="label">
                    <b>Time:</b> {formatTimeOfDay(student.created_at)}{" "}
                    {timeAgo(student.created_at)}
                  </span>
                </p>
              </div>
              <div className="btnContainer">
                <Link to={`delete/${student.id}`} className="cardBtn m-top">
                  Delete
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
