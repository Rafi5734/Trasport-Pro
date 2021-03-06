import { Button, Col, Form, Modal, Row, Spinner } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { message, notification } from "antd";
import axios from "../../../utils/axios";

const UserManagementModal = (props) => {
  const {
    visible,
    setVisible,
    Id,
    setId,
    action,

    getUsers,
  } = props;

  //state
  const initVal = {
    firstName: "",
    middleName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    newPassword: "",
    password: "",
    suspended: false,
    accounting: false,
    billing: false,
    systemAdmin: true,
    settlements: false,
    freightOperation: false,
  };
  const [allValues, setAllValues] = useState(initVal);
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);

  //hooks
  useEffect(() => {
    if (Id) {
      getUserById(Id);
    }
  }, [Id]);

  //funcs

  const reset = () => {
    setVisible(false);
    setValidated(false);
    setAllValues(initVal);
    setId(null);
    getUsers();
  };
  const getUserById = async (Id) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/user/${Id}`);
      setAllValues({ ...data.user, newPassword: "" });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      message.error(err.response.data.message);
      console.log({ err });
    }
  };
  const onChange = (e) => {
    if (e.target.type === "checkbox") {
      setAllValues({
        ...allValues,
        [e.target.name]: allValues[e.target.name] ? false : true,
      });
      return;
    }

    setAllValues({
      ...allValues,
      [e.target.name]: e.target.value,
    });
  };
  const onUpdate = async (id, values) => {
    try {
      setLoading(true);
      values.password = allValues.newPassword;
      const res = await axios.put(`/user/${id}`, values);
      notification.success({ message: res.data.message });
      reset();
      setLoading(false);
    } catch (err) {
      setLoading(false);
      notification.error({
        message: err.response.data.message,
      });
    }
  };
  const onSave = async (values) => {
    try {
      setLoading(true);
      values.newPassword = undefined;
      const res = await axios.post(`/user`, values);
      notification.success({ message: res.data.message });
      reset();
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      notification.error({
        message: err.response.data.message,
      });
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
    action === "add" ? onSave(allValues) : onUpdate(Id, allValues);
  };
  const toggleSuspendUser = async () => {
    try {
      setLoading(true);
      await axios.put(`/user/${Id}`, {
        suspended: allValues.suspended ? false : true,
      });
      notification.info({
        message: allValues.suspended
          ? "User suspension removed"
          : "User suspended",
      });
      reset();
      setLoading(false);
    } catch (err) {
      console.log({ err });
      notification.error({ message: err.response.data.message });
    }
  };

  return (
    <Modal size="lg" show={visible} onHide={() => setVisible(false)}>
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">User Record</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading && (
          <div
            style={{
              textAlign: "center",
            }}
          >
            <Spinner animation="border" variant="primary">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
        {!loading && (
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Label>First name</Form.Label>
                <Form.Control
                  required
                  name="firstName"
                  onChange={onChange}
                  type="text"
                  placeholder="First name"
                  value={allValues.firstName}
                />
              </Col>
              <Col>
                <Form.Label>Middle name</Form.Label>
                <Form.Control
                  name="middleName"
                  onChange={onChange}
                  type="text"
                  placeholder="Middle name"
                  value={allValues.middleName}
                />
              </Col>
              <Col>
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  required
                  name="lastName"
                  onChange={onChange}
                  type="text"
                  placeholder="Last name"
                  value={allValues.lastName}
                />
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  required
                  name="phoneNumber"
                  onChange={onChange}
                  type="text"
                  placeholder="Phone Number"
                  value={allValues.phoneNumber}
                />
              </Col>
              <Col>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  name="email"
                  onChange={onChange}
                  type="email"
                  placeholder="Email"
                  value={allValues.email}
                />
              </Col>
              <Col>
                <Form.Label>
                  {action === "add" ? "Password" : "New Password"}
                </Form.Label>

                {action !== "add" ? (
                  <Form.Control
                    required
                    name="newPassword"
                    onChange={onChange}
                    type="password"
                    placeholder="New Password"
                    value={allValues.newPassword}
                  />
                ) : (
                  <Form.Control
                    required
                    name="password"
                    onChange={onChange}
                    type="password"
                    placeholder="Password"
                    value={allValues.password}
                  />
                )}
              </Col>
            </Row>
            <h3 className="mt-3 mb-1">Permissions</h3>
            <Row className="mt-3">
              <Col>
                <Form.Check
                  name="accounting"
                  onChange={onChange}
                  label="Accounting"
                  checked={allValues.accounting}
                />
              </Col>
              <Col>
                <Form.Check
                  name="billing"
                  onChange={onChange}
                  label="Billing"
                  checked={allValues.billing}
                />
              </Col>
              <Col>
                <Form.Check
                  name="systemAdmin"
                  onChange={onChange}
                  label="System Admin"
                  checked={allValues.systemAdmin}
                />
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>
                <Form.Check
                  name="settlements"
                  onChange={onChange}
                  label="Settlement"
                  checked={allValues.settlements}
                />
              </Col>
              <Col>
                <Form.Check
                  name="freightOperation"
                  onChange={onChange}
                  label="Freight Operations"
                  checked={allValues.freightOperation}
                />
              </Col>
              <Col></Col>
            </Row>

            <Button
              type="submit"
              variant="outline-primary"
              className="mt-3 m-2"
            >
              {action === "add" ? "Save" : "Update"}
            </Button>
            {action === "update" && (
              <Button
                variant="outline-danger"
                className="mt-3 m-2"
                onClick={toggleSuspendUser}
              >
                {allValues.suspended ? "Unsuspend" : "Suspend"}
              </Button>
            )}
            <Button
              variant="danger"
              className="mt-3 m-2"
              onClick={() => setVisible(false)}
            >
              Cancel
            </Button>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default UserManagementModal;
