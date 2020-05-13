export const FETCH_REPO = 'SET_REPO';
export const RESET_REPO = 'RESET_REPO';
export const REPO_RESPONSE = 'REPO_RESPONSE';

// TODO: abstract this store state so it can be expanded elsewhere
export interface RootState {
  repo: any;
}
