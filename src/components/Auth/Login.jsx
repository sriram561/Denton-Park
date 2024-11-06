import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase"; 
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import DynamicForm from "../DynamicForm/dynamicForm";
import { Link } from "react-router-dom";

const Login = ({ setUser, setLoggedInThroughLoginPage }) => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const { user } = userCredential;

      
      const userDoc = await getDoc(doc(db, "users", user.uid)); 
      const userData = userDoc.data();

      if (userData) {
        
        setUser({
          name: userData.name || user.email,
          role: userData.role,
          isAuthenticated: true,
        });
        setLoggedInThroughLoginPage(true);
        return "success";
      } else {
        throw new Error("User data not found in Firestore.");
      }
    } catch (error) {
      console.error("Login error: ", error.message);
      throw new Error("Login failed");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { email, password } = formValues;
      const trimmedEmail = email.trim();
      const trimmedPassword = password.trim();
      await login(trimmedEmail, trimmedPassword);

      
      const currentUser = await getDoc(doc(db, "users", auth.currentUser.uid));
      const role = currentUser.data().role;

      if (role === 'admin') {
        navigate("/admin"); 
      } else {
        navigate("/"); 
      }
    } catch (err) {
      setError("Failed to log in: " + err.message);
    }
  };

  const handleChange = (key, value) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const inputKeys = ["email", "password"];
  const labels = {
    email: "Email",
    password: "Password",
  };
  const inputTypes = {
    email: "email",
    password: "password",
  };
  const placeholders = {
    email: "Enter your email",
    password: "Enter your password",
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "2rem", textAlign: "center" }}>
      <h2>Login</h2>
      <form style={{ display: "grid", gap: "2vh" }} onSubmit={handleLogin}>
        <DynamicForm
          columns={1}
          inputKeys={inputKeys}
          labels={labels}
          inputTypes={inputTypes}
          values={formValues}
          onChangeHandlers={{
            email: (value) => handleChange("email", value),
            password: (value) => handleChange("password", value),
          }}
          placeholders={placeholders}
        />

        <button style={{ placeSelf: "center", padding: "0.5rem 2rem" }} className="primary-btn" type="submit">
          Log In
        </button>

        <p>Don't have an account? 
          <Link to="register"><button style={{ color: "#007BFF", textDecoration: "underline" }}>Register</button></Link>
        </p>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
