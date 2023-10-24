import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/css/style.css";

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

function PrivacyPolicies() {
  const [policies, setPolicies] = useState([]);
  const [newPolicy, setNewPolicy] = useState({
    title: "",
    content: "",
  });
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedPolicyId, setSelectedPolicyId] = useState(null);
  const [updatePolicy, setUpdatePolicy] = useState({
    title: "",
    content: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPolicy({ ...newPolicy, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/privacy/add",
        newPolicy
      );

      console.log("Privacy policy added successfully:", response.data);
      fetchData();
      setNewPolicy({
        title: "",
        content: "",
      });
    } catch (error) {
      console.error("Error adding privacy policy:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/privacy/list");
      setPolicies(response.data.data);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.error(`Error getting data: ${error}`);
      setLoading(false);
      setError("Error fetching data. Please try again later.");
    }
  };

  const handleDelete = async (policyId) => {
    console.log("Deleting policy with ID:", policyId);

    try {
      await axios.delete(`http://localhost:3000/privacy/delete/${policyId}`);
      setPolicies((prevPolicies) =>
        prevPolicies.filter((policy) => policy.id !== policyId)
      );
    } catch (error) {
      console.error("Error deleting policy:", error);
    }
  };

  const handleUpdate = (policy) => {
    setSelectedPolicyId(policy.id);
    setUpdatePolicy({
      title: policy.title,
      content: policy.content,
    });
    setShowUpdateForm(true);
  };

  const handlePolicyUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:3000/privacy/update/${selectedPolicyId}`,
        updatePolicy
      );

      if (response.status === 200) {
        console.log("Privacy policy updated successfully:", response.data);
        fetchData();
        setUpdatePolicy({
          title: "",
          content: "",
        });
        setSelectedPolicyId(null);
      } else {
        console.error("Update request failed with status:", response.status);
        console.error("Response data:", response.data);
      }
    } catch (error) {
      console.error("Error updating privacy policy:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="content">
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md="6">
              <FormGroup>
                <label>Title:</label>
                <Input
                  type="text"
                  name="title"
                  value={newPolicy.title}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col md="12">
            <FormGroup>
               <label for="content" className="textarea-label">Content:</label>
               <textarea
                 style={{ width: '500px' }}
                 id="content"
                 name="content"
                 value={newPolicy.content}
                 onChange={handleInputChange}
               />

                </FormGroup>

            </Col>
          </Row>
          <Row>
            <Col md="12">
              <div className="update ml-auto mr-auto">
                <Button className="btn-round" color="primary" type="submit">
                  Add Policy
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
        <CardFooter>
          <div>Total Policies: {policies.length}</div>
        </CardFooter>
     
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Privacy Policy List</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Title</th>
                      <th>Content</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {policies.map((policy) => (
                      <tr key={policy.id}>
                        <td>{policy.title}</td>
                        <td>{policy.content}</td>
                        <td>
                          <Button 
                          color="danger"
                          onClick={() => handleDelete(policy.id)}>
                            Delete
                          </Button>{" "}
                          <Button 
                           color="success"
                          onClick={() => handleUpdate(policy)}>
                            Update
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

      {showUpdateForm && (
        <div className="content">
          <Form onSubmit={handlePolicyUpdate}>
            <Row>
              <Col md="6">
                <FormGroup>
                  <label>Title:</label>
                  <Input
                    type="text"
                    name="title"
                    value={updatePolicy.title}
                    onChange={(e) =>
                      setUpdatePolicy({ ...updatePolicy, title: e.target.value })
                    }
                  />
                </FormGroup>
              </Col>
              <Col md="12">
                <FormGroup>
                <label for="content" className="textarea-label">Content:</label>
               <textarea
                 style={{ width: '500px' }}
                    type="text"
                    name="content"
                    value={updatePolicy.content}
                    onChange={(e) =>
                      setUpdatePolicy({ ...updatePolicy, content: e.target.value })
                    }
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <div className="update ml-auto mr-auto">
                  <Button className="btn-round" color="primary" type="submit">
                    Update Policy
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      )}
    </>
  );
}

export default PrivacyPolicies;
