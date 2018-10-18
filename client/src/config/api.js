import CONFIG from './config';

const { SERVER_URL } = CONFIG;

const MATCH = `${SERVER_URL}/match`;
export const FETCH_MATCH_HISTORY = ACCOUNT_NAME => `${MATCH}/history/${ACCOUNT_NAME}`;