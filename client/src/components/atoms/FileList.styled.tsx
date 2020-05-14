import styled from 'styled-components';
import { ReactComponent as File } from '../../assets/file.svg';
import { ReactComponent as Folder } from '../../assets/folder.svg';

export const StyledList = styled.ul`
  margin-block-start: 0px;
  margin-block-end: 0px;
  padding-inline-start: 0px;
  background-color: #fafbfd !important;
`;

export const StyledListItem = styled.li`
  font-size: 0.625rem;
  padding: 7px 10px 7px 5px;
  background-color: #fafbfd;
  :hover {
    background-color: #eef6f9;
  }
`;

export const FileLogo = styled(File)`
  height: 10px;
  width: 10px;
  margin-right: 5px;
  margin-left: 10px;
`;

export const FolderLogo = styled(Folder)`
  height: 10px;
  width: 10px;
  margin-right: 5px;
  margin-left: 10px;
`;

interface DivProps {
  fileName: string;
}

export const OverflowDiv = styled.div<{ fileName: string }>`
  overflow-y: scroll;
  height: 569px;
  display: block;
  background-color: white;
  margin-top: ${({ fileName }) => {
    return fileName ? '-15px' : '0px';
  }};
`;
