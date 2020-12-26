import * as React from "react";
import { Helmet } from "react-helmet";
import { Link as RouterLink } from "gatsby";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import {
  AiFillInstagram,
  AiFillBehanceSquare,
  AiFillFacebook,
} from "react-icons/ai";
import { OverlayProvider } from "@react-aria/overlays";
import "modern-normalize/modern-normalize.css";
import { theme } from "../theme";
import { Container } from "./Container";
import { Link } from "./Link";

const GlobalStyle = createGlobalStyle`
body {
  font-family: 'Hind Siliguri', sans-serif;
  font-size: 1rem;
  line-height: 1.4;
  color: ${(props) => props.theme.colors.text.main};
}
`;

interface LayoutProps {
  siteMetadata: {
    title: string;
  };
  children: React.ReactNode;
}

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;
`;
const HeaderLogo = styled.img`
  border-radius: 50%;
`;
const HeaderSiteName = styled.h1`
  font-size: 1.2rem;
  margin: 0;
`;

const Nav = styled.nav`
  margin-bottom: 2rem;
`;
const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
`;
const NavListItem = styled.li`
  &:not(:last-child) {
    padding-right: 1rem;

    &::after {
      content: "•";
      margin-left: 1rem;
      color: ${(props) => props.theme.colors.text.light};
    }
  }
`;
const SocialList = styled.ul`
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
  font-size: 1.6rem;
`;
const SocialListItem = styled.li`
  &:not(:last-child) {
    margin-right: 1rem;
  }
`;
const Footer = styled.footer`
  padding: 2rem 0;
`;

export function Layout({ siteMetadata, children }: LayoutProps) {
  return (
    <ThemeProvider theme={theme}>
      <Helmet>
        <title>{siteMetadata.title}</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;700&display=swap"
        />
      </Helmet>
      <GlobalStyle />
      <OverlayProvider>
        <Container>
          <Header>
            <Link as={RouterLink} to="/">
              <HeaderLogo
                src="https://placehold.it/200x200"
                alt="Photo de Laëtitia Corré"
              />
            </Link>
            <HeaderSiteName>
              <Link as={RouterLink} to="/">
                Laëtitia Corré
              </Link>
            </HeaderSiteName>
          </Header>
          <Nav>
            <NavList>
              <NavListItem>
                <Link as={RouterLink} to="/">
                  Portfolio
                </Link>
              </NavListItem>
              <NavListItem>
                <Link as={RouterLink} to="/about">
                  À propos
                </Link>
              </NavListItem>
              <NavListItem>
                <Link href="mailto:laetitia.corre6@gmail.com">Contact</Link>
              </NavListItem>
            </NavList>
          </Nav>
          <SocialList>
            <SocialListItem>
              <Link href="https://google.com">
                <AiFillInstagram />
              </Link>
            </SocialListItem>
            <SocialListItem>
              <Link href="https://google.com">
                <AiFillBehanceSquare />
              </Link>
            </SocialListItem>
            <SocialListItem>
              <Link href="https://google.com">
                <AiFillFacebook />
              </Link>
            </SocialListItem>
          </SocialList>
        </Container>
        {children}
        <Footer>
          <Container />
        </Footer>
      </OverlayProvider>
    </ThemeProvider>
  );
}
