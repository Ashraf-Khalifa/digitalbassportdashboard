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

function TankShop() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    title: "",
    price: "",
    content: "",
  });
  const [itemImage, setItemImage] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [updateItem, setUpdateItem] = useState({
    title: "",
    price: "",
    content: "",
    image_path: "", // Assuming you want to show the current image
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [itemCount, setItemCount] = useState(0); // State variable for item count

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    setItemImage(image);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("image", itemImage);
      formData.append("title", newItem.title);
      formData.append("price", newItem.price);
      formData.append("content", newItem.content);

      const response = await axios.post(
        "https://coral-app-harbz.ondigitalocean.app/shop/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Item added successfully:", response.data);
      fetchData();
      setNewItem({
        title: "",
        price: "",
        content: "",
      });
      setItemImage(null);
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://coral-app-harbz.ondigitalocean.app/shop/list"
      );
      setItems(response.data.data);
      setItemCount(response.data.data.length); // Update item count
      setLoading(false); // Set loading to false after data is fetched
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error(`Error getting data: ${error}`);
      setLoading(false); // Set loading to false in case of error
      setError("Error fetching data. Please try again later."); // Set the error message
    }
  };

  const handleDelete = async (itemId, imagePath) => {
    console.log("Deleting item with ID:", itemId);

    try {
      // Send a DELETE request to delete the item from the database
      await axios.delete(
        `https://coral-app-harbz.ondigitalocean.app/shop/delete/${itemId}`
      );

      // After successfully deleting the item and its image (if it had one),
      // filter it out from the 'items' state array
      setItems((prevItems) =>
        prevItems.filter((item) => item.id !== itemId)
      );
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleUpdate = (item) => {
    setSelectedItemId(item.id); // Set the selected item ID
    setUpdateItem({
      title: item.title,
      price: item.price,
      content: item.content,
      image_path: item.image_path, // Set the current image path
    });
    setShowUpdateForm(true); // Display the update form
  };

  const handleItemUpdate = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      if (itemImage) {
        formData.append("image", itemImage);
      }
      formData.append("title", updateItem.title);
      formData.append("price", updateItem.price);
      formData.append("content", updateItem.content);

      const response = await axios.put(
        `https://coral-app-harbz.ondigitalocean.app/shop/update/${selectedItemId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Check the response status and log the response data
      if (response.status === 200) {
        console.log("Item updated successfully:", response.data);
        fetchData();
        setUpdateItem({
          title: "",
          price: "",
          content: "",
          image_path: "",
        });
        setItemImage(null);
        setSelectedItemId(null);
      } else {
        console.error("Update request failed with status:", response.status);
        console.error("Response data:", response.data);
      }
    } catch (error) {
      console.error("Error updating item:", error);
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
                  value={newItem.title}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <label>Price:</label>
                <Input
                  type="text"
                  name="price"
                  value={newItem.price}
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
                  value={newItem.content}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <FormGroup>
                <label>Image:</label>
                <Input
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <div className="update ml-auto mr-auto">
                <Button
                  className="btn-round"
                  color="primary"
                  type="submit"
                >
                  Add Item
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
        <div className="content">
          <CardFooter>
            <div>Total Items: {itemCount}</div>
          </CardFooter>
        </div>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Shop Items List</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Content</th>
                        <th>Image</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr key={item.id}>
                          <td>{item.title}</td>
                          <td>{item.price}</td>
                          <td>{item.content}</td>
                          <td>
                            {item.image_path && (
                              <img
                                src={item.image_path}
                                alt={item.title}
                                style={{ maxWidth: "100px" }}
                              />
                            )}
                          </td>
                          <td>
                            <button
                              onClick={() =>
                                handleDelete(item.id, item.image_path)
                              }
                            >
                              Delete
                            </button>
                            <button onClick={() => handleUpdate(item)}>
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

      {/* Display the update form when showUpdateForm is true */}
      {showUpdateForm && (
        <div className="content">
          <Form onSubmit={handleItemUpdate}>
            <Row>
              <Col md="6">
                <FormGroup>
                  <label>Title:</label>
                  <Input
                    type="text"
                    name="title"
                    value={updateItem.title}
                    onChange={(e) =>
                      setUpdateItem({
                        ...updateItem,
                        title: e.target.value,
                      })
                    }
                  />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <label>Price:</label>
                  <Input
                    type="text"
                    name="price"
                    value={updateItem.price}
                    onChange={(e) =>
                      setUpdateItem({
                        ...updateItem,
                        price: e.target.value,
                      })
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
                    value={updateItem.content}
                    onChange={(e) =>
                      setUpdateItem({
                        ...updateItem,
                        content: e.target.value,
                      })
                    }
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <FormGroup>
                  <label>Image:</label>
                  <Input
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <div className="update ml-auto mr-auto">
                  <Button
                    className="btn-round"
                    color="primary"
                    type="submit"
                  >
                    Update Item
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

export default TankShop;
