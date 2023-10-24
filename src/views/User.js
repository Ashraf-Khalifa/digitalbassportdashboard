// import React, { useState } from "react";
// import "../assets/css/Login.css";
// import axios from "axios";
// import {
//   Form,
//   FormGroup,
//   Label,
//   Input,
//   Button,
//   Card,
//   CardHeader,
//   CardBody,
//   CardTitle,
//   Table,
// } from "reactstrap";
// function SignupForm() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [roleError, setRoleError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");

//   const handleSignup = async (e) => {
//     e.preventDefault();

//     const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
//     const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{8,}$/; // Password pattern

//     if (!emailPattern.test(email)) {
//       setEmailError("Invalid email format");
//       setRoleError("");
//       setPasswordError("");
//       return;
//     }

//     // Check if the role is either 'standard' or 'admin'
//     if (role !== 'standard' && role !== 'admin') {
//       setRoleError("Role must be either 'standard' or 'admin'");
//       setEmailError("");
//       setPasswordError("");
//       return;
//     }

//     if (!passwordPattern.test(password)) {
//       setPasswordError("Password must contain at least one uppercase letter, one number, and be at least 8 characters long");
//       setEmailError("");
//       setRoleError("");
//       return;
//     }

//     try {
//       // Check if the email already exists in the database
//       const response = await axios.post("http://localhost:3000/admin/check-email", {
//         email,
//       });

//       if (response.data.exists) {
//         setEmailError("Email already exists. Please use a different email");
//         setRoleError("");
//         setPasswordError("");
//         setSuccessMessage("");
//         return;
//       }
//     } catch (error) {
//       console.error(error);
//     }

//     try {
//       const response = await axios.post("http://localhost:3000/admin/signup", {
//         email,
//         password,
//         role,      
//       });

//       if (response.status === 200) {
//         setEmailError("");
//         setRoleError("");
//         setPasswordError("");
//         setEmail("");
//         setPassword("");
//         setRole("");
//         setSuccessMessage("Added successfully!");
//         alert("Signup successful!");
//       }
//     } catch (error) {
//       console.error(error);
//       setEmailError("Email already exists. Please use a different email.");
//       setRoleError("");
//       setPasswordError("");
//       setSuccessMessage("");
//     }
//   };

//   return (
//     <div className="container">
//       <div id="login-form">
//         <h1>Add admin or super admin</h1>
//         <form onSubmit={handleSignup}>
//           <div>
//             <Label htmlFor="email">Email:</Label>
//             <Input
//               type="text"
//               id="email"
//               name="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//             {emailError && <span className="error">{emailError}</span>}
//           </div>
//           <div>
//             <Label htmlFor="password">Password:</Label>
//             <Input
//               type="password"
//               id="password"
//               name="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             {passwordError && <span className="error">{passwordError}</span>}
//           </div>
//           <div>
//             <Label htmlFor="role">Role:</Label>
//             <Input
//               type="text"
//               id="role"
//               name="role"
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//               required
//             />
//             {roleError && <span className="error">{roleError}</span>}
//           </div>
//           <div>
//             <input type="submit" value="Signup" />
//           </div>
//           {successMessage && <p>{successMessage}</p>}
//         </form>
//       </div>
//     </div>
//   );
// }

// export default SignupForm;
