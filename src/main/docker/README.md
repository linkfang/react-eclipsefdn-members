# react-eclipsefdn-members

[![Build Status](https://travis-ci.org/EclipseFdn/react-eclipsefdn-members.svg?branch=master)](https://travis-ci.org/EclipseFdn/react-eclipsefdn-members)

Supported by our member organizations, the Eclipse Foundation provides our community with Intellectual Property, Mentorship, Marketing, Event and IT Services.

## Getting Started

### Running the project in only React App:

#### Setup
Go to `src/main/js`, run `npm install`

#### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Running the project in included web server

#### Dependencies to run  

- MariaDB
- Keycloak
- Maven
- Java version 11 <

#### Setup

As part of the set up, you will need to create a `secret.properties` file within the `./config` folder and set up the secrets that are required to run the application. If named `secret.properties`, the file should be ignored by Github automatically, making it less risky that credentials are accidentally uploaded to a branch.  

The fields required to run are the datasource and OIDC properties. The datasource properties should be a set of user credentials that can write to a local mariadb instance. Within that mariadb instance, a database should be created to contain the data used in development. Once created, a JDBC URL can now be formed for the new database. This URL should follow the pattern below, with port not always required (depending on your local setup and proxy settings).  

```  
quarkus.datasource.jdbc.url = jdbc:mariadb://<host><:port?>/<databaseName>
```  

Once this is set, set the `quarkus.datasource.username` and `quarkus.datasource.password` fields to the user with access to the given database in the `secret.properties` file. 

The other half of secret configuration is setting up the OIDC credentials for connecting to a keycloak server. This server will require a realm to be set up for access. Using the name `myrealm` is easiest as it requires no changes to the configuration to work. If the realm is named differently or the Keycloak server is not running locally, the `quarkus.oidc.auth-server-url` property in the `src/main/resources/application.properties` file will need to be updated. The value set should be the public realm address for your server and realm. The rest of the endpoints will be taken care of by the wellknown endpoint available in Keycloak, and don't need to be configured.  

Inside that realm, create a client and update the `quarkus.oidc.client-id` property within the `secret.properties` file. Inside that client, open the settings and go to the credentials tab. The secret will need to be copied and set into the `secret.properties` file in the `quarkus.oidc.credentials.client-secret.value` property. For proper reading and usage of development data, 3 users should be created and added to the realm with the usernames `user1`, `user2`, and `user3`.  

With these properties updated, the server should be able to start and authenticate properly. If the 3 users mentioned within the OIDC configuration section were added, the data should be accessible in a way that is comparable to how it would be in production.

As a side note, regeneration of the database on start along with the insertion of data into the database can be disabled for development environments by setting the following fields within `src/main/resources/application.properties`:

1. Setting `%dev.eclipse.dataloader.enabled` to false. This property is what enables the Data bootstrap to load in mock data.  
2. Removing the `%dev.quarkus.hibernate-orm.database.generation` property or commenting it out. This is what resets the database to empty on start.

#### Running

To run the server as a local instance as a stack, first run `npm install` in `src/main/js`, this will install all the required package for the react app. Then run `npm run build`. This will package the React app and copy it into the static web resources of the server source. To run as a development application, which is the fastest way with the least dependencies, run the following command: `mvn compile quarkus:dev -Dconfig.secret.path=$(pwd)/config/secret.properties` or `mvn compile quarkus:dev "-Dconfig.secret.path=$pwd/config/secret.properties"` when running in a Windows PowerShell.

## Contributing

1. [Fork](https://help.github.com/articles/fork-a-repo/) the [eclipsefdn/react-eclipsefdn-members](https://github.com/eclipsefdn/react-eclipsefdn-members) repository
2. Clone repository: `git clone https://github.com/[your_github_username]/react-eclipsefdn-members.git`
3. Create your feature branch: `git checkout -b my-new-feature`
4. Commit your changes: `git commit -m 'Add some feature' -s`
5. Push feature branch: `git push origin my-new-feature`
6. Submit a pull request

### Declared Project Licenses

This program and the accompanying materials are made available under the terms
of the Eclipse Public License v. 2.0 which is available at
http://www.eclipse.org/legal/epl-2.0.

SPDX-License-Identifier: EPL-2.0

## Related projects

### [EclipseFdn/solstice-assets](https://github.com/EclipseFdn/solstice-assets)

Images, less and JavaScript files for the Eclipse Foundation look and feel.

### [EclipseFdn/hugo-solstice-theme](https://github.com/EclipseFdn/hugo-solstice-theme)

Hugo theme of the Eclipse Foundation look and feel. 

## Bugs and feature requests

Have a bug or a feature request? Please search for existing and closed issues. If your problem or idea is not addressed yet, [please open a new issue](https://github.com/eclipsefdn/react-eclipsefdn-members/issues/new).


## Author

**Christopher Guindon (Eclipse Foundation)**

- <https://twitter.com/chrisguindon>
- <https://github.com/chrisguindon>

**Yi Liu (Eclipse Foundation)**

- <https://github.com/flora8984461>

**Martin Lowe (Eclipse Foundation)**

- <https://github.com/autumnfound>

## Trademarks

* Eclipse® is a Trademark of the Eclipse Foundation, Inc.
* Eclipse Foundation is a Trademark of the Eclipse Foundation, Inc.

## Copyright and license

Copyright 2020 the [Eclipse Foundation, Inc.](https://www.eclipse.org) and the [react-eclipsefdn-members authors](https://github.com/eclipsefdn/react-eclipsefdn-members/graphs/contributors). Code released under the [Eclipse Public License Version 2.0 (EPL-2.0)](https://github.com/eclipsefdn/react-eclipsefdn-members/blob/src/LICENSE).
