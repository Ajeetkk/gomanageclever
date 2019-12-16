import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { Dashboard, AssetManagement, ServicePartner, UserManagement, Support, Logo} from './side-bar.test';

export default function SideBarView() {
  return (
    <Container fluid={true} className="side-bar p-0">
        <Row>
        <Col md="12" className="logoWrapper">
          <div className="logo">
            <Logo width={240} height={31} fill='#fff' />
          </div>
        </Col>            
      </Row>
      <Row>        
        <Col className="pad0"> 
          <Link to="/dashboard" className="menu-item link-font"> 
            <Dashboard width={32} height={32} fill='#fff' />
            <span>Dashboard</span> 
          </Link> 
          <Link to="/asset" className="menu-item link-font"> 
            <AssetManagement width={32} height={32} fill='#fff' />
            <span>Asset management</span>
          </Link>
          <Link to="/servicepartner" className="menu-item link-font"> 
            <ServicePartner width={32} height={32} fill='#fff' />         
            <span>Service partners</span>
          </Link>
          <Link to="/user" className="menu-item link-font"> 
            <UserManagement width={32} height={32} fill='#fff' />
            <span>User management</span>
          </Link>
          <Link to="/support" className="menu-item link-font"> 
            <Support width={32} height={32} fill='#fff' />
            <span>Support </span>
          </Link>
        </Col>
      </Row>
      <div className = "help-link">
       <Link to="" className= "feedback-terms-of-us">Feedback</Link>
       <Link to="" className= "feedback-terms-of-us">Terms of use</Link>
       <Link to="" className= "feedback-terms-of-us">Privacy Policy</Link>
      </div>
    </Container>
  );
}
