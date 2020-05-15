import {
  FETCH_REPO,
  REPO_RESPONSE,
  RESET_REPO,
  FETCH_CONTENT,
  CONTENT_RESPONSE,
  CONTENT_ERROR,
  FETCH_TEST,
  TEST_ERROR,
  TEST_RESPONSE,
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
  dispatch({ type: FETCH_REPO, name: repo });
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

const processFileNameForDict = (file_name: string, repo: string) => {
  return file_name.slice(file_name.indexOf(repo) + 1 + repo.length);
};
export const postTestRepo = (repo: string) => (dispatch: any) => {
  dispatch({ type: FETCH_TEST });
  const { user, project } = splitRepoFromString(repo);
  axios
    .post(`/api/${user}/${project}/test`)
    .then((res) => {
      interface Files {
        [key: string]: Record<string, any>[];
      }
      interface FileResponse {
        file_name: string;
        coverage_blocks: any;
      }
      const { data } = res;
      const { files = [] } = data;
      const fileDict: Files = {};
      files.forEach((file: FileResponse) => {
        const { file_name = '', coverage_blocks = [] } = file;
        const name = processFileNameForDict(file_name, repo);
        fileDict[name] = coverage_blocks;
      });
      dispatch({
        type: TEST_RESPONSE,
        tests: fileDict,
      });
    })
    .catch((err) => {
      console.error(err);
      dispatch({ type: TEST_ERROR });
    });
};
