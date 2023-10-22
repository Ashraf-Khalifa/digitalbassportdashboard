import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  Table,
  Form,
  FormGroup,
  Input,
  Button,
} from "reactstrap";
import "../assets/css/style.css";

function UserManagement() {

  // State variables for users, loading, and other necessary data
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newUser, setNewUser] = useState({
    fullName: "",
    email: "",
    photoUrl: "",
    number: "",
    gender: "",
    birthdate: "",
    nationality: "",
    city: "",
    verify: "",
  });

  const navigate = useNavigate();

  // Function to fetch the list of users
  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://seashell-app-6v6yj.ondigitalocean.app/user/List");
      setUsers(response.data.data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching users. Please try again later.");
      setLoading(false);
    }
  };

  // Function to handle form submission for adding a new user
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://seashell-app-6v6yj.ondigitalocean.app/user/add", newUser);
      console.log("User added successfully:", response.data);

      // Clear the input fields
      setNewUser({
        fullName: "",
        email: "",
        photoUrl: "",
        number: "",
        gender: "",
        birthdate: "",
        nationality: "",
        city: "",
        verify: "",
      });

      // Fetch the updated list of users
      fetchUsers();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  useEffect(() => {
    
    fetchUsers();
  }, );

  return (
    <>
      <div className="content">
     
        <Card>
          <CardHeader>
            <CardTitle tag="h4">User List</CardTitle>
          </CardHeader>
          <CardFooter>
            <div>Total Users: {users.length}</div>
          </CardFooter>
          <CardBody>
            <Table responsive>
              <thead className="text-primary">
                <tr>
                  <th>fullName</th>
                  <th>Email</th>
                  <th>photoUrl</th>
                  <th>number</th>
                  <th>gender</th>
                  <th>birthdate</th>
                  <th>nationality</th>
                  <th>city</th>
                  <th>verify</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.fullName}</td>
                    <td>{user.email}</td>
                    <td>{user.photoUrl}</td>
                    <td>{user.number}</td>
                    <td>{user.gender}</td>
                    <td>{user.birthdate}</td>
                    <td>{user.nationality}</td>
                    <td>{user.city}</td>
                    <td>{user.verify}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
       
      </div>

      {/* Your form for adding a new user goes here */}
      {/* You can use a form similar to the QR code management form */}
    </>
  );
}

export default UserManagement;
