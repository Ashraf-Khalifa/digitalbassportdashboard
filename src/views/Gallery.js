import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
} from 'reactstrap';

function Gallery() {
  const [images, setImages] = useState([]);
  const [newImage, setNewImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [galleryCount, setgalleryCount] = useState(0);

  
  const handleImageChange = (e) => {
    const image = e.target.files[0];
    setNewImage(image);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('image', newImage);

      await axios.post('https://seashell-app-6v6yj.ondigitalocean.app/gallery/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Refresh the list of images after successful upload
      fetchImages();
      setNewImage(null);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const fetchImages = async () => {
    try {
      const response = await axios.get('https://seashell-app-6v6yj.ondigitalocean.app/gallery/images');
      setImages(response.data.data);
      setgalleryCount(response.data.data.length); 
      setLoading(false);
      setError(null);
    } catch (error) {
      console.error(`Error fetching images: ${error}`);
      setLoading(false);
      setError('Error fetching images. Please try again later.');
    }
  };

 

  const handleDelete = async (imageId) => {
    try {
      await axios.delete(`https://seashell-app-6v6yj.ondigitalocean.app/gallery/delete/${imageId}`);
      // Remove the deleted image from the state
      setImages((prevImages) => 
      prevImages.filter((image) => image.id !== imageId));
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };
  useEffect(() => {
    fetchImages();
  }, []);
  console.log("Images:", images);
  return (
    <>
      <div className="content">
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md="6">
              <FormGroup>
                <label>Image:</label>
                <Input type="file" name="image" onChange={handleImageChange} />
                <Button className="btn-round" color="primary" type="submit">
                  Upload Image
                </Button>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <div className="update ml-auto mr-auto">
                
              </div>
            </Col>
          </Row>
        </Form>
        <CardFooter>
          <div>Total gallery: {galleryCount}</div>
        </CardFooter>
   
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Image Gallery</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                <tbody>
  {images.map((image) => (
    <tr key={image.id}>
      <td>ID: {image.id}</td>
      <td>
        <img src={image.image_path} alt={image.image_path} />
      </td>
      
      <td>
        <button onClick={() => handleDelete(image.id)}>Delete</button>
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
    </>
  );
}

export default Gallery;

