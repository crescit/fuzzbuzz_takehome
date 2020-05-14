import React from 'react';

import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../actions/git/constants';
import { SpacedContent } from './FileBrowser.styled';
import EnhancedPaper from '../atoms/EnhancedPaper';
import FileList from '../atoms/FileList';
import FilePane from '../atoms/FilePane';
import FileView from './FileView';

const connector = connect(
  (state: RootState) => ({
    repo: state.repo,
  }),
  {}
);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & {};

const FileBrowser = (props: Props) => {
  const { repo = { name: '', files: [], fileName: '' } } = props;
  return (
    <SpacedContent>
      <EnhancedPaper title={repo.name}>
        {/*todo find a better way to manage the panels that is more responsive */}
        <div
          style={{
            maxHeight: '580px',
          }}
        >
          <FilePane>
            <FileList files={repo.files} fileName={repo.fileName} />
          </FilePane>
          <FileView />
        </div>
      </EnhancedPaper>
    </SpacedContent>
  );
};

export default connector(FileBrowser);
