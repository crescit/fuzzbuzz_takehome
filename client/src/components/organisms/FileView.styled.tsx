import styled from 'styled-components';

export const Pre = styled.pre`
  text-align: left;
  margin: 1em 0;
  overflow: scroll;
  padding: 0 !important;
`;

interface LineProps {
  hasTest: boolean;
  inRange: boolean;
}

export const Line = styled.div<LineProps>`
  background-color: ${({ inRange, hasTest }) => {
    if (hasTest) {
      return inRange ? '#f0fee7' : '#f7e7e8';
    } else {
      return 'white !important';
    }
  }};
  span {
    text-shadow: none;
    background-color: ${({ inRange, hasTest }) => {
      if (hasTest) {
        return inRange ? '#f0fee7' : '#f7e7e8';
      } else {
        return 'white !important';
      }
    }};
  }
`;

export const LineNo = styled.span`
  display: table-cell;
  text-align: right;
  padding-right: 1em;
  user-select: none;
  opacity: 0.5;
`;

export const LineContent = styled.span`
  display: table-cell;
`;

export const View = styled.div`
  font-size: 12px;
  border-top: 1px solid #dcdcdc;
  height: 580px;
  width: calc(100% - 204px);
  background-color: white;
  position: relative;
  left: 202px;
  display: inline-block;
  /*offset the cost of the height of the pane because it is display block */
  top: -581px;
  overflow: hidden;
  overflow-y: scroll;
`;
