import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import './App.css';
import RepoInput from './components/molecules/RepoInput';
import FileBrowser from './components/organisms/FileBrowser';
import { RootState } from './actions/git/constants';

const connector = connect(
  (state: RootState) => ({
    repo: state.repo,
  }),
  {}
);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & {};

function App(props: Props) {
  const { repo = { name: undefined, error: false } } = props;
  return (
    <div className="App">
      {/** If there is not a named repo in the store (i.e. nothing has been searched for) display the Github Input Form else display the repository */}
      {!repo.name || repo.error ? <RepoInput /> : <FileBrowser />}
    </div>
  );
}

export default connector(App);
