import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardBody, CardFooter, CardTitle, Row, Col } from "reactstrap";
import { useProtectedRoute } from './useProtectedRoute';

function Dashboard() {
  const [gallerycount, setgallery] = useState([]);
  const [SocialMediacount, setSocialMedia] = useState([]);
  const [iconscount, seticons] = useState([]);
  const [Background, setBackground] = useState([]);
  const [about, setabout] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [TankShop, setTankShop] = useState([]);
  const [PrivacyPolicies, setPrivacyPolicies] = useState([]);
  const [Terms, setTerms] = useState([]);
  const [isUpdateClicked, setIsUpdateClicked] = useState(false);
  const [eventCount, setEventCount] = useState([]);
  const [qrcodeCount, setqrcodeCount] = useState([]);
  
  const userRole = 'admin'; // Fetch the user's role or use the state you've stored

  // Protect this route for 'admin' and 'superadmin' roles
  useProtectedRoute(['admin', 'superadmin'], userRole);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://seashell-app-6v6yj.ondigitalocean.app/event/list"
        );
        // setProduct(response.data);
        setEventCount(response.data.data);
      } catch (error) {
        console.log(`Error getting news from frontend: ${error}`);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://seashell-app-6v6yj.ondigitalocean.app/gallery/images"
        );
        setgallery(response.data.data);
      } catch (error) {
        console.log(`Error getting Blog from frontend: ${error}`);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://seashell-app-6v6yj.ondigitalocean.app/social_media/list"
        );
        setSocialMedia(response.data.data);
      } catch (error) {
        console.log(`Error getting Blog from frontend: ${error}`);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://seashell-app-6v6yj.ondigitalocean.app/icons/list"
        );
        seticons(response.data.data);
      } catch (error) {
        console.log(`Error getting Blog from frontend: ${error}`);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://seashell-app-6v6yj.ondigitalocean.app/background/list"
        );
        setBackground(response.data.data);
      } catch (error) {
        console.log(`Error getting Blog from frontend: ${error}`);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://seashell-app-6v6yj.ondigitalocean.app/about/list"
        );
        setabout(response.data.data);
      } catch (error) {
        console.log(`Error getting Blog from frontend: ${error}`);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://seashell-app-6v6yj.ondigitalocean.app/user/count"
        );
        const userCount = response.data.data[0].count; // Access the count property inside data
        setUserCount(userCount);
      } catch (error) {
        console.log(`Error getting Blog from frontend: ${error}`);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://seashell-app-6v6yj.ondigitalocean.app/shop/list"
        );
        setTankShop(response.data.data);
      } catch (error) {
        console.log(`Error getting Blog from frontend: ${error}`);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://seashell-app-6v6yj.ondigitalocean.app/privacy/list"
        );
        setPrivacyPolicies(response.data.data);
      } catch (error) {
        console.log(`Error getting Blog from frontend: ${error}`);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://seashell-app-6v6yj.ondigitalocean.app/terms/list"
        );
        setTerms(response.data.data);
      } catch (error) {
        console.log(`Error getting Blog from frontend: ${error}`);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://seashell-app-6v6yj.ondigitalocean.app/qr/list"
        );
        setqrcodeCount(response.data.data);
      } catch (error) {
        console.log(`Error getting Blog from frontend: ${error}`);
      }
    };

    fetchData();
  }, []);

  const handleUpdateClick = () => {
    setIsUpdateClicked(true);
  };
  return (
    <>
      <div className="content">
        <Row>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-globe text-warning" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Events</p>
                      <CardTitle tag="p">{eventCount.length}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-money-coins text-success" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Gallery</p>
                      <CardTitle tag="p">{gallerycount.length}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-money-coins text-success" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Social Media</p>
                      <CardTitle tag="p">{SocialMediacount.length}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-money-coins text-success" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Icons</p>
                      <CardTitle tag="p">{iconscount.length}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-money-coins text-success" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Background</p>
                      <CardTitle tag="p">{Background.length}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-money-coins text-success" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">About</p>
                      <CardTitle tag="p">{about.length}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-vector text-danger" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">users</p>
                      <CardTitle tag="p">{userCount}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-favourite-28 text-primary" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Tank Shop</p>
                      <CardTitle tag="p">{TankShop.length}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-globe text-warning" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Privacy Policies</p>
                      <CardTitle tag="p">{PrivacyPolicies.length}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-globe text-warning" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Terms</p>
                      <CardTitle tag="p">{Terms.length}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-globe text-warning" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">QR Code</p>
                      <CardTitle tag="p">{qrcodeCount.length}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
              </CardFooter>
            </Card>
          </Col>
        </Row>
    
      </div>
    </>
  );
}

export default Dashboard;
