let graphql;

// Generate template data and inject into pages
exports.createPages = ({ graphql: graphqlObj }) => {
  graphql = graphqlObj;
};

exports.onPostBootstrap = async ({ options }) => {
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

  const pluginOptions = options["gatsby-plugin-endpoints"];

  if (pluginOptions.filter) {
    allPagesData = allPagesData.filter((item) =>
      pluginOptions.filter(item, req)
    );
  }

  const endpoints = allPagesData.map(({ node }) => node.path);

  require("fs/promises").writeFile(
    "./public/endpoints.json",
    JSON.stringify(endpoints),
    { encoding: "utf-8" }
  );
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
      allPagesData = allPagesData.filter((item) =>
        pluginOptions.filter(item, req)
      );
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
