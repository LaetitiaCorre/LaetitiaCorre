const path = require("path");

module.exports = {
  siteMetadata: {
    title: "Laëtitia Corré",
    siteUrl: "https://laetitia-corre.com",
  },
  plugins: [
    "gatsby-plugin-styled-components",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "portfolio",
        path: path.join(__dirname, "src", "portfolio"),
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
  ],
};
