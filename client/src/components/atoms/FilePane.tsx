import React from 'react';
import {
  TitleSpacer,
  Title,
  Pane,
  PositionedContent,
  GoChip,
} from './FilePane.styled';

type Props = {
  children: any;
};

const FilePane = (props: Props) => (
  <Pane id="pane">
    <TitleSpacer>
      <Title>Files</Title>
      <GoChip>GO</GoChip>
    </TitleSpacer>
    <PositionedContent>{props.children}</PositionedContent>
  </Pane>
);

export default FilePane;
