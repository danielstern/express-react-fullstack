import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import {createLogger} from 'redux-logger'

import { reducer } from './reducer'
import { taskCreationSaga } from './sagas.mock'
import { userAuthenticationSaga } from './sagas'

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
    reducer,
    applyMiddleware(createLogger(), sagaMiddleware)
);

sagaMiddleware.run(taskCreationSaga);
sagaMiddleware.run(userAuthenticationSaga);
