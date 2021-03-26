import {pathToRegexp} from 'path-to-regexp';

export const reLogin = pathToRegexp("/login/");
export const reQuestionList = pathToRegexp("/questions");
export const reQuestionDetail = pathToRegexp(("/questions/:id"));
