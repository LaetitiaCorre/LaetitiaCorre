import * as React from "react";
import { graphql } from "gatsby";
import { createGlobalStyle } from "styled-components";
import Masonry from "react-masonry-css";
import { Layout, Container } from "../components";

const MasonryStyle = createGlobalStyle`
.masonry {
  display: flex;
  margin-left: -0.25rem; /* gutter size offset */
  width: auto;
}
.masonry-column {
  padding-left: 0.25rem; /* gutter size */

  > * {
    display: block;
    margin-bottom: 0.25rem;
    width: 100%;
    height: auto;
  }
}
`;

interface PageHomeProps {
  data: {
    site: {
      siteMetadata: {
        title: string;
      };
    };
    allImageSharp: {
      edges: Array<{
        node: {
          resize: {
            src: string;
            height: string;
          };
        };
      }>;
    };
  };
}

export default function PageHome({ data }: PageHomeProps) {
  return (
    <Layout siteMetadata={data.site.siteMetadata}>
      <MasonryStyle />
      <Container as="main">
        <Masonry
          className="masonry"
          columnClassName="masonry-column"
          breakpointCols={{
            default: 3,
            900: 2,
            600: 1,
          }}
        >
          {data.allImageSharp.edges.map((edge, index) => (
            <img key={index} src={edge.node.resize.src} alt="" />
          ))}
        </Masonry>
      </Container>
    </Layout>
  );
}

export const query = graphql`
  query GetPageHomeData {
    site {
      siteMetadata {
        title
      }
    }
    allImageSharp {
      edges {
        node {
          resize(width: 300) {
            src
          }
        }
      }
    }
  }
`;
