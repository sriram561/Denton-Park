import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import DynamicForm from "../DynamicForm/dynamicForm";
import bg from "../../assets/aPark2.jpg";

const Register = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { email, password, name } = formValues;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const adminEmails = ["mans22@gmail.com", "emily1234@gmail.com", "june245@gmail.com", "akshaykumarmandala06@gmail.com"];
      const role = adminEmails.includes(email) ? "admin" : "user";
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        name,
        role,
      });

      alert("User registered successfully!");

      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

    } catch (err) {
      setError("Failed to register: " + err.message);
    }
  };

  const handleChange = (key, value) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const inputKeys = ["name", "email", "password"];
  const labels = {
    name: "Name",
    email: "Email",
    password: "Password",
  };
  const inputTypes = {
    name: "text",
    email: "email",
    password: "password",
  };
  const placeholders = {
    name: "Enter your name",
    email: "Enter your email",
    password: "Enter your password",
  };

  return (
    <div
      className="flex justify-center items-center h-[100vh]"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div style={{ maxWidth: "400px", margin: "auto", padding: "2rem", textAlign: "center", backgroundColor: "rgba(255, 255, 255, 0.6)", borderRadius: "8px" }}>
        <h2>Register</h2>
        <form style={{ display: "grid", gap: "2vh" }} onSubmit={handleRegister}>
          <DynamicForm
            columns={1}
            inputKeys={inputKeys}
            labels={labels}
            inputTypes={inputTypes}
            values={formValues}
            onChangeHandlers={{
              name: (value) => handleChange("name", value),
              email: (value) => handleChange("email", value),
              password: (value) => handleChange("password", value),
            }}
            placeholders={placeholders}
          />
          <button style={{ placeSelf: "end" }} className="primary-btn" type="submit">
            Register
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Register;
