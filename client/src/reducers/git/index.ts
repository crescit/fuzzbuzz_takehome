import {
  FETCH_REPO,
  RESET_REPO,
  REPO_RESPONSE,
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
        name: action.payload,
      };
    case REPO_RESPONSE:
      return {
        ...state,
        files: action.payload,
      };
    case RESET_REPO:
      return {
        ...state,
        name: undefined,
      };
    default:
      return state;
  }
};

export default repository;
