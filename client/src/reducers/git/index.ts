import {
  FETCH_REPO,
  RESET_REPO,
  REPO_RESPONSE,
  CONTENT_RESPONSE,
  FETCH_TEST,
  TEST_RESPONSE,
} from '../../actions/git/constants';

const initialState = {
  name: undefined,
};

const repository = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_REPO:
      return {
        ...state,
        files: [],
        name: action.name,
      };
    case REPO_RESPONSE:
      return {
        ...state,
        files: action.files,
        stars: action.stars,
      };
    case RESET_REPO:
      return {
        ...state,
        name: undefined,
      };
    case CONTENT_RESPONSE:
      return {
        ...state,
        content: action.content,
        fileName: action.filename,
      };
    case FETCH_TEST:
      return {
        ...state,
        tests: [],
      };
    case TEST_RESPONSE:
      return {
        ...state,
        tests: action.tests,
      };
    default:
      return state;
  }
};

export default repository;
