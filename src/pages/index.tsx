import * as React from "react";
import { graphql } from "gatsby";
import styled, { createGlobalStyle } from "styled-components";
import Masonry from "react-masonry-css";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { Layout, Container, Lightbox } from "../components";

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
const MasonryItem = styled.button.attrs({ type: "button" })<{
  image: string;
}>`
  appearance: none;
  border: 0;
  background: transparent;
  display: block;
  width: 100%;
  background-image: url(${(props) => props.image});
  background-position: center top;
  background-size: cover;
  cursor: pointer;
`;
const ArrowButton = styled.button.attrs({ type: "button" })`
  appearance: none;
  background: transparent;
  border: 0;
  color: #fff;
  font-size: 1.5rem;
  padding: 1rem;
  cursor: pointer;
  margin: 0 0.5rem;
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
            aspectRatio: number;
          };
          fluid: {
            src: string;
          };
        };
      }>;
    };
  };
}

export default function PageHome({ data }: PageHomeProps) {
  const [currentImageIndex, setCurrentImageIndex] = React.useState<
    number | null
  >(null);
  const onPrevious = () => {
    if (currentImageIndex == null) {
      return;
    }
    setCurrentImageIndex(
      currentImageIndex - 1 < 0
        ? data.allImageSharp.edges.length - 1
        : currentImageIndex - 1
    );
  };
  const onNext = () => {
    if (currentImageIndex == null) {
      return;
    }
    setCurrentImageIndex(
      currentImageIndex + 1 >= data.allImageSharp.edges.length
        ? 0
        : currentImageIndex + 1
    );
  };

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
            <MasonryItem
              key={index}
              image={edge.node.resize.src}
              onClick={() => setCurrentImageIndex(index)}
              style={{
                paddingTop: `calc(100% * ${Math.max(
                  1,
                  edge.node.resize.aspectRatio
                )})`,
              }}
            />
          ))}
        </Masonry>
      </Container>
      {currentImageIndex != null && (
        <Lightbox
          isOpen
          onClose={() => setCurrentImageIndex(null)}
          isDismissable
        >
          <ArrowButton onClick={onPrevious}>
            <AiFillCaretLeft />
          </ArrowButton>
          <img
            src={data.allImageSharp.edges[currentImageIndex].node.fluid.src}
            alt=""
          />
          <ArrowButton onClick={onNext}>
            <AiFillCaretRight />
          </ArrowButton>
        </Lightbox>
      )}
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
          resize(width: 600, fit: INSIDE, quality: 80) {
            src
            aspectRatio
          }
          fluid(maxWidth: 1000, quality: 100) {
            src
          }
        }
      }
    }
  }
`;
