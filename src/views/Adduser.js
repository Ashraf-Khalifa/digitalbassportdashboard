import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
} from "reactstrap";

function AddUpdateUser() {
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [updateUser, setUpdateUser] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [users, setUsers] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailExists, setEmailExists] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [roleError, setRoleError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Function to check if an email exists in the database
  const checkEmailExists = async (email) => {
    try {
      const response = await axios.get(`http://localhost:3000/admin/check-email/${email}`);
      if (response.data.exists) {
        setEmailExists(true);
        setEmailErrorMessage("Email already exists in the database");
      } else {
        setEmailExists(false);
        setEmailErrorMessage("");
      }
    } catch (error) {
      console.error("Error checking email existence:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (showUpdateForm) {
      setUpdateUser({ ...updateUser, [name]: value });
    } else {
      setNewUser({ ...newUser, [name]: value });
    }
    if (name === "email") {
      if (value && validateEmail(value)) {
        // Check if the email exists in the database
        checkEmailExists(value);
      } else {
        // Clear the email existence state and error message
        setEmailExists(false);
        setEmailErrorMessage("");
      }
    }
    if (name === "role") {
      if (value === "0" || value === "1") {
        // Clear the role error if the role is either 0 or 1
        setRoleError("");
        setEmailError("");
        setPasswordError("");
      } else {
        setRoleError("Role must be either 0 or 1");
        setEmailError("");
        setPasswordError("");
        return;
      }
    }
  };

  const validateEmail = (email) => {
    // Basic email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    // Password pattern: At least 8 characters, starting with a capital letter, and containing at least one number
    const passwordPattern = /^(?=[A-Z])(?=.*\d).{8,}$/;
    return passwordPattern.test(password);
  };

  const fetchDataForAddUser = async () => {
    try {
      // Fetch data for the Add User table
      const response = await axios.get("http://localhost:3000/admin/addUserList");
      setUsers(response.data);
    } catch (error) {
      console.error(`Error getting user data for Add User: ${error}`);
    }
  };

  const fetchDataForUpdateUser = async () => {
    try {
      // Fetch data for the Update User table
      const response = await axios.get("http://localhost:3000/admin/list");
      setUsers(response.data);
    } catch (error) {
      console.error(`Error getting user data for Update User: ${error}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = showUpdateForm ? updateUser : newUser;

    if (emailExists) {
      // Display the email error message if the email exists
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Invalid email format");
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 8 characters long, start with a capital letter, and contain at least one number");
      return;
    }

    // Clear the email and password errors if they are valid
    setEmailError("");
    setPasswordError("");

    try {
      if (showUpdateForm) {
        const response = await axios.put(
          `http://localhost:3000/admin/update/${selectedUserId}`,
          updateUser
        );

        if (response.status === 200) {
          console.log("User updated successfully:", response.data);
          fetchDataForUpdateUser();
          setShowUpdateForm(false);
        } else {
          console.error("Update request failed with status:", response.status);
        }
      } else {
        const response = await axios.post("http://localhost:3000/admin/signup", newUser);

        console.log("User added successfully:", response.data);
        fetchDataForAddUser();
        setNewUser({
          email: "",
          password: "",
          role: "",
        });
        setSuccessMessage("Added successfully!");
      }
    } catch (error) {
      setEmailError("Email already exists. Please use a different email.");
      setRoleError("Role must be either 0 or 1");
      console.error(showUpdateForm ? "Error updating user:" : "Error adding user:", error);
    }
  };

  const handleUpdate = (user) => {
    setSelectedUserId(user.id);
    setUpdateUser({
      email: user.email,
      password: user.password,
      role: user.role,
    });
    setShowUpdateForm(true);
  };

  const handleDelete = async (userId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/admin/delete/${userId}`);

      if (response.status === 200) {
        console.log("User deleted successfully");
        fetchDataForUpdateUser();
      } else {
        console.error("Delete request failed with status:", response.status);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    // Initial fetch for the Update User table
    fetchDataForUpdateUser();
  }, []);

  return (
<div className="content">
          <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="email">Email:</Label>
          <Input
            type="text"
            name="email"
            id="email"
            value={ newUser.email}
            onChange={handleInputChange}
            required
          />
      {emailError && <span className="error">{emailError}</span>}
      {emailExists && <span className="error">{emailErrorMessage}</span>}
      {emailExists && (
    <span className="error">
      Email already exists in the database
    </span>
  )}
        </FormGroup>
        <FormGroup>
          <Label for="password">Password:</Label>
          <Input
            type="password"
            name="password"
            id="password"
            value={ newUser.password}
            onChange={handleInputChange}
            required
          />
                      {passwordError && <span className="error">{passwordError}</span>}

        </FormGroup>
        <FormGroup>
          <Label for="role">Role:</Label>
          <Input
            type="text"
            name="role"
            id="role"
            value={ newUser.role}
            onChange={handleInputChange}
            required
          />
         {roleError && <span className="error">{roleError}</span>}

        </FormGroup>
        <Button color="primary" type="submit">
  {showUpdateForm ? "Update User" : "Add User"}
</Button>
{successMessage && <p>{successMessage}</p>}
      </Form>

      <Card>
        <CardHeader>
          <CardTitle tag="h4">User List</CardTitle>
        </CardHeader>
        <CardBody>
          <Table responsive>
            <thead className="text-primary">
              <tr>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <Button color="success" onClick={() => handleUpdate(user)}>
                      Update
                    </Button> {" "}
                    <Button color="danger" onClick={() => handleDelete(user.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>

      {showUpdateForm && (
        <Card>
          <CardHeader>
            <CardTitle tag="h4">Update User</CardTitle>
          </CardHeader>
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="email">Email:</Label>
                <Input
                  type="text"
                  name="email"
                  id="email"
                  value={updateUser.email}
                  onChange={handleInputChange}
                  required
                />
         {emailError && <span className="error">{emailError}</span>}
      {emailExists && <span className="error">{emailErrorMessage}</span>}
      {emailExists && (
    <span className="error">
      Email already exists in the database
    </span>
  )}
              </FormGroup>
              <FormGroup>
                <Label for="password">Password:</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  value={updateUser.password}
                  onChange={handleInputChange}
                  required
                />
                                      {passwordError && <span className="error">{passwordError}</span>}

              </FormGroup>
              <FormGroup>
                <Label for="role">Role:</Label>
                <Input
                  type="text"
                  name="role"
                  id="role"
                  value={updateUser.role}
                  onChange={handleInputChange}
                  required
                />
                         {roleError && <span className="error">{roleError}</span>}

              </FormGroup>
              
              <Button color="primary" type="submit">
                Update User
              </Button>
            </Form>
          </CardBody>
        </Card>
      )}
    </div>
  );
}

export default AddUpdateUser;
