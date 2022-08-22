# 📖 gatsby-plugin-endpoints [![npm](https://img.shields.io/npm/v/gatsby-plugin-endpoints.svg)](https://www.npmjs.com/package/gatsby-plugin-endpoints) [![License](https://img.shields.io/npm/l/gatsby-plugin-endpoints.svg)](https://github.com/bartlomiejzuber/gatsby-plugin-endpoints/blob/main/LICENSE)

Simple Gatsby plugin that exposes an endpoint that lists all the Gatsby's pages URLs.


## Installation

- Install gatsby-plugin-endpoints with npm/yarn/pnpm:

    ```bash
    npm i gatsby-plugin-endpoints --save-dev
    ```

- Add it to the array of `plugins` in `gatsby.config.js`: 
```javascript
module.exports = {
  // ... Other settings
  plugins: [
    // ... Other plugins
    `gatsby-plugin-endpoints`,
  ]
}
```

- Start the Gatsby's development server
```bash
gatsby develop
```

- Navigate to URL
```
http://localhost:8000/endpoints.json
```

- You'll get list of all pages and blog posts in JSON format e.g.
```json
[
   "/blog/sample-article",
   "/blog/sample2-article/",
   "/page1/",
   "/page2/"
]
```

License
--------

Made with :sparkling_heart: by [Bartlomiej Zuber (bartlomiej.zuber@outlook.com)](mailto:bartlomiej.zuber@outlook.com) and licensed under the [MIT License](LICENSE)

