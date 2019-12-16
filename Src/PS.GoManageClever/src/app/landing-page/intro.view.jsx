import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { ModalPopup } from '../controls/constants';
export default function IntroView(props) {
    const [modalShow, setModalShow] = React.useState(false);
    return (
        <div>
            <h1> Track, analyze <br />and improve <br />your fleet operations. </h1>
            <p className="welcomenote">
                Welcome to Go! Manage powered by MTU. Now, vessel positions and engine operating data can be monitored on mobile cell phones running the MTU Go! Act app, and on laptops with the MTU Go! Manage webapp, making it possible to respond quickly to any alarms that might occur.
                </p>
            <Row>
                <Col md="12">
                    <p className="versionTxt">Please select the version you want to use. </p>
                    <Button variant="primary" onClick={props.SelectApp}> Go! Manage Clever </Button>
                    <Button variant="primary"> Go! Manage Premium </Button>
                </Col>
                <Col md="7">
                    <Button variant="link" className="watchLink" onClick={() => setModalShow(true)}>
                        <span>Watch Teaser</span>
                    </Button>
                </Col>
                <ModalPopup show={modalShow} onHide={() => setModalShow(false)} />
            </Row>
        </div>
    )
}
