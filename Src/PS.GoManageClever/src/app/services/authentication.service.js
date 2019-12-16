import * as Msal from 'msal';
import environment from '../../environments/config';


// const B2CTodoAccessTokenKey = environment.accessTokenKey;
const domainhint = environment.oAuth.domainhint;
// const domain = environment.oAuth.domain;

const tenantConfig = {
  tenant: environment.oAuth.tenant,
  clientID: environment.oAuth.clientId,
  signInPolicy: environment.oAuth.signInPolicy,
  redirectUri: environment.oAuth.redirectUri,
  postLogoutUrl: environment.oAuth.postLogoutUrl,
  b2cScopes: [''],
  validateAuthority: false,
  cacheLocation: 'localStorage',
  // no ntid required for internal user login
  extraParams: 'domain_hint=' + domainhint + '&login_hint=user' + environment.oAuth.domain
};

// Configure the authority for Azure AD B2C
const authority = 'https://' + tenantConfig.tenant + '.b2clogin.com/' + tenantConfig.tenant
  + '.onmicrosoft.com/' + tenantConfig.signInPolicy;

// B2C SignIn SignUp Policy Configuration
const clientApplication = new Msal.UserAgentApplication(
  tenantConfig.clientID, authority,
  function callback(errorDesc, token, error, tokenType) {
  }, {
    cacheLocation: tenantConfig.cacheLocation, validateAuthority: tenantConfig.validateAuthority,
    redirectUri: tenantConfig.redirectUri,postLogoutRedirectUri: tenantConfig.postLogoutUrl
  }
);

export default class AuthService {
  login() {
    clientApplication.authority = 'https://' + tenantConfig.tenant + '.b2clogin.com/' + tenantConfig.tenant
      + '.onmicrosoft.com/' + tenantConfig.signInPolicy;
    this.authenticate();
  }


  authenticate() {
    if (localStorage.getItem('UserType') === 'Internal') {
      clientApplication.loginRedirect(tenantConfig.b2cScopes, tenantConfig.extraParams);
    } else {
      clientApplication.loginRedirect(tenantConfig.b2cScopes);
    }
  }

  logout() {
    clientApplication.logout();
  }

  isLoggedIn() {
    return clientApplication.getUser() != null;
  }

  getUser() {
    return clientApplication.getUser();
  }
}
