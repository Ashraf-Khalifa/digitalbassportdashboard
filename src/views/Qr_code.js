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
import "../assets/css/style.css"; 


function QRManagement() {
  const [qrcodes, setQRcodes] = useState([]); // Initialize qrcodes as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newQR, setNewQR] = useState({
    title: "",
    description: "",
    qr_code_url: "",
    name: "",
    image: null,
    audio: null,
    video: null,
    logo: null,
  });
  const [deleteImage, setDeleteImage] = useState(false);
  const [deleteAudio, setDeleteAudio] = useState(false);
  const [deleteVideo, setDeleteVideo] = useState(false);
  const [deleteLogo, setDeleteLogo] = useState(false)
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [qrImage, setQRImage] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedQRId, setSelectedQRId] = useState(null);
  const [updateQR, setUpdateQR] = useState({
    title: "",
    description: "",
    qr_code_url: "",
    name: "",
    image: null,
    audio: null,
    video: null,
    logo: null,
  });

  const [qrCodeCount, setQRCodeCount] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewQR({ ...newQR, [name]: value });
  };

  const handleImageChange = (e, fieldName) => {
    const file = e.target.files[0];
    setUpdateQR((prevUpdateQR) => ({
      ...prevUpdateQR,
      [fieldName]: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("image", newQR.image);
      formData.append("title", newQR.title);
      formData.append("description", newQR.description);
      formData.append("qr_code_url", newQR.qr_code_url);
      formData.append("audio", newQR.audio);
      formData.append("video", newQR.video);
      formData.append("logo", newQR.logo);

      const response = await axios.post(
        "http://localhost:3000/qr/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("QR code added successfully:", response.data);
      fetchData();
      setNewQR({
        title: "",
        description: "",
        qr_code_url: "",
        name: "",
        image: null,
        audio: null,
        video: null,
        logo: null,
      });
      setQRImage(null);
    } catch (error) {
      console.error("Error adding QR code:", error);
    }
  }

   const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/qr/list");
      if (response.status === 200) {
        setQRcodes(response.data.data); // Update qrcodes with the fetched data
        setQRCodeCount(response.data.data.length); // Set the QR code count
        setLoading(false);
        setError(null);
      } else {
        setError("API returned an error status: " + response.status);
      }
    } catch (error) {
      console.error(`Error getting data: ${error}`);
      setLoading(false);
      setError("Error fetching data. Please try again later.");
    }
  };
  

  const handleDelete = async (qrId, image_path) => {
    console.log("Deleting QR code with ID:", qrId);

    try {
      await axios.delete(
        `http://localhost:3000/delete/${qrId}`
      );

      setQRcodes((prevQRcodes) =>
        prevQRcodes.filter((qr) => qr.id !== qrId)
      );

      // If there is an image associated with the QR code, you can delete it too
      if (image_path) {
        await axios.delete(image_path);
      }
    } catch (error) {
      console.error("Error deleting QR code:", error);
    }
  };

  const handleUpdate = (qr) => {
    setSelectedQRId(qr.id);
    setUpdateQR({
      title: qr.title,
      description: qr.description,
      qr_code_url: qr.qr_code_url,
      name: qr.name,
      image: null,
      audio: null,
      video: null,
      logo: null,
    });
    setShowUpdateForm(true);
    setDeleteImage(false); // Reset deleteImage flag
    setDeleteImage(false); // Reset deleteImage flag
    setDeleteAudio(false); // Reset deleteAudio flag
    setDeleteVideo(false); // Reset deleteVideo flag
    setDeleteLogo(false); // Reset deleteLogo flag

  // Create URLs for image, audio, video, and logo for preview
  if (qr.image) {
    fetch(qr.image)
      .then((response) => response.blob())
      .then((data) => {
        const imageUrl = URL.createObjectURL(data);
        setUpdateQR((prevUpdateQR) => ({
          ...prevUpdateQR,
          image: imageUrl,
        }));
      });
  }

  if (qr.audio) {
    fetch(qr.audio)
      .then((response) => response.blob())
      .then((data) => {
        const audioUrl = URL.createObjectURL(data);
        setUpdateQR((prevUpdateQR) => ({
          ...prevUpdateQR,
          audio: audioUrl,
        }));
      });
  }

  if (qr.video) {
    fetch(qr.video)
      .then((response) => response.blob())
      .then((data) => {
        const videoUrl = URL.createObjectURL(data);
        setUpdateQR((prevUpdateQR) => ({
          ...prevUpdateQR,
          video: videoUrl,
        }));
      });
  }

  if (qr.logo) {
    fetch(qr.logo)
      .then((response) => response.blob())
      .then((data) => {
        const logoUrl = URL.createObjectURL(data);
        setUpdateQR((prevUpdateQR) => ({
          ...prevUpdateQR,
          logo: logoUrl,
        }));
      });
  }
};

const handleQRUpdate = async (e) => {
  e.preventDefault();

  if (selectedQRId === null) {
    console.error("Selected QR ID is null. Make sure it's set properly.");
    return;
  }

  try {
    const formData = new FormData();

    // Append fields to formData only if they are defined (not null) or flagged for deletion
    formData.append("title", updateQR.title);
    formData.append("description", updateQR.description);
    formData.append("qr_code_url", updateQR.qr_code_url);
    formData.append("name", updateQR.name);

    if (updateQR.image || deleteImage) {
      if (deleteImage) {
        formData.append("deleteImage", deleteImage);
        // Add a request to delete the image
        await axios.delete(`http://localhost:3000/qr/deleteImage/${selectedQRId}`);
      } else {
        formData.append("image", updateQR.image);
      }
    }

    if (updateQR.audio || deleteAudio) {
      if (deleteAudio) {
        formData.append("deleteAudio", deleteAudio);
        // Add a request to delete the audio file
        await axios.delete(`http://localhost:3000/qr/deleteaudio/${selectedQRId}`);
      } else {
        formData.append("audio", updateQR.audio);
      }
    }

    if (updateQR.video || deleteVideo) {
      if (deleteVideo) {
        formData.append("deleteVideo", deleteVideo);
        // Add a request to delete the video file
        await axios.delete(`http://localhost:3000/qr/deletevideo/${selectedQRId}`);
      } else {
        formData.append("video", updateQR.video);
      }
    }

    if (updateQR.logo || deleteLogo) {
      if (deleteLogo) {
        formData.append("deleteLogo", deleteLogo);
        // Add a request to delete the logo file
        await axios.delete(`http://localhost:3000/qr/deletelogo/${selectedQRId}`);
      } else {
        formData.append("logo", updateQR.logo);
      }
    }

    const response = await axios.put(
      `http://localhost:3000/qr/update/${selectedQRId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status === 200) {
      console.log("QR code updated successfully:", response.data);
      fetchData();
      setUpdateQR({
        title: "",
        description: "",
        qr_code_url: "",
        name: "",
        image: null,
        audio: null,
        video: null,
        logo: null,
      });
      setSelectedQRId(null);
      setDeleteImage(false); // Reset delete options
      setDeleteAudio(false);
      setDeleteVideo(false);
      setDeleteLogo(false);
    } else {
      console.error("Update request failed with status:", response.status);
      console.error("Response data:", response.data);
    }
  } catch (error) {
    console.error("Error updating QR code:", error);
  }
};

  


  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
    <div className="content">
      <Card>
        <CardHeader>
          <CardTitle tag="h4">QR Code List</CardTitle>
        </CardHeader>
        <CardFooter>
          <div>Total QR Codes: {qrCodeCount}</div>
        </CardFooter>
        <CardBody>
          <Table responsive>
            <thead className="text-primary">
              <tr>
                <th>Name</th>
                <th>Title</th>
                <th>Description</th>
                {/* <th>QR Code URL</th> */}
                <th>Image</th>
                <th>Audio</th>
                <th>Video</th>
                <th>Logo</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {qrcodes.map((qr) => (
                <tr key={qr.id}>
                    <td>{qr.name}</td>
                    <td>{qr.title}</td>
                    <td>{qr.description}</td>
                    <td>{qr.qr_code_url}</td>
                    <td>
                      {qr.image && <img src={qr.image} alt={qr.image} />}
                    </td>
                    <td>
  {qr.audio && (
    <div>
      <p>Audio Path: {qr.audio}</p>
     
    </div>
  )}
</td>
<td>
  {qr.video && (
    <div>
      <p>Video Path: {qr.video}</p>
      
    </div>
  )}
</td>

                    <td>
                      {qr.logo && <img src={qr.logo} alt={qr.logo} />}
                    </td>
                    <td>
                      <Button
                       color="success"
                      onClick={() => handleUpdate(qr)}>Update</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </div>

      {showUpdateForm && (
        <div className="content">
         <Form onSubmit={handleQRUpdate}>
  <Row>
    <Col md="6">
      <FormGroup>
        <label>Title:</label>
        <Input
          type="text"
          name="title"
          value={updateQR.title}
          onChange={(e) =>
            setUpdateQR({ ...updateQR, title: e.target.value })
          }
          dir="rtl"
        />
      </FormGroup>
    </Col>
    <Col md="12">
    <FormGroup>
  <label>Description:</label><br />
  <textarea
    name="description"
    value={updateQR.description}
    onChange={(e) =>
      setUpdateQR({ ...updateQR, description: e.target.value })
    }
    style={{
      width: '560px',
    }}
    dir="rtl"
  ></textarea>
</FormGroup>
    </Col>
  </Row>
  <Row>
    
    <Col md="6">
      <FormGroup>
        <label>Name:</label>
        <Input
          type="text"
          name="name"
          value={updateQR.name}
          onChange={(e) =>
            setUpdateQR({ ...updateQR, name: e.target.value })
          }
          dir="rtl"
        />
      </FormGroup>
    </Col>
  </Row>
  <Row>
    <Col md="6">
      <FormGroup>
        <label>Image:</label>
        <Input
          type="file"
          name="image"
          onChange={(e) => handleImageChange(e, "image")}
        />
        
      <Button
  className={`btn-round ${isButtonClicked ? 'danger' : 'danger'}`}
  type="button"
  onClick={() => {
    setDeleteImage(true);
    setIsButtonClicked(true); // Set the state to indicate the button has been clicked
  }}
>
  Delete Image
</Button>
      </FormGroup>
    </Col>
    <Col md="6">
      <FormGroup>
        <label>Audio:</label>
        <Input
          type="file"
          name="audio"
          onChange={(e) => handleImageChange(e, "audio")}
        />
         <Button
            className={`btn-round ${isButtonClicked ? 'danger' : 'danger'}`}
            type="button"
            onClick={() => {
            setDeleteAudio(true)
            setIsButtonClicked(true); // Set the state to indicate the button has been clicked
          }}
        >
            Delete Audio
          </Button>
      </FormGroup>
    </Col>
  </Row>
  <Row>
    <Col md="6">
      <FormGroup>
        <label>Video:</label>
        <Input
          type="file"
          name="video"
          onChange={(e) => handleImageChange(e, "video")}
        />
        <Button
          className={`btn-round ${isButtonClicked ? 'danger' : 'danger'}`}
          type="button"
          onClick={() => {
            setDeleteVideo(true)
            setIsButtonClicked(true); // Set the state to indicate the button has been clicked
        }}
      >
            Delete Video
          </Button>
      </FormGroup>
    </Col>
    <Col md="6">
      <FormGroup>
        <label>Logo:</label>
        <Input
          type="file"
          name="logo"
          onChange={(e) => handleImageChange(e, "logo")}
        />
        <Button
            className={`btn-round ${isButtonClicked ? 'danger' : 'danger'}`}
            type="button"
            onClick={() => {
              setDeleteLogo(true)
              setIsButtonClicked(true); // Set the state to indicate the button has been clicked
          }}
        >
            Delete Logo
          </Button>
      </FormGroup>
    </Col>
  </Row>
  <Row>
    <Col md="12">
      <div className="update ml-auto mr-auto">
        <Button className="btn-round" color="primary" type="submit">
          Update QR Code
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

export default QRManagement;
