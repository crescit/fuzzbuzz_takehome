export const FETCH_REPO = 'SET_REPO';
export const RESET_REPO = 'RESET_REPO';
export const REPO_RESPONSE = 'REPO_RESPONSE';
export const FETCH_CONTENT = 'FETCH_CONTENT';
export const CONTENT_RESPONSE = 'CONTENT_RESPONSE';
export const CONTENT_ERROR = 'CONTENT_ERROR';

// TODO: abstract this store state so it can be expanded elsewhere
export interface RootState {
  repo: any;
}
