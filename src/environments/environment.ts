// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  redirectUrl: 'localhost:4200/login',
  // Orcid information
  orcidUrl: 'https://sandbox.orcid.org/oauth/token',
  orcidClientId: 'APP-S49TQ9Y6E58U5928',
  orcidClientSecret: 'a2df8b0c-6866-4132-a063-e3e4ab22a6a5',
  orcidUserUrl: 'https://api.sandbox.orcid.org/v2.1/',
  // Github information
  githubClientId: 'Iv1.7ea5b696c1adf0bf',
  githubClientSecret: '1d815cf181387e599d81451d52952c86159230a1',
  githubApi: "https://github.com/login/oauth/access_token",
  githubUserApi: "https://api.github.com/user",
  jroBackendUrl: "http://172.17.62.24:8000",
  composerUrl: "http://172.17.62.24:5002"
};                                                                                                                                                             
