import React from 'react';
import { SpacedChildren, StyledPaper, Title } from './EnhancedPaper.styled';

type Props = {
  children: any;
  title: string;
};

const EnhancedPaper = (props: Props) => (
  <StyledPaper elevation={3}>
    <Title>{props.title}</Title>
    <SpacedChildren>{props.children}</SpacedChildren>
  </StyledPaper>
);

export default EnhancedPaper;
