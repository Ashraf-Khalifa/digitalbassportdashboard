// Terms.js (Front-End)

import React, { useEffect, useState } from "react";
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

function Terms() {
  const [terms, setTerms] = useState([]);
  const [newTerm, setNewTerm] = useState({
    title: "",
    content: "",
  });
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedTermId, setSelectedTermId] = useState(null);
  const [updateTerm, setUpdateTerm] = useState({
    title: "",
    content: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [termCount, setTermCount] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTerm({ ...newTerm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://coral-app-harbz.ondigitalocean.app/terms/add", newTerm);

      console.log("Term added successfully:", response.data);
      fetchData();
      setNewTerm({
        title: "",
        content: "",
      });
    } catch (error) {
      console.error("Error adding term:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("https://coral-app-harbz.ondigitalocean.app/terms/list");
      setTerms(response.data.data);
      setTermCount(response.data.data.length);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.error(`Error getting data: ${error}`);
      setLoading(false);
      setError("Error fetching data. Please try again later.");
    }
  };

  const handleDelete = async (termId) => {
    console.log("Deleting term with ID:", termId);

    try {
      await axios.delete(`https://coral-app-harbz.ondigitalocean.app/terms/delete/${termId}`);
      setTerms((prevTerms) => prevTerms.filter((term) => term.id !== termId));
    } catch (error) {
      console.error("Error deleting term:", error);
    }
  };

  const handleUpdate = (term) => {
    setSelectedTermId(term.id);
    setUpdateTerm({
      title: term.title,
      content: term.content,
    });
    setShowUpdateForm(true);
  };

  const handleTermUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `https://coral-app-harbz.ondigitalocean.app/terms/update/${selectedTermId}`,
        updateTerm
      );

      if (response.status === 200) {
        console.log("Term updated successfully:", response.data);
        fetchData();
        setUpdateTerm({
          title: "",
          content: "",
        });
        setSelectedTermId(null);
      } else {
        console.error("Update request failed with status:", response.status);
        console.error("Response data:", response.data);
      }
    } catch (error) {
      console.error("Error updating term:", error);
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
                  value={newTerm.title}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <FormGroup>
                <label>Content:</label>
                <Input
                  type="text"
                  name="content"
                  value={newTerm.content}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <div className="update ml-auto mr-auto">
                <Button className="btn-round" color="primary" type="submit">
                  Add Term
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
        <div className="content">
          <CardFooter>
            <div>Total Terms: {termCount}</div>
          </CardFooter>
        </div>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Term List</CardTitle>
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
                      {terms.map((term) => (
                        <tr key={term.id}>
                          <td>{term.title}</td>
                          <td>{term.content}</td>
                          <td>
                            <button onClick={() => handleDelete(term.id)}>
                              Delete
                            </button>
                            <button onClick={() => handleUpdate(term)}>
                              Update
                            </button>
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
      </div>

      {showUpdateForm && (
        <div className="content">
          <Form onSubmit={handleTermUpdate}>
            <Row>
              <Col md="6">
                <FormGroup>
                  <label>Title:</label>
                  <Input
                    type="text"
                    name="title"
                    value={updateTerm.title}
                    onChange={(e) =>
                      setUpdateTerm({ ...updateTerm, title: e.target.value })
                    }
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <FormGroup>
                  <label>Content:</label>
                  <Input
                    type="text"
                    name="content"
                    value={updateTerm.content}
                    onChange={(e) =>
                      setUpdateTerm({ ...updateTerm, content: e.target.value })
                    }
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <div className="update ml-auto mr-auto">
                  <Button className="btn-round" color="primary" type="submit">
                    Update Term
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

export default Terms;
