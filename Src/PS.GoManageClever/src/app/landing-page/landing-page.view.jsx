import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SlideShow from './Carousel';
import IntroView from './intro.view';
import AppSelectionView from './app-selection.view';
import "./landing-page.scss";

const LandingPageView = () => {
    const [Intro, ChangeView] = React.useState(true);
    return (
        <Container fluid={true}>
            <Row>
                <Col xs="12" md="4">
                    <SlideShow />
                </Col>
                <Col xs="12" md="6" className = "landingPageView">
                    <div className="logo" />
                    {Intro ? <IntroView SelectApp={() => ChangeView(false)} /> : <AppSelectionView />}
                </Col>
            </Row>
        </Container>
    );
}

export default LandingPageView; 