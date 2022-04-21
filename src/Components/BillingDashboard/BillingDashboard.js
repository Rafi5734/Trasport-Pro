import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Nav,
  Navbar,
  Row,
  Table,
} from "react-bootstrap";
import useContext from "../Hooks/useContext";

const BillingDashboard = () => {
  const { billingDashboard, revenueStats, loadStats, loading } = useContext();
  

  // console.log(loadStats);
  return (
    <div>
      <Container fluid>
        {" "}
        <h1 className="mt-5 mb-3">Billing/Collections Dashboard.</h1>
        <hr></hr>
        <Row>
          {loading && <h2>loading..</h2>}
          {!loading && (
            <Col sm={4}>
              <Navbar bg="light" expand="lg">
                <Container>
                  <Navbar.Brand href="#home">Load Stats</Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                      {/* <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#link">Link</Nav.Link> */}
                    </Nav>
                  </Navbar.Collapse>
                </Container>
              </Navbar>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Load Stats</th>
                    <th>Count</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Total</td>
                    <td>{billingDashboard.total}</td>
                  </tr>
                  <tr>
                    <td>Planned</td>
                    <td>{billingDashboard.planned}</td>
                  </tr>
                  <tr>
                    <td>Dispatched</td>
                    <td>{billingDashboard.dispatched}</td>
                  </tr>
                  <tr>
                    <td>Delivered</td>
                    <td>{billingDashboard.delivered}</td>
                  </tr>
                  <tr>
                    <td>Cancelled</td>
                    <td>{billingDashboard.cancelled}</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          )}

          <Col sm={4}>
            <Navbar bg="light" expand="lg">
              <Container>
                <Navbar.Brand href="#home">Revenue Stats</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                    {/* <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#link">Link</Nav.Link> */}
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Label</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Revenue</td>
                  <td>{revenueStats.revenue}</td>
                </tr>
                <tr>
                  <td>Paid</td>
                  <td>{revenueStats.paid}</td>
                </tr>
                <tr>
                  <td>Unpaid</td>
                  <td>{revenueStats.unpaid}</td>
                </tr>
              </tbody>
            </Table>
          </Col>

          <Col sm={4}>
            <Navbar bg="light" expand="lg">
              <Container>
                <Navbar.Brand href="#home">Invoices Stats</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                    {/* <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#link">Link</Nav.Link> */}
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Load Stats</th>
                  <th>Count</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Loads Not Invoiced</td>
                  <td>{loadStats.notInvoicedLoads}</td>
                </tr>
                <tr>
                  <td>Load Invoiced</td>
                  <td>{loadStats.loadsInvoiced}</td>
                </tr>
                <tr>
                  <td>Paid Loads</td>
                  <td>{loadStats.paidLoads}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BillingDashboard;