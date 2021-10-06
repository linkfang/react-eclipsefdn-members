# react-eclipsefdn-members

[![Netlify Status](https://api.netlify.com/api/v1/badges/b0087dce-17ae-46f6-bbea-b3813d35be3f/deploy-status)](https://app.netlify.com/sites/eclipsefdn-react-members/deploys)

Supported by our member organizations, the Eclipse Foundation provides our community with Intellectual Property, Mentorship, Marketing, Event and IT Services.


<!-- TOC -->
- [react-eclipsefdn-members](#react-eclipsefdn-members)
  - [Getting Started](#getting-started)
  - [CSRF and API Security](#csrf-and-api-security)
  - [Running the project in included web server](#running-the-project-in-included-web-server)
    - [Dependencies to run](#dependencies-to-run)
    - [Setup](#setup)
    - [Running](#running)
    - [Docker](#docker)
      - [Generate Certs for HTTPS](#generate-certs-for-https)
      - [Update your Host file](#update-your-host-file)
      - [Environment Variables](#environment-variables)
    - [KeyCloak Setup](#keycloak-setup)
      - [Create a realm](#create-a-realm)
      - [Create a user](#create-a-user)
      - [Eclipse Foundation as an Identity Provider](#eclipse-foundation-as-an-identity-provider)
      - [Client Configuration](#client-configuration)
  - [Contributing](#contributing)
    - [Declared Project Licenses](#declared-project-licenses)
  - [Bugs and feature requests](#bugs-and-feature-requests)
  - [Authors](#authors)
  - [Trademarks](#trademarks)
  - [Copyright and license](#copyright-and-license)
<!-- /TOC -->

## Getting Started

Before you start, please make sure you have [yarn](https://classic.yarnpkg.com/en/docs/install/) installed.

Once that's done, you can install dependencies, build assets and start a dev server:

```bash
yarn --cwd src/main/www
yarn --cwd src/main/www build
yarn --cwd src/main/www start
yarn --cwd src/main/www start-spec
```

The web app will run in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.


## CSRF and API Security
Currently, the endpoints that can contain personal data of users have been secured by OIDC and CSRF. What this means for development in the front end is all requests will need to be performed with a legitimate Eclipse Foundation login and account for the CSRF header.

Pertaining to data posted to the API, there is no current automatic deletion policy enforced, and no current way in the UI to send a call to delete data. If you wish to delete this data, you will need to craft javascript within the site to take advantage of the session and CSRF headers, and manually make the call. More information on the form deletion endpoint can be seen in the OpenAPI spec under `/spec/openapi.yml`.

Additionally, when requesting any PII/form data, a CSRF token will need to be passed unless disabled on a development server. This token will live under the `x-csrf-token` header that is supplied on every request the user makes to the server, including the unprotected `/csrf/` endpoint that is available. The token should be posted back to the server using the same header. This value will remain the same for the duration of the browser session.

[^ Top](#react-eclipsefdn-members)
## Running the project in included web server

### Dependencies to run

- Docker-compose
- Maven
- Java version 11

[^ Top](#react-eclipsefdn-members)
### Setup

As part of the set up, you will need to create a `secret.properties` file within the `./config` folder and set up the secrets that are required to run the application. If named `secret.properties`, the file should be ignored by Github automatically, making it less risky that credentials are accidentally uploaded to a branch.

The fields required to run are the datasource and OIDC properties. The datasource properties should be a set of user credentials that can write to a local mariadb instance. Within that mariadb instance, a database should be created to contain the data used in development. Once created, a JDBC URL can now be formed for the new database. This URL should follow the pattern below, with port not always required (depending on your local setup and proxy settings).  This will be set in the `secret.properties` file.

```
quarkus.datasource.jdbc.url = jdbc:mariadb://<host><:port?>/<databaseName>
```

Once this is set, set the `quarkus.datasource.username` and `quarkus.datasource.password` fields to the user with access to the given database in the `secret.properties` file.

The above will need to be repeated for the database used to access the EclipseDB data. This data is a separately managed datasource that is connected to to read and update organization information. The base definitions of these tables as required for the connection of this API are defined under `./src/main/resources/sql/` in the files `rem_ddl.sql` and `eclipsedb_ddl.sql`.

The other half of secret configuration is setting up the OIDC credentials for connecting to a keycloak server. This server will require a realm to be set up for access. Using the name `rem_realm` is easiest as it requires no changes to the configuration to work.

The `quarkus.oidc.auth-server-url` property in the `secret.properties` file will need to be updated. The value set should be the public realm address for your server and realm. The rest of the endpoints will be taken care of by the wellknown endpoint available in Keycloak, and don't need to be configured. For the dockerized service, this should be set to your local IP address (note, not your public address). This can be retrieved from your IP configuration application and added in the format displayed in the `sample.secret.properties` file.

Inside that realm, create a client and update the `quarkus.oidc.client-id` property within the `secret.properties` file. Inside that client, open the settings and go to the credentials tab. The secret will need to be copied and set into the `secret.properties` file in the `quarkus.oidc.credentials.client-secret.value` property. For proper reading and usage of development data, 3 users should be created and added to the realm with the usernames `user1`, `user2`, and `user3`.

With these properties updated, the server should be able to start and authenticate properly. If the 3 users mentioned within the OIDC configuration section were added, the data should be accessible in a way that is comparable to how it would be in production.

To enable connections to the FoundationDB API, a second client will need to be created in the same realm as was created for the FoundationDB API service. This second client will be set up similarly to the first, but have service accounts enabled. Once enabled, roles will need to be set within the service account giving all org related roles, as well as sys read access. This should properly restrict service access to the API.

As a side note, the insertion of data into the database can be enabled/disabled for development environments by setting the following fields within `src/main/resources/application.properties`:

1. Setting `%dev.eclipse.dataloader.enabled` to true/false. This property is what enables the Data bootstrap to load in mock data.

[^ Top](#react-eclipsefdn-members)
### Running

To run the server as a local instance as a stack, you will need to compile the application first, which can be done through `make compile-start`. This takes care of all of the steps needed to cleanly build and rebuild the application from scratch. This will also run the stack with the packaged application.

[^ Top](#react-eclipsefdn-members)
### Docker

We include a `docker-compose.yml` file with this project to help you get started. This includes:

* [mariadb:latest](https://hub.docker.com/_/mariadb)
* [postgres:12.4](https://hub.docker.com/_/postgres)
* [jboss/keycloak:11.0.1](https://hub.docker.com/r/jboss/keycloak/)

#### Generate Certs for HTTPS

, You will need to create a certificate in order to serve the Application on https. Make sure that the Common Name (e.g. server FQDN or YOUR name) is set to `www.rem.docker`.

```sh
make generate-cert
```

#### Update your Host file

We use [jwilder/nginx-proxy](https://hub.docker.com/r/jwilder/nginx-proxy) as automated Nginx reverse proxy for our docker containers. So instead of having to lookup the port of a new service, you can simply remember it's internal dev hostname.

Different operating system, different file paths!

Windows: C:\Windows\System32\drivers\etc\hosts
Linux / MacOS: /etc/hosts

```
# rem services

127.0.0.1 keycloak
127.0.0.1 api.rem.docker
127.0.0.1 www.rem.docker
127.0.0.1 nginx.rem.docker
```

#### Environment Variables

To use our `docker-compose.yml` file, create a `.env` file in the root of this project and insert your key/value pairs in the following format of KEY=VALUE. You must make sure to update the value of each variable:

```sh
REM_KEYCLOAK_USER=user_sample
REM_KEYCLOAK_PASSWORD=password_sample
REM_MYSQL_PASSWORD=password_sample
REM_POSTGRES_DB=keycloak_sample
REM_POSTGRES_USER=keycloak_sample
REM_POSTGRES_PASSWORD=password_sample
```

Once this initial setup is done, you can start these services with this command:

```sh
make compile-start
```

[^ Top](#react-eclipsefdn-members)
### KeyCloak Setup

#### Create a realm

Realm is a concept in Keycloak that refers to an object managing a set of users along with their credentials, roles and groups. To create a `realm`, visit [Keycloak Admin Console](http://localhost:8080/auth/admin), mouse hover where it says `master` and click on `Add Realm`, set the name to `rem_realm` and click `create`.

#### Create a user

To create a `user`, visit [Keycloak Admin Console](http://localhost:8080/auth/admin) and click on `Users` in the left menu. Then press the `Add User` button and fill up the form with information about the user you wish to create.

To login as the user, you will need to set an initial password. To set a password, click on `Credentials`,  then set a password via the `Set Password` form. You will need to enter it twice to confirm it. You will probably want to disable `Temporary` password by clicking on the `ON` button to turn that feature off.

#### Eclipse Foundation as an Identity Provider

It's possible to delegate authentication to third party identity providers with Keycloak. With this App, we want to leverage [Eclipse Foundation OpenID Connect](https://wiki.eclipse.org/OpenID) since we want our users to login with our standard login page. In order to do so, you will need a client_id/secret from us.

Assuming you have access to that already, please follow these steps to add the Eclipse Foundation as an `Identity Provider`.

1. Click on `Identity Providers` in the left menu then click on `Add provider...`. Select `OpenID Connect v1.0` from the dropdown menu.

2. Populate the form with the following information:

```
Alias : eclipsefdn
Display Name: Eclipse Foundation
Sync Mode : Force (To make sure the user is updated each time they login)
Authorization URL: https://accounts.eclipse.org/oauth2/authorize
Token URL: https://accounts.eclipse.org/oauth2/token
Logout URL: https://accounts.eclipse.org/oauth2/revoke
User Info URL: https://accounts.eclipse.org/oauth2/UserInfo
Client Authentication: Client secret sent as post
Client ID: <CLIENT_ID>
Client Secret: <CLIENT_SECRET>
Default Scopes: openid profile email offline_access
```

1. Finally, we want to configure Eclipse Foundation has the only authentication option. Click on `Authentication` in the left menu. Set `Identity Provider Redirector` to `required` and `Forms` to `disabled`. Finally, click on Actions and set `eclipsefdn` has the `Default Identity Provider`.


#### Client Configuration

Clients tab allows you to manage list of allowed applications.

To create a client, click on `Clients` in the left menu. You can set the client_id to `rem_app` and the `Root URL` to `http://localhost:3000`. Make sure that the `Client Protocol` is set to `openid-connect`  and the `Access Type` is set to `confidential`.

An additional client will be required for the FoundationDB API access. Information on setting up this client should be defined under the FoundationDB API README file. Once the client is acquired, it will need to have its client ID and secret set in the secret.properties file. They will be respectively set under the properties `quarkus.oidc-client.client-id` and `quarkus.oidc-client.credentials.secret`. The URL of the client within the FoundationDB API realm will need to also be set within the secret.properties under the `quarkus.oidc-client.auth-server-url` property.

[^ Top](#react-eclipsefdn-members)
## Contributing

1. [Fork](https://help.github.com/articles/fork-a-repo/) the [eclipsefdn/react-eclipsefdn-members](https://github.com/eclipsefdn/react-eclipsefdn-members) repository
2. Clone repository: `git clone https://github.com/[your_github_username]/react-eclipsefdn-members.git`
3. Create your feature branch: `git checkout -b my-new-feature`
4. Commit your changes: `git commit -m 'Add some feature' -s`
5. Push feature branch: `git push origin my-new-feature`
6. Submit a pull request

[^ Top](#react-eclipsefdn-members)
### Declared Project Licenses

This program and the accompanying materials are made available under the terms
of the Eclipse Public License v. 2.0 which is available at
http://www.eclipse.org/legal/epl-2.0.

SPDX-License-Identifier: EPL-2.0

[^ Top](#react-eclipsefdn-members)
## Bugs and feature requests

Have a bug or a feature request? Please search for existing and closed issues. If your problem or idea is not addressed yet, [please open a new issue](https://github.com/eclipsefdn/react-eclipsefdn-members/issues/new).

[^ Top](#react-eclipsefdn-members)
## Authors

**Christopher Guindon (Eclipse Foundation)**

- <https://twitter.com/chrisguindon>
- <https://github.com/chrisguindon>

**Martin Lowe (Eclipse Foundation)**

- <https://github.com/autumnfound>

**Zhou Fang (Eclipse Foundation)**

- <https://github.com/linkfang>

[^ Top](#react-eclipsefdn-members)
## Trademarks

* Eclipse® is a Trademark of the Eclipse Foundation, Inc.
* Eclipse Foundation is a Trademark of the Eclipse Foundation, Inc.

[^ Top](#react-eclipsefdn-members)
## Copyright and license

Copyright 2021 the [Eclipse Foundation, Inc.](https://www.eclipse.org) and the [react-eclipsefdn-members authors](https://github.com/eclipsefdn/react-eclipsefdn-members/graphs/contributors). Code released under the [Eclipse Public License Version 2.0 (EPL-2.0)](https://github.com/eclipsefdn/react-eclipsefdn-members/blob/src/LICENSE).
