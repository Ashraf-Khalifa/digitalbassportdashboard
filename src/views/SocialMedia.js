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

function SocialMedia() {
  const [links, setLinks] = useState([]);
  const [editingLink, setEditingLink] = useState(null);
  const [linkCount, setlinkCount] = useState(0);

  useEffect(() => {
    fetchSocialMediaLinks();
  }, []);

  const fetchSocialMediaLinks = async () => {
    try {
      const response = await axios.get("https://coral-app-harbz.ondigitalocean.app/social_media/list");
      if (response.data.success) {
        setLinks(response.data.data);
        setlinkCount(response.data.data.length);
      } else {
        console.error("API request was not successful:", response.data.errors);
      }
    } catch (error) {
      console.error("Error fetching social media links:", error);
    }
  };

  const addLink = async () => {
    try {
      const newLink = {
        link: document.getElementById("newLinkUrl").value,
      };

      await axios.post("https://coral-app-harbz.ondigitalocean.app/social_media/add", newLink);
      fetchSocialMediaLinks();
      document.getElementById("newLinkUrl").value = "";
    } catch (error) {
      console.error("Error adding social media link:", error);
    }
  };

  const updateLink = async () => {
    try {
      await axios.put(`https://coral-app-harbz.ondigitalocean.app/social_media/update/${editingLink.id}`, editingLink);
      fetchSocialMediaLinks();
      setEditingLink(null);
    } catch (error) {
      console.error("Error updating social media link:", error);
    }
  };

  const deleteLink = async (id) => {
    try {
      await axios.delete(`https://coral-app-harbz.ondigitalocean.app/social_media/delete/${id}`);
      fetchSocialMediaLinks();
    } catch (error) {
      console.error("Error deleting social media link:", error);
    }
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Social Media Links</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <label>Link URL:</label>
                        <Input
                          type="text"
                          name="link"
                          id="newLinkUrl"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Button
                    className="btn-round"
                    color="primary"
                    onClick={addLink}
                  >
                    Add Link
                  </Button>
                </Form>
                <div className="content">
        {/* ... Your JSX code ... */}
        <CardFooter>
          <div>Total links: {linkCount}</div>
        </CardFooter>
      </div>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Link</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {links.map((link) => (
                      <tr key={link.id}>
                        <td>{link.link}</td>
                        <td>
                          <Button
                            color="success"
                            onClick={() => setEditingLink(link)}
                          >
                            Edit
                          </Button>{" "}
                          <Button
                            color="danger"
                            onClick={() => deleteLink(link.id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
              {editingLink && (
                <CardFooter>
                  <Form>
                    <Row>
                      <Col md="6">
                        <FormGroup>
                          <label>Edit Link URL:</label>
                          <Input
                            type="text"
                            name="link"
                            value={editingLink.link}
                            onChange={(e) =>
                              setEditingLink({
                                ...editingLink,
                                link: e.target.value,
                              })
                            }
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Button
                      className="btn-round"
                      color="info"
                      onClick={updateLink}
                    >
                      Update Link
                    </Button>{" "}
                    <Button
                      className="btn-round"
                      color="secondary"
                      onClick={() => setEditingLink(null)}
                    >
                      Cancel
                    </Button>
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

export default SocialMedia;
