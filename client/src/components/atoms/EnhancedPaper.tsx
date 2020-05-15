import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
  SpacedChildren,
  StyledPaper,
  Title,
  StarLogo,
  StarSpan,
  FlexDiv,
  TestButton,
  TestText,
  StatusMessage,
} from './EnhancedPaper.styled';
import { postTestRepo } from '../../actions/git/actions';
import { RootState } from '../../actions/git/constants';

const connector = connect(
  (state: RootState) => ({
    repo: state.repo,
  }),
  { postTestRepo }
);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  children: any;
  title: string;
  stars: number;
};

// function "borrowed" from stack overflow that formats the numbers of stars into an appropriate manner
const nFormatter = (num: number, digits: number) => {
  var si = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ];
  var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol;
};

const EnhancedPaper = (props: Props) => {
  const { repo = { name: '', tests: null } } = props;
  return (
    <StyledPaper elevation={3}>
      <Title>
        <FlexDiv>
          {props.title}
          <StarLogo />
          <StarSpan>{nFormatter(props.stars, 1)}</StarSpan>
          {!repo.tests ? (
            <TestButton
              variant="contained"
              size="small"
              onClick={() => props.postTestRepo(repo.name)}
            >
              {' '}
              <TestText>Run Tests</TestText>
            </TestButton>
          ) : (
            <StatusMessage>Tests Ran Successfully</StatusMessage>
          )}
        </FlexDiv>
      </Title>
      <SpacedChildren>{props.children}</SpacedChildren>
    </StyledPaper>
  );
};

export default connector(EnhancedPaper);
