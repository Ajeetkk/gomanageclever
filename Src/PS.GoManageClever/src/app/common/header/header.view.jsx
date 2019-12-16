import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./header.scss";
import ToggleMenu from './header.test';

export default function HeaderView(props) {
  return (
    <Container fluid={true}>
      <Row className="header-comp">
        <Col md={6} className="sid-bar">

          <ToggleMenu width={32} height={32} fill='#fff' />

          <h2 className="Page-Header">{props.pagetitle}</h2>
        </Col>
        <Col className="manage-widgets">
          {/* <button className="btn-manage-widget" onClick={props.onWidgetsDisplay}>Manage widgets</button> */}
          <div className="user-Profile">{localStorage.getItem('profileName')}</div>
          <button className="btn btn-primary width-auto" onClick={props.LogOut}>Logout</button>
        </Col>
      </Row>
    </Container>
  );
}
