import * as React from "react";
import { graphql } from "gatsby";
import styled from "styled-components";
import { Layout, Container } from "../components";

interface PageAboutProps {
  data: {
    site: {
      siteMetadata: {
        title: string;
      };
    };
  };
}

const BioContainer = styled.div`
  display: grid;
  grid-template-columns: 300px auto;
  grid-gap: 1rem;
`;
const BioContent = styled.div`
  padding-top: 1rem;
`;
const Paragraph = styled.p`
  margin: 0 0 1rem 0;
`;

export default function PageAbout({ data }: PageAboutProps) {
  return (
    <Layout siteMetadata={data.site.siteMetadata}>
      <Container as="main">
        <BioContainer>
          <img src="https://placehold.it/300x400" alt="" />
          <BioContent>
            <Paragraph>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni
              dolorum velit quo sapiente repellendus, illum vero non. Inventore,
              culpa! Nostrum quod eaque, odio consequuntur maxime quae
              aspernatur quia qui? Culpa.
            </Paragraph>
            <Paragraph>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi,
              iure ab dolorum soluta, aspernatur a laborum, eius quia tempore
              minus eveniet delectus id in sit inventore veritatis cumque quae
              veniam!
            </Paragraph>
          </BioContent>
        </BioContainer>
      </Container>
    </Layout>
  );
}

export const query = graphql`
  query GetPageAboutData {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
