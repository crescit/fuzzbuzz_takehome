import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Highlight, { defaultProps } from 'prism-react-renderer';
import { View, Pre, Line, LineNo, LineContent } from './FileView.styled';
import { RootState } from '../../actions/git/constants';
import theme from 'prism-react-renderer/themes/nightOwl';

const connector = connect(
  (state: RootState) => ({
    repo: state.repo,
  }),
  {}
);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & {};

// function that tests that if the given line number is in the range of the file
const testLineRange = (lineNum: number, repo: any, fileName: string) => {
  if (repo && repo[fileName]) {
    const slice = repo[fileName];
    interface RangeType {
      start_line: number;
      end_line: number;
    }
    let inRange = false;
    slice.forEach((range: RangeType) => {
      const { start_line, end_line } = range;
      if (lineNum >= start_line && lineNum <= end_line) {
        inRange = true;
      }
    });
    return inRange;
  }
  return false;
};

const FileView = (props: Props) => {
  const { repo = { content: '', tests: {}, fileName: '' } } = props;
  return (
    <View>
      {repo.content && (
        <Highlight
          {...defaultProps}
          theme={theme}
          code={repo.content}
          language="go"
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <Pre className={className} style={style}>
              {tokens.map((line, i) => {
                return (
                  <Line
                    key={i}
                    {...getLineProps({ line, key: i })}
                    inRange={testLineRange(i, repo.tests, repo.fileName)}
                    hasTest={repo.tests && repo.tests[repo.fileName]}
                  >
                    <LineNo>{i + 1}</LineNo>
                    <LineContent>
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token, key })} />
                      ))}
                    </LineContent>
                  </Line>
                );
              })}
            </Pre>
          )}
        </Highlight>
      )}
    </View>
  );
};

export default connector(FileView);
