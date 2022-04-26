import React, { useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { notification } from "antd";
import axios from "../../utils/axios";
import "./addCustomer.css";

const AddCustomer = () => {
  const initValue = {
    name: "",
    phoneNumber: "",
    fax: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    billName: "",
    billAddress: "",
    billZip: "",
    billCity: "",
    billState: "",
    billPrimaryPhoneNumber: "",
    billSecondaryPhoneNumber: "",
    billFaxNumber: "",
    billHardCopy: false,
    billSoftCopy: false,
    billEmail: "",
    billSSN: "",
  };
  const [allValues, setAllValues] = useState(initValue);

  const changeHandler = (e) => {
    setAllValues({
      ...allValues,
      [e.target.name]: e.target.value,
    });
  };

  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);

  const addCustomer = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/customer", allValues);

      if (res.status === 201) {
        notification.success({ message: res.data.message });
        setTimeout(() => {
          setValidated(false);
          setAllValues(initValue);
        }, 1000);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      notification.error({ message: err.response.data.message });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    addCustomer();
  };

  const copyInfo = () => {
    setAllValues({
      ...allValues,
      billName: allValues.name,
      billAddress: allValues.address,
      billCity: allValues.city,
      billZip: allValues.zip,
      billEmail: allValues.email,
      billState: allValues.state,
      billPrimaryPhoneNumber: allValues.phoneNumber,
      billFaxNumber: allValues.fax,
    });
  };
  return (
    <div>
      <Container>
        <h3 className="mt-5 mb-3">Customer Information</h3>
        <hr></hr>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Customer Name"
                name="name"
                onChange={changeHandler}
                value={allValues.name}
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom02">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Phone Number"
                name="phoneNumber"
                onChange={changeHandler}
                value={allValues.phoneNumber}
              />
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="validationCustom03">
              <Form.Label>Fax</Form.Label>
              <Form.Control
                type="text"
                placeholder="Fax Number"
                name="fax"
                onChange={changeHandler}
                value={allValues.fax}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom04">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Email"
                name="email"
                onChange={changeHandler}
                value={allValues.email}
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom05">
              <Form.Label>Street</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Street"
                name="street"
                onChange={changeHandler}
                value={allValues.street}
              />
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="validationCustom06">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="City"
                name="city"
                onChange={changeHandler}
                value={allValues.city}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom07">
              <Form.Label>State</Form.Label>
              <Form.Select
                required
                name="state"
                onChange={changeHandler}
                value={allValues.state}
              >
                <option value="">Select State</option>
                <option value="Alabama">Alabama</option>
                <option value="Alaska">Alaska</option>
                <option value="California">California</option>
                <option value="Canada">Canada</option>
                <option value="Quebec">Quebec</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom08">
              <Form.Label>Zip</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Zip Code"
                name="zip"
                onChange={changeHandler}
                value={allValues.zip}
              />
            </Form.Group>
          </Row>
          <Row className="mb-5">
            <h3 className="mt-5 mb-3">Billing Information</h3>
            <hr></hr>

            <Col span={4}>
              <Button onClick={copyInfo}>Copy Information From Above</Button>
            </Col>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>Pay/Bill Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Bill Name"
                name="billName"
                onChange={changeHandler}
                value={allValues.billName}
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom02">
              <Form.Label>Address</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Address"
                name="billAddress"
                onChange={changeHandler}
                value={allValues.billAddress}
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
              <Form.Label>Zip</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  required
                  type="text"
                  placeholder="Zip"
                  name="billZip"
                  onChange={changeHandler}
                  value={allValues.billZip}
                />
              </InputGroup>
            </Form.Group>
          </Row>
          <Row className="mb-4">
            <Form.Group as={Col} md="4" controlId="validationCustom03">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="City"
                required
                name="billCity"
                onChange={changeHandler}
                value={allValues.billCity}
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom04">
              <Form.Label>State</Form.Label>
              <Form.Select
                required
                aria-label="Default select example"
                name="billState"
                onChange={changeHandler}
                value={allValues.billState}
              >
                <option value="">Select State</option>
                <option value="Alabama">Alabama</option>
                <option value="Alaska">Alaska</option>
                <option value="California">California</option>
                <option value="Canada">Canada</option>
                <option value="Quebec">Quebec</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom03">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Phone Number"
                name="billPrimaryPhoneNumber"
                onChange={changeHandler}
                value={allValues.billPrimaryPhoneNumber}
              />
            </Form.Group>
          </Row>
          <Row className="mb-4">
            <Form.Group as={Col} md="4" controlId="validationCustom03">
              <Form.Label>Alt Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Alt Phone Number"
                name="billSecondaryPhoneNumber"
                onChange={changeHandler}
                value={allValues.billSecondaryPhoneNumber}
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom05">
              <Form.Label>Fax Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Fax Phone Number"
                name="billFaxNumber"
                onChange={changeHandler}
                value={allValues.billFaxNumber}
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom03">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Email"
                name="billEmail"
                onChange={changeHandler}
                value={allValues.billEmail}
              />
            </Form.Group>
          </Row>
          <Row className="mb-4">
            <Form.Group as={Col} md="4">
              <Form.Check
                label="Hard Copy"
                name="billHardCopy"
                onChange={(e) =>
                  setAllValues({
                    ...allValues,
                    billHardCopy: Boolean(e.target.value),
                  })
                }
                value={allValues.billHardCopy}
              />
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Check
                label="Soft Copy"
                name="billSoftCopy"
                onChange={(e) =>
                  setAllValues({
                    ...allValues,
                    billSoftCopy: Boolean(e.target.value),
                  })
                }
                value={allValues.billSoftCopy}
              />
            </Form.Group>
          </Row>
          <Row className="mb-4">
            <Form.Group as={Col} md="4" controlId="validationCustom05">
              <Form.Label>SSN Federal ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Federal ID"
                required
                name="billSSN"
                onChange={changeHandler}
                value={allValues.billSSN}
              />
            </Form.Group>
          </Row>
          <Button type="submit" className="mb-5 me-3" variant="outline-primary">
            Save
          </Button>
          <Button
            type="reset"
            variant="outline-danger"
            className="mb-5"
            href="/search-customer"
          >
            Cancel
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default AddCustomer;
