import { IonicAuthOptions } from '@ionic-enterprise/auth'

export const azureWebConfig : IonicAuthOptions = {
  // the auth provider
  authConfig: 'azure',
  // The platform which we are running on
  platform: 'web',
  // client or application id for provider
  clientID: Id,
  // the discovery url for the provider
  // OpenID configuration
  discoveryUrl: url
  // the URI to redirect to after log in
  redirectUri: 'http://localhost:8100/login',
  // requested scopes from provider
  scope: scope,
  // the URL to redirect to after log out
  logoutUrl: 'http://localhost:8100/login',
  // Show provider login in either current window or new tab
  implicitLogin: "CURRENT"
};



export const azureNativeConfig : IonicAuthOptions = {
  // the auth provider
  authConfig: 'azure',
  // The platform which we are running on
  platform: 'capacitor',
  // client or application id for provider
  clientID: id,
  // the discovery url for the provider
  // OpenID configuration
  discoveryUrl: url,
  // the URI to redirect to after log in
  redirectUri: redirectUri,
  // requested scopes from provider
  scope: scope,
  // the URL to redirect to after log out
  logoutUrl: 'io.ionic.presidio.demo://login',
  // The type of iOS webview to use. 'shared' will use a webview that can share session/cookies
  // on iOS to provide SSO across multiple apps but will cause a prompt for the user which asks them
  // to confirm they want to share site data with the app. 'private' uses a webview which will not
  // prompt the user but will not be able to share session/cookie data either for true SSO across
  // multiple apps.
  iosWebView: 'private'
};


export const environment = {
  production: true
};
