import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/Login.css";
import Cookies from "js-cookie";
import axios from "axios";

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verify, setVerify] = useState(0); // Initialize "verify" to 0



  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:3000/admin/login", {
        email,
        password,
      });
  
      if (response.status === 200) {
        // Successful login, create a token and store it
        const token = response.data.token;
        const userRole = response.data.role;
  
        // Create a userData object
        const userData = {
          token,
          role: userRole,
        };
  
        // Store the userData object in local storage
        localStorage.setItem("userData", JSON.stringify(userData));
  
        // Store the token in local storage
        localStorage.setItem("token", token);
  
        // Store the user role in local storage
        localStorage.setItem("userRole", userRole);
  
        Cookies.set("token", token, { expires: 7 });
  
        setVerify(verify); // Update the "verify" state
  
        if (verify === 1) {
          // User is verified, you can add logic here if needed
        }
  
        // Navigate to the dashboard
        navigate("/admin/dashboard");
      }
    } catch (error) {
      // Handle login error, e.g., show an error message
      console.error(error);
    }
  };
  
  

  return (
    <div className="container">
      <div id="login-form">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <input type="submit" value="Submit" onClick={handleSubmit} />
          </div>
        </form>
      </div>
    </div>
    
  );
}

export default LoginForm;
