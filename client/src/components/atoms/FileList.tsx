import React from 'react';
import {
  StyledList,
  StyledListItem,
  FileLogo,
  OverflowDiv,
} from './FileList.styled';

type File = {
  name: string;
  content: string;
  type: string;
};

type Props = {
  files: File[];
};

const FileList = (props: Props) => (
  <OverflowDiv>
    <StyledList>
      {props.files.map((file: File) => (
        <StyledListItem key={file.name}>
          {file.type === 'file' && <FileLogo />}
          {file.name}
        </StyledListItem>
      ))}
    </StyledList>
  </OverflowDiv>
);

export default FileList;
