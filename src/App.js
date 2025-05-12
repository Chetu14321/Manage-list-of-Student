import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import StudentList from "./components/StudentList"
import AddStudent from "./components/AddStudent";
import Login from "./components/Login";
import './App.css'
// import { useAuth, AuthProvider } from "./contex/AuthContext";
import { AuthProvider, useAuth } from "./contex/AuthContext";


const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/list" element={<StudentList />} />
          <Route path="/" element={<Login />} />
          <Route path="/add" element={<PrivateRoute><AddStudent /></PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
