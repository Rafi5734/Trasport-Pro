import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { message } from "antd";
import axios from "../../../utils/axios";
import useContext from "../../Hooks/useContext";
import { useSelector } from "react-redux";

const AccidentModal = (props) => {
  const { tractors } = useSelector((state) => state.tractor);
  const { drivers } = useSelector((state) => state.driver);

  const { visible, setVisible, Id, action, addIncident, updateIncident } =
    props;

  const [loading, setLoading] = useState(false);
  const [allValues, setAllValues] = useState({
    tractor: "",
    incidentDate: "",
    incidentTime: "",
    damagedArea: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    driver: "",
    fatalities: 0,
    injuries: 0,
    notes: "",
    accidentDocument: "",
  });
  const getIncidentById = async (Id) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/incident/${Id}`);
      setAllValues({ ...data.incident });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      message.error(err.response.data.message);
      console.log({ err });
    }
  };

  useEffect(() => {
    if (Id) {
      getIncidentById(Id);
    }
  }, [Id]);

  const onChange = (e) => {
    setAllValues({
      ...allValues,
      [e.target.name]: e.target.value,
    });
  };

  const [validated, setValidated] = useState(false);

  const onUpdate = () => {
    updateIncident(Id, allValues);
    setTimeout(() => {
      setVisible(false);
    }, 300);
  };

  const onSave = () => {
    addIncident(allValues);
    setTimeout(() => {
      setVisible(false);
    }, 300);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    action === "add" ? onSave() : onUpdate();
  };

  return (
    <Modal size="lg" show={visible} onHide={() => setVisible(false)}>
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Inspection Record
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>Tractor</Form.Label>
              <Form.Select
                required
                name="tractor"
                value={allValues.tractor}
                onChange={onChange}
              >
                <option value="">Select Tractor</option>
                {tractors.map((tractor, index) => (
                  <option value={tractor._id} key={index}>
                    {tractor.id}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom02">
              <Form.Label>Date Occurred</Form.Label>
              <Form.Control
                required
                type="date"
                name="incidentDate"
                value={allValues.incidentDate}
                onChange={onChange}
              />
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
              <Form.Label>Time</Form.Label>
              <Form.Control
                required
                type="time"
                name="incidentTime"
                value={allValues.incidentTime}
                onChange={onChange}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom03">
              <Form.Label>Damaged Area</Form.Label>
              <Form.Control
                type="text"
                placeholder="Damage Area"
                required
                name="damagedArea"
                value={allValues.damagedArea}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom04">
              <Form.Label>Street</Form.Label>
              <Form.Control
                type="text"
                placeholder="Street"
                required
                name="street"
                value={allValues.street}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom05">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="City"
                required
                name="city"
                value={allValues.city}
                onChange={onChange}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom06">
              <Form.Label>State</Form.Label>
              <Form.Select
                required
                name="state"
                value={allValues.state}
                onChange={onChange}
              >
                <option value="">Select State</option>
                <option value="Alaska">Alaska</option>
                <option value="Alabama">Alabama</option>
                <option value="Canada">Canada</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom07">
              <Form.Label>Zip</Form.Label>
              <Form.Control
                type="text"
                placeholder="Zip Code"
                name="zip"
                value={allValues.zip}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom08">
              <Form.Label>Driver</Form.Label>
              <Form.Select
                required
                name="driver"
                value={allValues.driver}
                onChange={onChange}
              >
                <option value="">Select Driver</option>
                {drivers.map((driver, index) => (
                  <option value={driver._id} key={index}>
                    {driver.firstName} {driver.lastName}-{driver.email}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom09">
              <Form.Label>Fatalities</Form.Label>
              <Form.Control
                type="number"
                name="fatalities"
                placeholder="Number of fatalities"
                value={allValues.fatalities}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom10">
              <Form.Label>Injuries</Form.Label>
              <Form.Control
                type="number"
                name="injuries"
                placeholder="Number of injuries"
                value={allValues.injuries}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom11">
              <Form.Label>Accident Document</Form.Label>
              <Form.Control
                type="file"
                name="accidentDocument"
                value={allValues.accidentDocument}
                onChange={onChange}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} md="4" controlId="validationCustom12">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Notes"
                name="notes"
                value={allValues.notes}
                onChange={onChange}
              />
            </Form.Group>
          </Row>
          <Button type="submit" variant="outline-primary" className="m-2">
            Save
          </Button>
          <Button variant="outline-danger" onClick={() => setVisible(false)}>
            Cancel
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AccidentModal;
