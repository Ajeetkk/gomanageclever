const environment = {
    production: false,
    languages: ['en'],
    defaultLang: 'en',
    oAuth: {
        tenant: 'goorg',
        clientId: 'e6a10555-98ad-4d1c-8ac1-c2bfb4973aa9',
        signInPolicy: 'b2c_1a_signup_signin',
        resetPasswordPolicy: 'b2c_1a_passwordreset',
        registrationPolicy: 'b2c_1a_invitation',
        redirectUri: 'http://localhost:3000/login',
        postLogoutUrl: 'http://localhost:3000',
        domainhint: 'rrps',
        domain: '@bosch.com',
        // tenant: '#{authTenantName}#',
        // clientId: '#{authClientId}#',
        // signInPolicy: '#{authSignInPolicy}#',
        // resetPasswordPolicy: '#{authResetPasswordPolicy}#',
        // registrationPolicy: '#{authregistrationPolicy}#',
        // redirectUri: '#{authredirectUri}#',
        // postLogoutUrl: '#{authpostLogoutUrl}#',
        // domainhint: '#{authdomainhint}#',
        // domain: '#{authdomain}#'
    },
    googleMapKey: 'AIzaSyBRcZGkS9vwRJs6LJe0vXzNeTbE7tJvSdM',
    // legacyAdminAppUrl: 'https://psadminuiinttest.azurewebsites.net',
    hiveAdminRole: 'HiveAdmin',
    accessTokenKey: 'msal.idtoken',
    maxApprovalTime: '72',
    supportContact: 'supportadmin@byom.de'
};

export default environment;