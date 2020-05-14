import styled from 'styled-components';
import { Paper } from '@material-ui/core';
import { ReactComponent as Star } from '../../assets/star.svg';
import Button from '@material-ui/core/Button';

export const SpacedChildren = styled.div`
  background-color: white;
  text-align: left;
  ul,
  li {
    background-color: white;
    list-style-type: none;
  }
  border-radius: 8px;
`;

export const StyledPaper = styled(Paper)`
  border-radius: 8px;
`;

export const Title = styled.p`
  font-size: 1.125rem;
  font-weight: bold;
  position: relative;
  bottom: 30px;
  text-align: initial;
  margin-left: 5px;
`;

export const StarLogo = styled(Star)`
  margin-top: 7px;
  height: 10px;
  width: 10px;
  margin-right: 5px;
  margin-left: 10px;
`;

export const StarSpan = styled.span`
  margin-top: 6px;
  margin-left: -2px;
  color: grey;
  font-size: 0.625rem;
  flex: 1;
`;

export const FlexDiv = styled.div`
  display: flex;
`;

export const TestButton = styled(Button)`
  * {
    background-color: #6ca9bc;
  }
`;

export const TestText = styled.p`
  font-size: 0.625rem;
  font-weight: bold;
  color: white;
  z-index: 2;
  margin-block-start: 0px;
  margin-block-end: 0px;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
`;
