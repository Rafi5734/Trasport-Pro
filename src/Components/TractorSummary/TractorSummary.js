import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Navbar, OverlayTrigger, Row, Table, Tooltip } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import axios from "../../utils/axios";
import { notification } from "antd";





const TractorSummary = () => {
  const [summaryData, setSummaryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [smShow, setSmShow] = useState(false);
  const { tractorId } = useParams();
  const [enable, setEnable] = useState(true);


  const [allValues, setAllValues] = useState({});

  const changeHandler = (e) => {
    setAllValues({
      ...allValues,
      [e.target.name]: e.target.value,
    });
  };



const handleEnable = (enable) => {
  setEnable(false);
};


  
  const handleUpdate = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put(
        `/tractor/summary/${tractorId}`,
        allValues
      );
      setEnable(true);
      setLoading(false);
      notification.success({ message: data.message });
      console.log(allValues);
    } catch (err) {
      notification.error({ message: err.response.data.message });
    } 
  };

  useEffect(() => {
    const fetchTractorSummary = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/tractor/summary/${tractorId}`);
        setSummaryData(data.tractorInformation);
        
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };
    fetchTractorSummary();
  }, [tractorId]);

  //console.log(summaryData);

  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;



  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  const handleDeleteDriver = (event) => {
    window.confirm("Are you sure you want to delete this driver?");
  };



  return (
    <div>
      {loading && <h2>loading..</h2>}
      {!loading && (
        <Container>
          <h1 className="mt-5 mb-3">Tractor Summary</h1>
          <hr></hr>
          <div className="operator-info">
            <h5 className="mt-5 mb-3">Tractor Information</h5>

            {enable ? (
              <Button variant="outline-primary" onClick={handleEnable}>
                Edit Information
              </Button>
            ) : (
              <>
                <Button variant="outline-primary" onClick={handleUpdate}>
                  Update Information
                </Button>{" "}
                <Button variant="outline-danger" onClick={handleUpdate}>
                  Cancel
                </Button>
              </>
            )}
            {"   "}
            <Modal
              size="lg"
              show={smShow}
              onHide={() => setSmShow(false)}
              aria-labelledby="example-modal-sizes-title-sm"
            >
              <Modal.Header closeButton>
                <Modal.Body id="example-modal-sizes-title-sm">
                  <Row>
                    <Col>Transport Pro Administrator</Col>
                    <Col>{date}</Col>
                  </Row>
                </Modal.Body>
              </Modal.Header>
              {/* <Modal.Body>...</Modal.Body> */}
            </Modal>
            <hr></hr>
          </div>
          <Row>
            <Col>
              <Form.Label>Tractor Id</Form.Label>
              <Form.Control
                type="text"
                disabled={enable}
                placeholder="Tractor Id"
                defaultValue={summaryData.id}
                name="tractorId"
                onChange={changeHandler}
              />
            </Col>
            <Col>
              <Form.Label>Axle Count</Form.Label>
              <Form.Control
                type="text"
                disabled={enable}
                placeholder="Home Terminal"
                defaultValue={summaryData.axieCount}
                name="axieCount"
                onChange={changeHandler}
              />
            </Col>
            <Col>
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                disabled={enable}
                placeholder="Status"
                defaultValue={summaryData.status}
                name="status"
                onChange={changeHandler}
              />
            </Col>
          </Row>

          <Row className="mt-3">
            <Col>
              <Form.Label>Weight</Form.Label>
              <Form.Control
                type="text"
                disabled={enable}
                placeholder="Weight"
                defaultValue={summaryData.weight}
                name="weight"
                onChange={changeHandler}
              />
            </Col>
            <Col>
              <Form.Label>Terminal</Form.Label>
              <Form.Control
                type="text"
                disabled={enable}
                placeholder="Terminal"
                defaultValue={summaryData.terminal}
                name="terminal"
                onChange={changeHandler}
              />
            </Col>
            <Col>
              <Form.Label>Fuel Capacity</Form.Label>
              <Form.Control
                type="text"
                disabled={enable}
                placeholder="Status"
                defaultValue={summaryData.fuelCapacity}
                name="fuelCapacity"
                onChange={changeHandler}
              />
            </Col>
          </Row>

          <Row className="mt-3">
            <Col>
              <Form.Label>Current Owner</Form.Label>
              <Form.Control
                type="text"
                disabled={enable}
                placeholder="Current Owner"
                defaultValue={summaryData.currentOwner}
                name="currentOwner"
                onChange={changeHandler}
              />
            </Col>
            <Col>
              <Form.Label>Tag Number/State </Form.Label>
              <Form.Control
                type="text"
                disabled={enable}
                placeholder="Tag Number/State"
                defaultValue={summaryData.tagNumber}
                name="tagNumber"
                onChange={changeHandler}
              />
            </Col>
            <Col>
              <Form.Label>Owner Since </Form.Label>
              <Form.Control
                type="text"
                disabled={enable}
                placeholder="Owner Since"
                defaultValue={summaryData.ownerSince}
                name="ownerSince"
                onChange={changeHandler}
              />
            </Col>
          </Row>

          <Row className="mt-3">
            <Col>
              <Form.Label>Tag Expiration </Form.Label>
              <Form.Control
                type="text"
                disabled={enable}
                placeholder="Tag Expiration	"
                defaultValue={summaryData.tagExp}
                name="tagExp"
                onChange={changeHandler}
              />
            </Col>
            <Col>
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="text"
                disabled={enable}
                placeholder="Year"
                defaultValue={summaryData.year}
                name="year"
                onChange={changeHandler}
              />
            </Col>
            <Col>
              <Form.Label>Leasing Company</Form.Label>
              <Form.Control
                type="text"
                disabled={enable}
                placeholder="Leasing Company"
                defaultValue={summaryData.ownerSince}
                name="ownerSince"
                onChange={changeHandler}
              />
            </Col>
          </Row>

          <Row className="mt-3">
            <Col>
              <Form.Label>Make</Form.Label>
              <Form.Control
                type="text"
                disabled={enable}
                placeholder="Make"
                defaultValue={summaryData.make}
                name="make"
                onChange={changeHandler}
              />
            </Col>
            <Col>
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="text"
                disabled={enable}
                placeholder="Year"
                defaultValue={summaryData.year}
                name="year"
                onChange={changeHandler}
              />
            </Col>
            <Col>
              <Form.Label>Lease Exp Date</Form.Label>
              <Form.Control
                type="text"
                disabled={enable}
                placeholder="Lease Exp Date"
                defaultValue={summaryData.leaseExpDate}
                name="leaseExpDate"
                onChange={changeHandler}
              />
            </Col>
          </Row>

          <Row className="mt-3">
            <Col>
              <Form.Label>Model </Form.Label>
              <Form.Control
                type="text"
                disabled={enable}
                placeholder="Model	"
                defaultValue={summaryData.model}
                name="model"
                onChange={changeHandler}
              />
            </Col>
            <Col>
              <Form.Label>Physical Damage Insurance Carrier</Form.Label>
              <Form.Control
                type="text"
                disabled={enable}
                placeholder="Physical Damage Insurance Carrier"
                defaultValue={summaryData.physicalDmgInsCarrier}
                name="physicalDmgInsCarrier"
                onChange={changeHandler}
              />
            </Col>
            <Col>
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                disabled={enable}
                placeholder="Type"
                defaultValue={summaryData.type}
                name="type"
                onChange={changeHandler}
              />
            </Col>
          </Row>

          <Row className="mt-3">
            <Col>
              <Form.Label>Physical Damage Insurance Start Date</Form.Label>
              <Form.Control
                type="text"
                disabled={enable}
                placeholder="Physical Damage Insurance Start Date"
                defaultValue={summaryData.physicalDmgInsStartDate}
                name="physicalDmgInsStartDate"
                onChange={changeHandler}
              />
            </Col>
            <Col>
              <Form.Label>Group</Form.Label>
              <Form.Control
                type="text"
                disabled={enable}
                placeholder="Group"
                defaultValue={summaryData.group}
                name="group"
                onChange={changeHandler}
              />
            </Col>
            <Col>
              <Form.Label>
                Physical Damage Insurance Expiration Date{" "}
              </Form.Label>
              <Form.Control
                type="text"
                disabled={enable}
                placeholder="Physical Damage Insurance Expiration Date"
                defaultValue={summaryData.physicalDmgInsExpDate}
                name="physicalDmgInsExpDate"
                onChange={changeHandler}
              />
            </Col>
          </Row>

          <Row className="mt-3">
            <Col>
              <Form.Label>Color</Form.Label>
              <Form.Control
                type="text"
                disabled={enable}
                placeholder="Color"
                defaultValue={summaryData.color}
                name="color"
                onChange={changeHandler}
              />
            </Col>
            <Col>
              <Form.Label>Physical Damage Insurance Value </Form.Label>
              <Form.Control
                type="text"
                disabled={enable}
                placeholder="Physical Damage Insurance Value	"
                defaultValue={summaryData.physicalDmgInsValue}
                name="physicalDmgInsValue"
                onChange={changeHandler}
              />
            </Col>
            <Col>
              <Form.Label>VIN</Form.Label>
              <Form.Control
                type="text"
                disabled={enable}
                placeholder="VIN"
                defaultValue={summaryData.vin}
                name="vin"
                onChange={changeHandler}
              />
            </Col>
          </Row>

          <Row className="mt-3">
            <Col>
              <Form.Label>NTL Insurance Carrier </Form.Label>
              <Form.Control
                type="text"
                disabled={enable}
                placeholder="NTL Insurance Carrier"
                defaultValue={summaryData.ntlInsCarrier}
                name="ntlInsCarrier"
                onChange={changeHandler}
              />
            </Col>
            <Col>
              <Form.Label>Carb Compliant</Form.Label>
              <Form.Control
                type="text"
                disabled={enable}
                placeholder="Carb Compliant"
                defaultValue={summaryData.carbCompliant}
                name="carbCompliant"
                onChange={changeHandler}
              />
            </Col>
            <Col>
              <Form.Label>NTL Insurance Start Date </Form.Label>
              <Form.Control
                type="text"
                disabled
                placeholder="NTL Insurance Start Date	"
                defaultValue={summaryData.ntlInsStartDate}
                name="ntlInsStartDate"
                onChange={changeHandler}
              />
            </Col>
          </Row>

          <Row className="mt-3">
            <Col>
              <Form.Label>NTL Insurance Expiration Date</Form.Label>
              <Form.Control
                type="text"
                disabled={enable}
                placeholder="NTL Insurance Expiration Date"
                defaultValue={summaryData.ntlInsExpDate}
                name="ntlInsExpDate"
                onChange={changeHandler}
              />
            </Col>
            <Col>
              <Form.Label>NTL Insurance Value</Form.Label>
              <Form.Control
                type="text"
                disabled={enable}
                placeholder="NTL Insurance Value"
                defaultValue={summaryData.ntlInsValue}
                name="ntlInsValue"
                onChange={changeHandler}
              />
            </Col>
            <Col>
              
            </Col>
          </Row>

          <Navbar bg="light" expand="lg" className="mt-5">
            <Container>
              <Navbar.Brand href="#home">
                <h1>Assigned Drivers</h1>
              </Navbar.Brand>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                <OverlayTrigger
                  overlay={<Tooltip id="tooltip-disabled">Add Drivers</Tooltip>}
                >
                  <span className="d-inline-block">
                    <Button variant="outline-primary" onClick={handleShow}>
                      <i className="fa-solid fa-plus"></i>
                    </Button>{" "}
                  </span>
                </OverlayTrigger>
                <Modal
                  show={show}
                  onHide={handleClose}
                  backdrop="static"
                  keyboard={false}
                  // disabled={enable}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Button variant="outline-primary">
                      <Link to="/addDriver">Add New Driver</Link>
                    </Button>{" "}
                    <Form className="mt-4">
                      <Row className="mb-3">
                        <Form.Group
                          as={Col}
                          md="12"
                          controlId="validationCustom01"
                        >
                          <Form.Label>Driver</Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder="Driver"
                            // defaultValue="Mark"
                          />
                          <Form.Control.Feedback>
                            Looks good!
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Row>
                      <Row className="mb-3">
                        <Form.Group
                          as={Col}
                          md="12"
                          controlId="validationCustom01"
                        >
                          <Form.Label>Driver Assigned</Form.Label>
                          <Form.Control
                            required
                            type="date"
                            placeholder="Driver"
                            // defaultValue="Mark"
                          />
                          <Form.Control.Feedback>
                            Looks good!
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Row>
                      <Row className="mb-3">
                        <Form.Group
                          as={Col}
                          md="12"
                          controlId="validationCustom01"
                        >
                          <Form.Label>Driver Removed</Form.Label>
                          <Form.Control
                            required
                            type="date"
                            placeholder="Driver"
                            // defaultValue="Mark"
                          />
                          <Form.Control.Feedback>
                            Looks good!
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Row>
                      <Row className="mb-3">
                        <Form.Group
                          as={Col}
                          md="12"
                          controlId="validationCustom01"
                        >
                          <Form.Label>Comment (Internal)</Form.Label>
                          <Form.Control
                            disabled={enable}
                            type="text"
                            placeholder="Comment (Internal)"
                            // defaultValue="Mark"
                          />
                          <Form.Control.Feedback>
                            Looks good!
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Row>
                      <Form.Group className="mb-3">
                        <Form.Check
                          disabled={enable}
                          label="Agree to terms and conditions"
                          feedback="You must agree before submitting."
                          feedbackType="invalid"
                        />
                      </Form.Group>
                      <Button type="submit">Save Recode</Button>{" "}
                      <Button variant="danger" onClick={handleClose}>
                        Close
                      </Button>
                    </Form>
                  </Modal.Body>
                </Modal>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <Table striped bordered hover className="mb-5">
            <thead>
              <tr>
                <th>Driver</th>
                <th>Date Assigned </th>
                <th>Date Removed </th>
                <th>Comments (Internal)</th>
                <th>Manage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Jhone Clerk</td>
                <td>03/20/2022</td>
                <td></td>
                <td></td>
                <td>
                  <OverlayTrigger
                    overlay={
                      <Tooltip id="tooltip-disabled">Edit Drivers</Tooltip>
                    }
                  >
                    <span className="d-inline-block">
                      <Button variant="outline-primary" onClick={handleShow}>
                        <i className="fa-solid fa-pen-to-square"></i>
                      </Button>{" "}
                    </span>
                  </OverlayTrigger>{" "}
                  <OverlayTrigger
                    overlay={
                      <Tooltip id="tooltip-disabled">Delete Drivers</Tooltip>
                    }
                  >
                    <span className="d-inline-block">
                      <Button
                        variant="outline-danger"
                        onClick={handleDeleteDriver}
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </Button>{" "}
                    </span>
                  </OverlayTrigger>
                </td>
              </tr>
            </tbody>
          </Table>
        </Container>
      )}
    </div>
  );
};

export default TractorSummary;
