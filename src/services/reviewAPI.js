// I don't think this file is being used???

import { get, post } from './request';
import { config } from './firebase';

const URL = `https://${config.projectId}.firebaseio.com`;
const REVIEW_URL = `${URL}/review.json`;

export const getAll = () => get(REVIEW_URL);

export const save = game => post(REVIEW_URL, game);