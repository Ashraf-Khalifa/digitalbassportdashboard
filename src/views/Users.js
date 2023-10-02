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

function Users() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userCount, setUserCount] = useState(0);
  const fetchUserCount = async () => {
    try {
      const response = await axios.get(
        "https://coral-app-harbz.ondigitalocean.app/user/count"
      );
      const userCount = response.data.data[0].count; // Access the count property inside data
      setUserCount(userCount);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.error(`Error fetching user count: ${error}`);
      setLoading(false);
      setError("Error fetching user count. Please try again later.");
    }
  };

  useEffect(() => {
    fetchUserCount();
  }, []);

  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Users number</CardTitle>
            </CardHeader>
            <CardBody>
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>{error}</p>
              ) : (
                <p>Total Users: {userCount}</p>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Users;
