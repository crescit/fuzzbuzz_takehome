import { SET_REPO, RESET_REPO } from '../../actions/git/constants';

const initialState = {
  name: undefined,
};

const repository = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_REPO:
      return {
        ...state,
        name: action.payload,
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
