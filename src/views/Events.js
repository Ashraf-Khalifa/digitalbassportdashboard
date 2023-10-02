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
        "https://coral-app-harbz.ondigitalocean.app/event/add",
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
        "https://coral-app-harbz.ondigitalocean.app/event/list"
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
        `https://coral-app-harbz.ondigitalocean.app/event/delete/${eventId}`
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
  
  
  
  
  
  

  const handleUpdate = (event) => {
    setSelectedEventId(event.id); // Set the selected event ID
    setUpdateEvent({
      title: event.title,
      date: event.date,
      content: event.content,
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
        `https://orca-app-monkj.ondigitalocean.app/event/update/${selectedEventId}`,
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
        <label>Content:</label>
        <Input
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
    <td>{event.date}</td>
    <td>{event.content}</td>
    <td>
      {event.image_path && (
        <img src={event.image_path} alt={event.image_path} />
      )}
    </td>
    <td>
    <button onClick={() => handleDelete(event.id, event.image_path)}>Delete</button>
    <button onClick={() => handleUpdate(event)}>Update</button>


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
        <Col md="6">
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
        <Col md="6">
          <FormGroup>
            <label>Date:</label>
            <Input
              type="text"
              name="date"
              value={updateEvent.date}
              onChange={(e) =>
                setUpdateEvent({ ...updateEvent, date: e.target.value })
              }
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <FormGroup>
            <label>Content:</label>
            <Input
              type="text"
              name="content"
              value={updateEvent.content}
              onChange={(e) =>
                setUpdateEvent({ ...updateEvent, content: e.target.value })
              }
            />
          </FormGroup>
        </Col>
        <Col md="6">
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