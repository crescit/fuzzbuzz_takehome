import { SET_REPO, RESET_REPO } from './constants';
import axios from 'axios';

// helper function to parse the input of the repo from the user into something more readable
const splitRepoFromString = (repo: string) => {
  if (repo.indexOf('/')) {
    const split = repo.split('/').slice(0, 2);
    return {
      user: split[0],
      project: split[1],
    };
  }
  return { user: null, project: null };
};

// action that takes a repo name, and fetches the information on the repository from the backend
export const fetchRepo = (repo: string) => (dispatch: any) => {
  dispatch({ type: SET_REPO, payload: repo });
  const { user, project } = splitRepoFromString(repo);
  axios
    .get(`/api/${user}/${project}/info`)
    .then((res) => {
      // TODO: dispatch the rest of the data
      console.log('response successful', res);
    })
    .catch((err) => {
      // TODO: dispatch the error state and handle appropriately
      console.error('error encountered', err);
    });
  setTimeout(() => dispatch({ type: RESET_REPO }), 2000);
};
