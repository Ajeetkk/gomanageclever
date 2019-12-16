import React, { Component } from "react";
import { Switch, Route } from 'react-router-dom'
import { Dashboard, Landing, User, SideBar, Header, Asset, ServicePartner, Login, Support } from './common/constants';
import { Container, Row, Col } from 'react-bootstrap';
import "../app/common/header/header.scss";

const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
    <Route {...rest} render={props => (
        <Layout {...rest}>
            <Component {...props} />
        </Layout>
    )} />
)
class MainLayout extends Component {
    state = {
        isVisible: false
    }
    onManageWidgetsClicked = () => {
        this.setState({ isVisible: !this.state.isVisible });
    }
    componentDidUpdate(prevProps) {
        if (this.props.title !== prevProps.title) {
            this.setState({ isVisible: false });
        }
    }
    render() {
        return (
            <div>
                <Container fluid={true}>
                    <Row className="dashboard-menu">
                        <Col md="3">
                            <SideBar />
                        </Col>
                        <Col md="9">
                            <Row>
                                <Col md="12" className="header-comp">
                                    <Header OnWidgetsClicked={this.onManageWidgetsClicked} heading={this.props.title} />
                                </Col>
                                <>
                                    {React.cloneElement(this.props.children, { showgallery: this.state.isVisible })}
                                </>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

const LayoutWithOutMenu = props => (
    <div>
        {props.children}
    </div>
)

export default class Routing extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <AppRoute exact path="/" layout={LayoutWithOutMenu} component={Landing} />
                    <AppRoute exact path="/login" layout={LayoutWithOutMenu} component={Login} />
                    <AppRoute exact path="/dashboard" layout={MainLayout} component={Dashboard} title='Dashboard' />
                    <AppRoute exact path="/asset" layout={MainLayout} component={Asset} title='Asset management' />
                    <AppRoute exact path="/servicepartner" layout={MainLayout} component={ServicePartner} title='Service partner management' />
                    <AppRoute exact path="/user" layout={MainLayout} component={User} title='User management' />
                    <AppRoute exact path="/support" layout={MainLayout} component={Support} title='Support' />
                </Switch>
            </div>
        )
    }
};







