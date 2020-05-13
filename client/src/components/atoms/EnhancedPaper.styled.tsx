import styled from 'styled-components';
import { Paper } from '@material-ui/core';

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
