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

function Icons() {
  const [icons, setIcons] = useState([]);
  const [editingIcon, setEditingIcon] = useState(null);
  const [iconCount, setIconCount] = useState(0);

  useEffect(() => {
    fetchIcons();
  }, []);

  const fetchIcons = async () => {
    try {
      const response = await axios.get("http://localhost:3000/icons/list");
      if (response.data.success) {
        setIcons(response.data.data);
        setIconCount(response.data.data.length);
      } else {
        console.error("API request was not successful:", response.data.errors);
      }
    } catch (error) {
      console.error("Error fetching icons:", error);
    }
  };

  const addIcon = async () => {
    try {
      const newIcon = {
        name: document.getElementById("newIconName").value,
        link: document.getElementById("newIconLink").value,
      };

      await axios.post("http://localhost:3000/icons/add", newIcon);
      fetchIcons();
      document.getElementById("newIconName").value = "";
      document.getElementById("newIconLink").value = "";
    } catch (error) {
      console.error("Error adding icon:", error);
    }
  };

  const updateIcon = async () => {
    try {
      await axios.put(`http://localhost:3000/icons/update/${editingIcon.id}`, editingIcon);
      fetchIcons();
      setEditingIcon(null);
    } catch (error) {
      console.error("Error updating icon:", error);
    }
  };

  const deleteIcon = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/icons/delete/${id}`);
      fetchIcons();
    } catch (error) {
      console.error("Error deleting icon:", error);
    }
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Icons</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col md="4">
                      <FormGroup>
                        <label>Name:</label>
                        <Input
                          type="text"
                          name="name"
                          id="newIconName"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <label>Link:</label>
                        <Input
                          type="text"
                          name="link"
                          id="newIconLink"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <Button
                        className="btn-round"
                        color="primary"
                        onClick={addIcon}
                      >
                        Add Icon
                      </Button>
                    </Col>
                  </Row>
                </Form>
                <CardFooter>
                  <div>Total icons: {iconCount}</div>
                </CardFooter>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      <th>Link</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {icons.map((icon) => (
                      <tr key={icon.id}>
                        <td>{icon.name}</td>
                        <td>{icon.link}</td>
                        <td>
                          <Button
                            color="success"
                            onClick={() => setEditingIcon(icon)}
                          >
                            Edit
                          </Button>{" "}
                          <Button
                            color="danger"
                            onClick={() => deleteIcon(icon.id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
              {editingIcon && (
                <CardFooter>
                  <Form>
                    <Row>
                      <Col md="4">
                        <FormGroup>
                          <label>Edit Name:</label>
                          <Input
                            type="text"
                            name="name"
                            value={editingIcon.name}
                            onChange={(e) =>
                              setEditingIcon({
                                ...editingIcon,
                                name: e.target.value,
                              })
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <label>Edit Link:</label>
                          <Input
                            type="text"
                            name="link"
                            value={editingIcon.link}
                            onChange={(e) =>
                              setEditingIcon({
                                ...editingIcon,
                                link: e.target.value,
                              })
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <Button
                          className="btn-round"
                          color="info"
                          onClick={updateIcon}
                        >
                          Update Icon
                        </Button>{" "}
                        <Button
                          className="btn-round"
                          color="secondary"
                          onClick={() => setEditingIcon(null)}
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

export default Icons;
