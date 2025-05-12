import { useState } from "react";

const AddStudent = () => {
  const [student, setStudent] = useState({ name: "", email: "", course: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !student.name ||
      !student.email ||
      !student.course ||
      !student.email.includes("@")
    ) {
      alert("Please fill valid details");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(student),
      });

      if (!response.ok) {
        throw new Error("Failed to add student");
      }

      const data = await response.json();
      alert("Student added successfully!");
      console.log("Added student:", data);

      // Clear form
      setStudent({ name: "", email: "", course: "" });
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding student");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Student</h2>
      <input
        placeholder="Name"
        value={student.name}
        onChange={(e) => setStudent({ ...student, name: e.target.value })}
      />
      <input
        placeholder="Email"
        value={student.email}
        onChange={(e) => setStudent({ ...student, email: e.target.value })}
      />
      <input
        placeholder="Course"
        value={student.course}
        onChange={(e) => setStudent({ ...student, course: e.target.value })}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddStudent;
