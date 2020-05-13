import React from 'react';

import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../actions/git/constants';
import { SpacedContent } from './FileBrowser.styled';
import EnhancedPaper from '../atoms/EnhancedPaper';
import FileList from '../atoms/FileList';
import FilePane from '../atoms/FilePane';

const connector = connect(
  (state: RootState) => ({
    repo: state.repo,
  }),
  {}
);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & {};

const FileBrowser = (props: Props) => {
  const { repo = { name: '', files: [] } } = props;
  console.log(repo.files);
  return (
    <SpacedContent>
      <EnhancedPaper title={repo.name}>
        <FilePane>
          <FileList files={repo.files} />
        </FilePane>
      </EnhancedPaper>
    </SpacedContent>
  );
};

export default connector(FileBrowser);
