import React, { Component } from 'react'
import HeaderView from './header.view'
import AuthService from '../../services/authentication.service';
export default class HeaderComponent extends Component {
    constructor(){
        super();
        this.authService = new AuthService();

    }
    logout = () => {
        this.clearLocalStorage();
        this.authService.logout();
    }
    clearLocalStorage() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('isInternalUser');
        localStorage.removeItem('isRegistrationSuccessResponse');
        localStorage.removeItem('userSession');
        localStorage.removeItem('registeredDateTime');
      }

    render() {
        return (
            <div>
                <HeaderView onWidgetsDisplay={this.props.OnWidgetsClicked} pagetitle={this.props.heading} LogOut={this.logout} />
            </div>
        )
    }
}
