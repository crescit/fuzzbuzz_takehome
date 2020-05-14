import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { fetchContent } from '../../actions/git/actions';
import {
  StyledList,
  StyledListItem,
  FileLogo,
  OverflowDiv,
} from './FileList.styled';

const connector = connect(null, { fetchContent });
type PropsFromRedux = ConnectedProps<typeof connector>;

type File = {
  name: string;
  url: string;
  type: string;
};

type Props = PropsFromRedux & {
  files: File[];
  fileName: string;
};

const FileList = (props: Props) => (
  <OverflowDiv fileName={props.fileName}>
    <StyledList>
      {props.files.map((file: File) => (
        <StyledListItem
          key={file.name}
          onClick={() => props.fetchContent(file.url, file.name)}
        >
          {file.type === 'file' && <FileLogo />}
          {file.name}
        </StyledListItem>
      ))}
    </StyledList>
  </OverflowDiv>
);

export default connector(FileList);
