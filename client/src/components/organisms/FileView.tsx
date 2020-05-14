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

const FileView = (props: Props) => {
  const { repo = { content: '' } } = props;
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
              {tokens.map((line, i) => (
                <Line key={i} {...getLineProps({ line, key: i })}>
                  <LineNo>{i + 1}</LineNo>
                  <LineContent>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token, key })} />
                    ))}
                  </LineContent>
                </Line>
              ))}
            </Pre>
          )}
        </Highlight>
      )}
    </View>
  );
};

export default connector(FileView);
