export const FETCH_REPO = 'SET_REPO';
export const RESET_REPO = 'RESET_REPO';
export const REPO_RESPONSE = 'REPO_RESPONSE';
export const FETCH_CONTENT = 'FETCH_CONTENT';
export const CONTENT_RESPONSE = 'CONTENT_RESPONSE';
export const CONTENT_ERROR = 'CONTENT_ERROR';
export const FETCH_TEST = 'FETCH_TEST';
export const TEST_RESPONSE = 'TEST_RESPONSE';
export const TEST_ERROR = 'TEST_ERROR';

// TODO: abstract this store state so it can be expanded elsewhere
export interface RootState {
  repo: any;
}
