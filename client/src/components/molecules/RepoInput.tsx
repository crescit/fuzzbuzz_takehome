import React, { useState } from 'react';
import {
  SendButton,
  CenteredDiv,
  ContainerDiv,
  PromptText,
  InputText,
  Input,
  FlexSpacer,
  ErrorText,
} from './RepoInput.styled';

const RepoInput = () => {
  const [repo, setValue] = useState('');
  const [error, setError] = useState(false);
  function handleSubmission(e: any) {
    // if the input length is empty or does not have a slash in it
    if (repo.length === 0 || !/\/.*/.test(repo)) {
      setError(true);
    }
  }
  function keyPressed(e: any) {
    // clear an error if there is one already present
    if (error) {
      setError(false);
    }
    if (e.key === 'Enter') {
      handleSubmission(e);
    } else {
      if (e.currentTarget.value) {
        setValue(e.currentTarget.value);
      }
    }
  }
  return (
    <CenteredDiv>
      <ContainerDiv>
        <PromptText>Enter a Go repo to test:</PromptText>
        <FlexSpacer>
          <InputText>github.com/ </InputText>
          <Input onKeyUp={(e) => keyPressed(e)} />
        </FlexSpacer>
        {error && (
          <ErrorText>
            There was an error with your input. Please Try Again.
          </ErrorText>
        )}
      </ContainerDiv>
      <SendButton onClick={(e) => handleSubmission(e)}>SEND</SendButton>
    </CenteredDiv>
  );
};

export default RepoInput;
