import React ,{useEffect,useState}from "react";

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
  Form, FormGroup, Input, Button
} from "reactstrap";
import "../assets/css/style.css";


function Events() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    content: "",
  });
  const [eventImage, setEventImage] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [updateEvent, setUpdateEvent] = useState({
    title: "",
    date: "",
    content: "",
    image_path: "", // Assuming you want to show the current image
  })
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [eventCount, setEventCount] = useState(0); // State variable for event coun

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    setEventImage(image);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("image", eventImage);
      formData.append("title", newEvent.title);
      formData.append("date", newEvent.date);
      formData.append("content", newEvent.content);

      const response = await axios.post(
        "http://localhost:3000/event/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Event added successfully:", response.data);
      fetchData();
      setNewEvent({
        title: "",
        date: "",
        content: "",
      });
      setEventImage(null);
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/event/list"
      );
      setEvents(response.data.data);
      setEventCount(response.data.data.length); // Update event count
      setLoading(false); // Set loading to false after data is fetched
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error(`Error getting data: ${error}`);
      setLoading(false); // Set loading to false in case of error
      setError("Error fetching data. Please try again later."); // Set the error message
    }
  };

  const handleDelete = async (eventId) => {
    console.log("Deleting event with ID:", eventId);
   
  
    try {
      // Send a DELETE request to delete the event from the database
      await axios.delete(
        `http://localhost:3000/event/delete/${eventId}`
      );
  
      // After successfully deleting the event and its image (if it had one),
      // filter it out from the 'events' state array
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== eventId)
      );
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };
  
  
  function formatDateToYYYYMMDD(date) {
    const eventDate = new Date(date);
    const year = eventDate.getFullYear();
    const month = (eventDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed, so we add 1
    const day = eventDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  
  
  

  const handleUpdate = (event) => {
    setSelectedEventId(event.id); // Set the selected event ID
    setUpdateEvent({
      title: event.title,
      date: formatDateToYYYYMMDD(event.date), // Format the date for display      content: event.content,
      image_path: event.image_path, // Set the current image path
    });
    setShowUpdateForm(true); // Display the update form
  };
  

  const handleEventUpdate = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      if (eventImage) {
        formData.append("image", eventImage);
      }
      formData.append("title", updateEvent.title);
      formData.append("date", updateEvent.date);
      formData.append("content", updateEvent.content);

      const response = await axios.put(
        `http://localhost:3000/event/update/${selectedEventId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Check the response status and log the response data
      if (response.status === 200) {
        console.log("Event updated successfully:", response.data);
        fetchData();
        setUpdateEvent({
          title: "",
          date: "",
          content: "",
          image_path: "",
        });
        setEventImage(null);
        setSelectedEventId(null);
      } else {
        console.error("Update request failed with status:", response.status);
        console.error("Response data:", response.data);
      }
    } catch (error) {
      console.error("Error updating event:", error);
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
          value={newEvent.title}
          onChange={handleInputChange}
        />
      </FormGroup>
    </Col>
    <Col md="6">
      <FormGroup>
        <label>Date:</label>
        <Input
          type="text"
          name="date"
          value={newEvent.date}
          onChange={handleInputChange}
        />
      </FormGroup>
    </Col>
  </Row>
  <Row>
    <Col md="12">
      <FormGroup>
      <label for="content" className="textarea-label">Content:</label>
               <textarea
                 style={{ width: '500px' }}
          type="text"
          name="content"
          value={newEvent.content}
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
          Add Event
        </Button>
      </div>
    </Col>
  </Row>
</Form>
<div className="content">
        {/* ... Your JSX code ... */}
        <CardFooter>
          <div>Total Events: {eventCount}</div>
        </CardFooter>
      </div>
        <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Event List</CardTitle>
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead className="text-primary">
                  <tr>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Content</th>
                    <th>Image</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                {events.map((event) => (
  <tr key={event.id}>
    <td>{event.title}</td>
    <td>{formatDateToYYYYMMDD(event.date)}</td> {/* Format the date here */}    <td>{event.content}</td>
    <td>
  {event.image_path && (
    <img
      src={`http://localhost:3000/uploads/${event.image_path}`}
      alt={event.title}
      style={{ maxWidth: '100px' }}
    />
  )}
</td>

    <td>
    <div className="button-container">
    <Button color="danger" onClick={() => handleDelete(event.id, event.image_path)} style={{ marginRight: '10px' }}>
      Delete
    </Button>
    <Button color="success" onClick={() => handleUpdate(event)}>
      Update
    </Button>
  </div>


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
    <Form onSubmit={handleEventUpdate}>
      {/* Add your update form fields here */}
      <Row>
        <Col md="7">
          <FormGroup>
            <label>Title:</label>
            <Input
              type="text"
              name="title"
              value={updateEvent.title}
              onChange={(e) =>
                setUpdateEvent({ ...updateEvent, title: e.target.value })
              }
            />
          </FormGroup>
        </Col>
        <Col md="7">
          <FormGroup>
            <label>Date:</label>
            <Input
              type="text"
              name="date"
              value={updateEvent.date}                            onChange={(e) =>
                setUpdateEvent({ ...updateEvent, date: e.target.value })
              }
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md="7">
          <FormGroup>
          <label for="content" className="textarea-label">Content:</label>
               <textarea
                 style={{ width: '500px' }}
              type="text"
              name="content"
              value={updateEvent.content}
              onChange={(e) =>
                setUpdateEvent({ ...updateEvent, content: e.target.value })
              }
            />
          </FormGroup>
        </Col>
        <Col md="7">
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
      {/* ... Other update form fields ... */}
      <Row>
        <Col md="12">
          <div className="update ml-auto mr-auto">
            <Button className="btn-round" color="primary" type="submit">
              Update Event
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

export default Events;