import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import rootReducer from './reducers/';
import rootEpic from './epics/'; // eslint-disable-line import/no-named-as-default

export const history = createHistory();

export function configureStore(deps = {}) {
  const epicMiddleware = createEpicMiddleware(rootEpic, {
    dependencies: {
      ...deps,
    },
  });

  const routingMiddleware = routerMiddleware(history);

  // eslint-disable-next-line no-underscore-dangle
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(
    rootReducer,
    composeEnhancers(
      applyMiddleware(epicMiddleware),
      applyMiddleware(routingMiddleware),
    ),
  );
}

export default configureStore;
