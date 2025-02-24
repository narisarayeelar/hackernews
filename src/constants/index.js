import {sortBy} from 'lodash'

export const DEFAULT_QUERY = "redux";
export const DEFAULT_HPP = '10';
export const PATH_BASE = "https://hn.algolia.com/api/v1"; //'https://hn.mydomain.com/api/v1';//
export const PATH_SEARCH = "/search";
export const PARAM_SEARCH = "query=";
export const PARAM_PAGE = 'page=';
export const PARAM_HPP = 'hitsPerPage=';
export const SORTS = {
    NONE: list => list,
    TITLE: list => sortBy(list, 'title'),
    AUTHOR: list => sortBy(list, 'author'),
    COMMENTS: list => sortBy(list, 'num_comments').reverse(),
    POINTS: list => sortBy(list, 'points').reverse(),
  };