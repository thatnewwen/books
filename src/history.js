import createBrowserHistory from 'history/createBrowserHistory';
import _ from 'lodash';

const history = createBrowserHistory();

function getRoutePath() {
  return history.location.pathname;
}

function getRoutePathEnd() {
  const path = getRoutePath();
  const pathParts = _.split(path, '/');

  return _.last(pathParts);
}

export default history;

export { history, getRoutePath, getRoutePathEnd };
