import styled from 'styled-components';

export const Pane = styled.div`
  border-top: 1px solid #dcdcdc;
  border-right: 1px solid #dcdcdc;
  height: 580px;
  width: 200px;
  display: block;
  background-color: white;
`;

export const FileTitle = styled.div`
  position: relative;
  bottom: 68px;
  left: 210px;
  background-color: white;
`;

export const PositionedContent = styled.div`
  position: relative;
  bottom: 38px;
`;

export const Title = styled.p`
  margin-left: 10px;
  font-size: 1.125rem;
  font-weight: bold;
  display: inline;
  position: relative;
  top: -10px;
  background-color: white;
  font-weight: normal;
`;

export const TitleSpacer = styled.div`
  border-right: 1px solid #dcdcdc;
  width: 200px;
  position: relative;
  bottom: 40px;
  text-align: center;
  height: 38px;
  background-color: white;
  display: grid;
  grid-template-columns: 1fr 90fr;
`;

export const GoChip = styled.div`
  display: grid;
  height: 12px;
  width: 20px;
  font-size: 0.4rem;
  color: white;
  border-radius: 8px;
  background-color: #92cbb6;
  margin-top: 14px;
  margin-left: 10px;
`;
