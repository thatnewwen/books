import createBrowserHistory from 'history/createBrowserHistory';
import _ from 'lodash';
import qs from 'qs';

const history = createBrowserHistory();

function getRoutePath() {
  return history.location.pathname;
}

function getRoutePathEnd() {
  const path = getRoutePath();
  const pathParts = _.split(path, '/');

  return _.last(pathParts);
}

function getRouteQueryParams(paramName) {
  const params = qs.parse(history.location.search, { ignoreQueryPrefix: true });
  return paramName ? params[paramName] : params;
}

function routeIncludes(subPath) {
  const path = getRoutePath();
  return _.includes(path, subPath);
}

export default history;

export {
  history,
  getRoutePath,
  getRoutePathEnd,
  getRouteQueryParams,
  routeIncludes,
};
