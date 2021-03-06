import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Nav,
  Navbar,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import { message } from "antd";
import axios from "../../utils/axios";
import useContext from "../Hooks/useContext";

const BillingDashboard = () => {
  const [billing, setBilling] = useState({
    loadStats: {
      total: 0,
      planned: 0,
      dispatched: 0,
      delivered: 0,
      cancelled: 0,
    },
    revenueStats: { revenue: 0, paid: 0, unpaid: 0 },
    invoiceStats: { notInvoicedLoads: 0, loadsInvoiced: 0, paidLoads: 0 },
    medicalStats: [0, 0, 0],
    plateStats: [0, 0, 0],
    revenueStats: [0, 0, 0],
    tractorStats: [0, 0, 0],
    trailerStats: [0, 0, 0],
  });

  const [loading, setLoading] = useState(false);

  const getBilling = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/billing");
      setBilling(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      message.error(err.response.data.message);
      console.log({ err });
    }
  };

  useEffect(() => {
    getBilling();
  }, []);

  const { loadStats, invoiceStats, revenueStats } = billing;

  return (
    <Container>
      <h3 className="mt-5 mb-3">Billing Dashboard</h3>
      <hr></hr>
      <Row>
        <Col sm={4}>
          <Navbar bg="light" expand="lg">
            <Container>
              <Navbar.Brand href="#home">Load Stats</Navbar.Brand>
            </Container>
          </Navbar>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Load Stats</th>
                <th>Count</th>
              </tr>
            </thead>
            {loading && (
              <tbody>
                <tr>
                  <td colSpan={2} style={{ textAlign: "center" }}>
                    <Spinner animation="border" variant="primary">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </td>
                </tr>
              </tbody>
            )}
            {!loading && (
              <tbody>
                <tr>
                  <td>Total</td>
                  <td>{loadStats.total}</td>
                </tr>
                <tr>
                  <td>Planned</td>
                  <td>{loadStats.planned}</td>
                </tr>
                <tr>
                  <td>Dispatched</td>
                  <td>{loadStats.dispatched}</td>
                </tr>
                <tr>
                  <td>Delivered</td>
                  <td>{loadStats.delivered}</td>
                </tr>
                <tr>
                  <td>Cancelled</td>
                  <td>{loadStats.cancelled}</td>
                </tr>
              </tbody>
            )}
          </Table>
        </Col>
        <Col sm={4}>
          <Navbar bg="light" expand="lg">
            <Container>
              <Navbar.Brand href="#home">Revenue Stats</Navbar.Brand>
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
              {loading && (
                <tr>
                  <td colSpan={2} style={{ textAlign: "center" }}>
                    <Spinner animation="border" variant="primary">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </td>
                </tr>
              )}
              {!loading && (
                <>
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
                </>
              )}
            </tbody>
          </Table>
        </Col>
        <Col sm={4}>
          <Navbar bg="light" expand="lg">
            <Container>
              <Navbar.Brand href="#home">Invoices Stats</Navbar.Brand>
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
              {loading && (
                <tr>
                  <td colSpan={2} style={{ textAlign: "center" }}>
                    <Spinner animation="border" variant="primary">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </td>
                </tr>
              )}
              {!loading && (
                <>
                  <tr>
                    <td>Loads Not Invoiced</td>
                    <td>{invoiceStats.notInvoicedLoads}</td>
                  </tr>
                  <tr>
                    <td>Load Invoiced</td>
                    <td>{invoiceStats.loadsInvoiced}</td>
                  </tr>
                  <tr>
                    <td>Paid Loads</td>
                    <td>{invoiceStats.paidLoads}</td>
                  </tr>
                </>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default BillingDashboard;
