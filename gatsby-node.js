let graphql;

// Generate template data and inject into pages
exports.createPages = ({ graphql: graphqlObj }) => {
  graphql = graphqlObj;
};

exports.onCreateDevServer = async ({ app }, pluginOptions = {}) => {
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

      if (pluginOptions.filter) {
        allPagesData = allPagesData.filter((item) => pluginOptions.filter(item, req));
      }
  
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