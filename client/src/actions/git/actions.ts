import {
  FETCH_REPO,
  REPO_RESPONSE,
  RESET_REPO,
  FETCH_CONTENT,
  CONTENT_RESPONSE,
  CONTENT_ERROR,
} from './constants';
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
  dispatch({ type: FETCH_REPO, payload: repo });
  const { user, project } = splitRepoFromString(repo);
  axios
    .get(`/api/${user}/${project}/info`)
    .then((res) => {
      const { data } = res;
      const { files = [], stars = 0 } = data;
      // console.log(data);
      dispatch({ type: REPO_RESPONSE, files: files, stars: stars });
    })
    .catch((err) => {
      // TODO: dispatch the error state and handle appropriately
      dispatch({ type: RESET_REPO });
      console.error('error encountered', err);
    });
};

export const fetchContent = (url: string, fileName: string) => (
  dispatch: any
) => {
  dispatch({ type: FETCH_CONTENT });
  axios
    .get(url)
    .then((res) => {
      const { data } = res;
      const { content = '' } = data;
      dispatch({
        type: CONTENT_RESPONSE,
        content: atob(content),
        filename: fileName,
      });
    })
    .catch((err) => {
      console.error(err);
      dispatch({ type: CONTENT_ERROR });
    });
};
