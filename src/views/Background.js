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

function Background() {
  const [backgrounds, setBackgrounds] = useState([]);
  const [editingBackground, setEditingBackground] = useState(null);
  const [backgroundCount, setBackgroundCount] = useState(0);

  useEffect(() => {
    fetchBackgrounds();
  }, []);

  const fetchBackgrounds = async () => {
    try {
      const response = await axios.get("https://seashell-app-6v6yj.ondigitalocean.app/background/list");
      if (response.data.success) {
        setBackgrounds(response.data.data);
        setBackgroundCount(response.data.data.length);
      } else {
        console.error("API request was not successful:", response.data.errors);
      }
    } catch (error) {
      console.error("Error fetching backgrounds:", error);
    }
  };

  const addBackground = async () => {
    try {
      const newBackground = {
        name: document.getElementById("newBackgroundName").value,
        link: document.getElementById("newBackgroundLink").value,
      };

      await axios.post("https://seashell-app-6v6yj.ondigitalocean.app/background/add", newBackground);
      fetchBackgrounds();
      document.getElementById("newBackgroundName").value = "";
      document.getElementById("newBackgroundLink").value = "";
    } catch (error) {
      console.error("Error adding background:", error);
    }
  };

  const updateBackground = async () => {
    try {
      await axios.put(`https://seashell-app-6v6yj.ondigitalocean.app/background/update/${editingBackground.id}`, editingBackground);
      fetchBackgrounds();
      setEditingBackground(null);
    } catch (error) {
      console.error("Error updating background:", error);
    }
  };

  const deleteBackground = async (id) => {
    try {
      await axios.delete(`https://seashell-app-6v6yj.ondigitalocean.app/background/delete/${id}`);
      fetchBackgrounds();
    } catch (error) {
      console.error("Error deleting background:", error);
    }
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Backgrounds</CardTitle>
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
                          id="newBackgroundName"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <label>Link:</label>
                        <Input
                          type="text"
                          name="link"
                          id="newBackgroundLink"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <Button
                        className="btn-round"
                        color="primary"
                        onClick={addBackground}
                      >
                        Add Background
                      </Button>
                    </Col>
                  </Row>
                </Form>
                <CardFooter>
                  <div>Total backgrounds: {backgroundCount}</div>
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
                    {backgrounds.map((background) => (
                      <tr key={background.id}>
                        <td>{background.name}</td>
                        <td>{background.link}</td>
                        <td>
                          <Button
                            color="success"
                            onClick={() => setEditingBackground(background)}
                          >
                            Edit
                          </Button>{" "}
                          <Button
                            color="danger"
                            onClick={() => deleteBackground(background.id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
              {editingBackground && (
                <CardFooter>
                  <Form>
                    <Row>
                      <Col md="4">
                        <FormGroup>
                          <label>Edit Name:</label>
                          <Input
                            type="text"
                            name="name"
                            value={editingBackground.name}
                            onChange={(e) =>
                              setEditingBackground({
                                ...editingBackground,
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
                            value={editingBackground.link}
                            onChange={(e) =>
                              setEditingBackground({
                                ...editingBackground,
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
                          onClick={updateBackground}
                        >
                          Update Background
                        </Button>{" "}
                        <Button
                          className="btn-round"
                          color="secondary"
                          onClick={() => setEditingBackground(null)}
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

export default Background;
