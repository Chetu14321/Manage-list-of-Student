import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [students, setStudents] = useState([]);
  const [courseFilter, setCourseFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(true);

  const [student, setStudent] = useState({
    name: "",
    email: "",
    course: "",
  });

  const fetchStudents = () => {
    axios
      .get("https://student-management-system-1-9321.onrender.com/students/all")
      .then((res) => {
        setStudents(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch students", err);
        setError("Error loading students");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!student.name || !student.email.includes("@") || !student.course) {
      alert("Please enter valid student details.");
      return;
    }

    axios
      .post("https://student-management-system-1-9321.onrender.com/students", student)
      .then(() => {
        alert("Student added successfully");
        setStudent({ name: "", email: "", course: "" });
        fetchStudents();
      })
      .catch((err) => {
        console.error("Error adding student", err);
        alert("Failed to add student");
      });
  };

  const filtered = students.filter((s) =>
    s.course.toLowerCase().includes(courseFilter.toLowerCase())
  );

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-md-10 offset-md-1">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Student Management System</h5>
              <div className="btn-group">
                <button
                  className={`btn ${
                    showForm ? "btn-light text-primary" : "btn-outline-light"
                  }`}
                  onClick={() => setShowForm(true)}
                >
                  Add Student
                </button>
                <button
                  className={`btn ${
                    !showForm ? "btn-light text-primary" : "btn-outline-light"
                  }`}
                  onClick={() => setShowForm(false)}
                >
                  View List
                </button>
              </div>
            </div>

            <div className="card-body">
              {showForm ? (
                <form onSubmit={handleAddStudent}>
                  <div className="form-group mt-2">
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter student name"
                      value={student.name}
                      onChange={(e) =>
                        setStudent({ ...student, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-group mt-2">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter email"
                      value={student.email}
                      onChange={(e) =>
                        setStudent({ ...student, email: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-group mt-2">
                    <label>Course</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter course name"
                      value={student.course}
                      onChange={(e) =>
                        setStudent({ ...student, course: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-group mt-3">
                    <button type="submit" className="btn btn-success me-2">
                      Submit
                    </button>
                    <button
                      type="reset"
                      className="btn btn-warning"
                      onClick={() =>
                        setStudent({ name: "", email: "", course: "" })
                      }
                    >
                      Clear
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="form-group mt-2">
                    <input
                      className="form-control"
                      placeholder="Filter by course"
                      value={courseFilter}
                      onChange={(e) => setCourseFilter(e.target.value)}
                    />
                  </div>

                  {loading && (
                    <div className="alert alert-info mt-3">
                      Loading students...
                    </div>
                  )}
                  {error && (
                    <div className="alert alert-danger mt-3">{error}</div>
                  )}

                  <ul className="list-group mt-3">
                    {filtered.map((s) => (
                      <li
                        key={s._id || s.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <div>
                          <strong>{s.name}</strong> — {s.email}
                        </div>
                        <span className="badge bg-secondary">{s.course}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
