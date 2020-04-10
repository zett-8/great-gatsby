<!-- AUTO-GENERATED-CONTENT:START (STARTER) -->
<p align="center">
  <a href="https://www.gatsbyjs.org">
    <img alt="Gatsby" src="https://www.gatsbyjs.org/monogram.svg" width="60" />
  </a>
</p>
<h1 align="center">
  Gatsby's custom starter
</h1>
<img src="https://github.com/Zett-8/images/blob/master/gg.png" width="100%" />

Kick off your project with this default boilerplate. This starter ships with the main Gatsby configuration files you might need to get up and running blazing fast with the blazing fast app generator for React.

## 🖥️ Tech stack

- **Gatsby.js** for client side

  - PWA (optional)
  - Styled-component
  - Material-UI

- **Hasura** for backend and DB

- **Apollo** for handling graphql and management state

- **Heroku** for deploying Hasura

- **Firebase**

  - **Hosting** for deploying gatsby file
  - **Authentication** for secure access to Hasura DB
  - **Cloud functions** for handling JWT

## 🚀 Quick start

1.  **Create a Gatsby site.**

    Use the Gatsby CLI to create a new site, specifying this repo.

    ```shell
    gatsby new <appname> https://github.com/Zett-8/great-gatsby
    ```

1.  **Start developing.**

    Navigate into your new site’s directory and start it up.

    ```shell
    cd <appname>/
    gatsby develop
    ```

1.  **Check on browser**

    The site is now running at `http://localhost:8000`

    _Note: You'll also see a second link: _`http://localhost:8000/___graphql`_. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql)._

## ⚙️ Set up dependencies

1.  **Init Firebase project**

    ```shell
    npm install -g firebase-tools

    firebase init

    firebase deploy
    ```

    then fill Firebase config

    ./src/provider/firebase.js

    ```javascript
    if (!firebase.apps.length)
      firebase.initializeApp({
        apiKey: '',
        authDomain: '',
        databaseURL: '',
        projectId: '',
        storageBucket: '',
        messagingSenderId: '',
        appId: '',
      })
    ```

1.  **Build postgres DB and Hasura on Heroku**

    You can easily do this just by clicking the button!  
    Follow the official document of Hasura  
    **[https://hasura.io/](https://hasura.io/)**

1.  **Specify graphql endpoint for Apollo**

    ./src/provider/apolloAuth.js

    ```javascript
    const client = new ApolloClient({
      uri: '<ENDPOINT HERE>',
    })
    ```

    then enable Apollo Provider!

    ./gatsby-wrapper.js

    ```javascript
    export default ({ element }) => (
      <>
        <ApolloAuthProvider>
          <CssBaseline />
          {element}
        </ApolloAuthProvider>
      </>
    )
    ```

## 📝 What's inside?

A quick look at the top-level files and directories you'll see in a Gatsby project.

    .
    ├── node_modules
    ├── src
    ├── .gitignore
    ├── .prettierrc
    ├── gatsby-browser.js
    ├── gatsby-config.js
    ├── gatsby-node.js
    ├── gatsby-ssr.js
    ├── gatsby-wrapper.js
    ├── LICENSE
    ├── package-lock.json
    ├── package.json
    └── README.md

## 🎓 Learning Gatsby

Looking for more guidance? Full documentation for Gatsby lives [on the website](https://www.gatsbyjs.org/). Here are some places to start:

- **For most developers, we recommend starting with our [in-depth tutorial for creating a site with Gatsby](https://www.gatsbyjs.org/tutorial/).** It starts with zero assumptions about your level of ability and walks through every step of the process.

- **To dive straight into code samples, head [to our documentation](https://www.gatsbyjs.org/docs/).** In particular, check out the _Guides_, _API Reference_, and _Advanced Tutorials_ sections in the sidebar.

<!-- AUTO-GENERATED-CONTENT:END -->
