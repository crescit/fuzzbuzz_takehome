import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../actions/git/constants';
import {
  TitleSpacer,
  Title,
  Pane,
  PositionedContent,
  GoChip,
  FileTitle,
} from './FilePane.styled';

const connector = connect(
  (state: RootState) => ({
    repo: state.repo,
  }),
  {}
);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & {
  children: any;
};

const FilePane = (props: Props) => {
  const { repo = { fileName: '' } } = props;

  return (
    <Pane id="pane">
      <TitleSpacer>
        <Title>Files</Title>
        <GoChip>GO</GoChip>
      </TitleSpacer>
      <FileTitle>{repo.fileName}</FileTitle>
      <PositionedContent>{props.children}</PositionedContent>
    </Pane>
  );
};

export default connector(FilePane);
