import React, { useState, useEffect } from "react";
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

function About() {
  const [aboutItems, setAboutItems] = useState([]);
  const [editingAboutItem, setEditingAboutItem] = useState(null);
  const [aboutItemCount, setAboutItemCount] = useState(0);

  useEffect(() => {
    fetchAboutItems();
  }, []);

  const fetchAboutItems = async () => {
    try {
      const response = await axios.get("https://coral-app-harbz.ondigitalocean.app/about/list");
      if (response.data.success) {
        setAboutItems(response.data.data);
        setAboutItemCount(response.data.data.length);
      } else {
        console.error("API request was not successful:", response.data.errors);
      }
    } catch (error) {
      console.error("Error fetching About items:", error);
    }
  };

  const addAboutItem = async () => {
    try {
      const newAboutItem = {
        title: document.getElementById("newAboutTitle").value,
        description: document.getElementById("newAboutDescription").value,
      };

      await axios.post("https://coral-app-harbz.ondigitalocean.app/about/add", newAboutItem);
      fetchAboutItems();
      document.getElementById("newAboutTitle").value = "";
      document.getElementById("newAboutDescription").value = "";
    } catch (error) {
      console.error("Error adding About item:", error);
    }
  };

  const updateAboutItem = async () => {
    try {
      await axios.put(`https://coral-app-harbz.ondigitalocean.app/about/update/${editingAboutItem.id}`, editingAboutItem);
      fetchAboutItems();
      setEditingAboutItem(null);
    } catch (error) {
      console.error("Error updating About item:", error);
    }
  };

  const deleteAboutItem = async (id) => {
    try {
      await axios.delete(`https://coral-app-harbz.ondigitalocean.app/about/delete/${id}`);
      fetchAboutItems();
    } catch (error) {
      console.error("Error deleting About item:", error);
    }
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">About Items</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col md="4">
                      <FormGroup>
                        <label>Title:</label>
                        <Input
                          type="text"
                          name="title"
                          id="newAboutTitle"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <label>Description:</label>
                        <Input
                          type="text"
                          name="description"
                          id="newAboutDescription"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <Button
                        className="btn-round"
                        color="primary"
                        onClick={addAboutItem}
                      >
                        Add About Item
                      </Button>
                    </Col>
                  </Row>
                </Form>
                <CardFooter>
                  <div>Total About Items: {aboutItemCount}</div>
                </CardFooter>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {aboutItems.map((item) => (
                      <tr key={item.id}>
                        <td>{item.title}</td>
                        <td>{item.description}</td>
                        <td>
                          <Button
                            color="success"
                            onClick={() => setEditingAboutItem(item)}
                          >
                            Edit
                          </Button>{" "}
                          <Button
                            color="danger"
                            onClick={() => deleteAboutItem(item.id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
              {editingAboutItem && (
                <CardFooter>
                  <Form>
                    <Row>
                      <Col md="4">
                        <FormGroup>
                          <label>Edit Title:</label>
                          <Input
                            type="text"
                            name="title"
                            value={editingAboutItem.title}
                            onChange={(e) =>
                              setEditingAboutItem({
                                ...editingAboutItem,
                                title: e.target.value,
                              })
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <label>Edit Description:</label>
                          <Input
                            type="text"
                            name="description"
                            value={editingAboutItem.description}
                            onChange={(e) =>
                              setEditingAboutItem({
                                ...editingAboutItem,
                                description: e.target.value,
                              })
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <Button
                          className="btn-round"
                          color="info"
                          onClick={updateAboutItem}
                        >
                          Update About Item
                        </Button>{" "}
                        <Button
                          className="btn-round"
                          color="secondary"
                          onClick={() => setEditingAboutItem(null)}
                        >
                          Cancel
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </CardFooter>
              )}
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default About;
