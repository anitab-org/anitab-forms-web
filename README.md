# Open Source Programs (Frontend)

Open Source Programs (OSP) is an application that simplifies the processing and selection procedure of Open Source Programs of AnitaB.org Open Source or other third-party programs. This is the Front-end repo for OSP.

## Tech Stack

-   ReactJS
-   Redux

## Setup

To setup the project locally, go through [this wiki page](https://github.com/anitab-org/open-source-programs-web/wiki/Fork,-Clone,-Remote-and-Pull-Request).
**Note:** Before setting up the frontend make sure to have Setup the [Backend Repo](https://github.com/anitab-org/open-source-programs-backend).

1. Create a `.env` file in the project root directory and add **Client ID** and **Callback URL** of Google like this:

```
REACT_APP_GOOGLE_CLIENT_ID=<Google App Client ID>
REACT_APP_GOOGLE_CALLBACK_URL=<Google Callback URL>
```
To get **Client ID** and **Callback URL** of Google OAuth App follow [this docs](https://developers.google.com/adwords/api/docs/guides/authentication#create_a_client_id_and_client_secret).

2. To start the server:

```
npm install
npm start
```

3. Navigate to `http://localhost:3000/` in your browser.
4. You can terminate the process by `Ctrl+C` in your terminal.

## Contributing

Please read the [Contributing guidelines](.github/CONTRIBUTING.md), [Code of Conduct](https://github.com/anitab-org/open-source-programs-web/blob/develop/CODE_OF_CONDUCT.md) and [Reporting Guidelines](https://github.com/anitab-org/open-source-programs-web/blob/develop/REPORTING_GUIDELINES.md)

## Contact

You can reach the admins, maintainers, and our community on [AnitaB.org Open Source Zulip](https://anitab-org.zulipchat.com/). If you are interested in contributing to the OSP project, you may join the stream [#open-source-progs](https://anitab-org.zulipchat.com/#narrow/stream/237907-open-source-progs) and ask questions or interact with the community. Join Us!
