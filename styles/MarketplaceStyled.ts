import styled from "styled-components";
import { SCREEN } from "../constants/screen";
import { TYPOGRAPHY } from "../constants/typography";
import ThemeType from "../types/themeType";

export const Main = styled.main`
  padding: 70px 0 50px 0;
  display: flex;
  justify-content: center;
  min-height: calc(100vh - 72px);

  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    min-height: calc(100vh - 110px);
  }
`;

export const Container = styled.div`
  max-width: ${SCREEN.DESKTOP};
`;

export const TabRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 24px 24px 0 24px;

  @media only screen and (max-width: ${SCREEN.MOBILE}) {
    flex-direction: column;
  }
`;

export const Tab = styled.a`
  color: ${({ theme, isActive }: { theme: ThemeType; isActive: boolean }) => (isActive ? theme.PRIMARY : theme.TITLE)};
  cursor: pointer;
  font-size: ${TYPOGRAPHY.SIZE.SUBTITLE_2};
  font-weight: ${({ isActive }: { isActive: boolean }) => (isActive ? 600 : 400)};
  margin-right: 10px;

  @media only screen and (max-width: ${SCREEN.MOBILE}) {
    margin: 0 0 10px 0;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  font-size: ${TYPOGRAPHY.SIZE.HEADLINE_1};
  font-weight: ${TYPOGRAPHY.WEIGHT.HEADLINE_1};
  padding: 0 24px;
  align-self: center;
  color: ${({ theme }: { theme: ThemeType }) => theme.TITLE};
`;

export const GridSection = styled.section`
  padding: 0 20px;
`;
