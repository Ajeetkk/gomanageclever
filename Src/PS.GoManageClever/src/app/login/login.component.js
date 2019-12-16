import React, { Component } from 'react'
import AuthService from '../services/authentication.service';
import environment from '../../environments/config';
import * as jwt_decode from 'jwt-decode';
import * as moment from 'moment';
import { UserSession } from '../viewmodels/user-session-view';
export default class Login extends Component {
  constructor() {
    super();
    this.authorizationService = new AuthService();
  }
  componentWillMount() {
    if (this.authorizationService.isLoggedIn()) {
      this.readTokenData('');
      // this.gotoRedirect();
      this.props.history.push('/dashboard');
    } else {
      this.authorizationService.login();
    }

    // alert(window.location.href);
    // // console.log('current url : ', window.location.href);
    // const urldata = window.location.href.substring(6);
    // alert('Substring url : ', urldata);
    // alert('urldata.length ', urldata.length);
    // if (urldata !== undefined && urldata !== null && urldata.trim() !== '' ) {
    //   alert('Some token value came in url as ', urldata);
    //   this.checkRegistrationSuccess(urldata);
    // } else if (this.authorizationService.isLoggedIn()) {
    //   alert('Already loggedin');
    //   this.readTokenData('');
    //   // this.gotoRedirect();
    //   this.props.history.push('/dashboard');
    // } else {
    //   alert('no url substring and no loggedin');
    //   if (localStorage.getItem('isRegistrationSuccessResponse') === 'true') {
    //     alert('succesful registration');
    //     // this.gotoRedirect();
    //     this.props.history.push('/dashboard');
    //   } else {
    //     alert('calling B2c Login');
    //     this.authorizationService.login();
    //   }
    // }
  }
  spinner = () => {
    const spinner = document.getElementById('spinner');
    spinner.classList.remove("hide");
    spinner.classList.add("show");
  }
  render() {
    return (
      <div>
        {this.spinner()}
      </div>
    )
  }
  checkRegistrationSuccess(b2cdata) {
    if (b2cdata.indexOf('#id_token') > -1 && b2cdata.indexOf('#id_token') < 9) {
      const tokenPosition = b2cdata.indexOf('=') + 1;
      this.readTokenData(b2cdata.substring(tokenPosition));
      const userGUID = JSON.parse(localStorage.getItem('userSession')).userGUID;
      if (userGUID !== undefined && userGUID !== null) {
        localStorage.setItem('isRegistrationSuccessResponse', 'true');
      }
    } else {
      // do nothing
    }
  }
  readTokenData(b2ctoken) {
    // let decodedToken;
    this.usersession = new UserSession();
    if (b2ctoken === '') {
      this.decodedToken = this.decodeAccessToken(localStorage.getItem(environment.accessTokenKey));
      console.log('Decoded token for loca storage : ', this.decodedToken);
    } else {
      this.decodedToken = this.decodeAccessToken(b2ctoken);
      localStorage.setItem(environment.accessTokenKey, b2ctoken);  // store token for successful registration
    }
    const b2cPolicy = this.decodedToken.acr;
    // Self registration, invite user and login flow
    if (b2cPolicy === environment.oAuth.signInPolicy || b2cPolicy === environment.oAuth.registrationPolicy) {
      this.firstName = this.decodedToken.given_name;
      this.lastName = this.decodedToken.family_name;
      if (this.firstName && this.firstName.length > 0) {
        this.shortName = this.firstName.charAt(0).toUpperCase();
      }
      if (this.lastName && this.lastName.length > 0) {
        this.shortName = this.shortName + this.lastName.charAt(0).toUpperCase();
      }
      this.usersession.userShortName = this.shortName;
      localStorage.setItem('profileName', this.shortName);
      this.name = this.decodedToken.name;
      this.usersession.userName = this.name;
      // User role management
      const isApproved = this.decodedToken.isApproved;
      const roles = this.decodedToken.roles;
      const isEnabledUser = this.decodedToken.isActive;
      const userGuid = this.decodedToken.sub;
      const localRegDate = moment.utc(this.decodedToken.registrationDateTime).local();
      const duration = moment().diff(localRegDate, 'hours');
      console.log('Date from API: ', this.decodedToken.registrationDateTime);
      console.log('localRegDate : ', localRegDate);
      console.log('Duration : ', duration);
      localStorage.setItem('registeredDateTime', JSON.stringify(localRegDate));
      this.usersession.userGUID = userGuid;
      if (JSON.parse(isApproved)) {
        this.usersession.isApprovedUser = true;
        this.usersession.isPendingApproval = false;
      } else {
        if (duration >= Number.parseInt(environment.maxApprovalTime, 10)) {
          this.usersession.isPendingApproval = true;
        } else {
          this.usersession.isPendingApproval = false;
        }
        this.usersession.isApprovedUser = false;
      }
      if (JSON.parse(isEnabledUser)) {
        this.usersession.isActiveUser = true;
      } else {
        this.usersession.isActiveUser = false;
      }
      if (roles.indexOf(environment.hiveAdminRole) > -1) {
        this.usersession.isHiveAdmin = true;
      } else {
        this.usersession.isHiveAdmin = false;
      }
      console.log('User session form decoded Token : ', this.usersession);
      this.setUserData(this.usersession);
    } else {
      // reset password flow, do nothing;
    }
  }
  decodeAccessToken(token) {
    try {
      return jwt_decode(token);
    } catch (error) {
      throw (error);
    }
  }
  setUserData(userSession) {
    let userSessionData = {
      isApprovedUser: userSession.isApproved,
      isActiveUser: userSession.isActiveUser,
      isHiveAdmin: userSession.isHiveAdmin,
      userGUID: userSession.userGUID,
      userName: userSession.userName,
      userShortName: userSession.userShortName,
      isPendingApproval: userSession.isPendingApproval
    }
    localStorage.setItem('userSession', JSON.stringify(userSessionData));
  }
}
