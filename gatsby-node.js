const path = require('path');

let graphql;

// Generate template data and inject into pages
exports.createPages = ({ graphql: graphqlObj }) => {
  graphql = graphqlObj;
};

exports.onCreateDevServer = async ({ app }) => {
    app.get("/endpoints.json", async (req, res) => {
      let {
        data: {
          pages: { edges: allPagesData },
        },
      } = await graphql(
        `
          {
            pages: allSitePage {
              edges {
                node {
                  path
                  pageContext
                }
              }
            }
          }
        `
      );
  
      res.setHeader("Content-Type", "application/json");
      res.send(
        JSON.stringify(
          allPagesData.map(({ node: { path } }) => path),
          undefined,
          3
        )
      );
    });
  };