import React from 'react';
import {
  SpacedChildren,
  StyledPaper,
  Title,
  StarLogo,
  StarSpan,
  FlexDiv,
  TestButton,
  TestText,
} from './EnhancedPaper.styled';

type Props = {
  children: any;
  title: string;
  stars: number;
};

const EnhancedPaper = (props: Props) => (
  <StyledPaper elevation={3}>
    <Title>
      <FlexDiv>
        {props.title}
        <StarLogo />
        <StarSpan>{props.stars}</StarSpan>
        <TestButton variant="contained" size="small">
          <TestText>Run Tests</TestText>
        </TestButton>
      </FlexDiv>
    </Title>
    <SpacedChildren>{props.children}</SpacedChildren>
  </StyledPaper>
);

export default EnhancedPaper;
