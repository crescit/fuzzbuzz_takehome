import styled from 'styled-components';

export const CenteredDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 465px;
  text-align: center;
  border-radius: 8px;
  border: 1px solid #dcdcdc;
`;

export const SendButton = styled.button`
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  background-color: #6ca9bc;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 0.75rem;
  font-weight: bold;
  color: white;
  width: 468px;
  margin-left: -2px;
  &:focus {
    outline: none;
  }
`;

export const ContainerDiv = styled.div`
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  width: inherit;
  background-color: white;
  display: inline-block;
`;

export const PromptText = styled.p`
  background-color: white;
  margin-top: 30px;
`;

export const InputText = styled(PromptText)`
  display: flex;
  padding-top: 5px;
  margin-block-start: 0;
  font-size: 0.75rem;
`;

export const Input = styled.input`
  display: flex;
  height: 1.5rem;
  border-radius: 4px;
  background-color: #eef6f9;
  border: 0px;
  margin-left: 5px;
  font-size: 1rem;
  width: 240px;
  &:focus {
    outline: none;
  }
`;

export const FlexSpacer = styled.div`
  display: flex;
  background: white;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 25px;
`;

export const ErrorText = styled.span`
  color: red;
  position: relative;
  font-size: 12px;
  background-color: white;
  bottom: 30px;
  right: 10px;
`;
