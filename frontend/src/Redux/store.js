import reducer from './reducer';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

export const store = new createStore(reducer, applyMiddleware(thunk));
