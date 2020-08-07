import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk"
import loginReducer from "./login/reducer.js";
import registerReducer from "./register/reducer.js"
import commonReducer from "./common/reducer.js"
import bookingReducer from "./booking/reducer.js"
import filterReducer from "./filter/reducer.js"
import paymentReducer from "./payment/reducer.js"
import recommendReducer from "./recommend/reducer.js"

let reducers = combineReducers({ login: loginReducer, register: registerReducer, common: commonReducer, booking: bookingReducer, filter: filterReducer, payment: paymentReducer, recommend: recommendReducer })

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))

export { store }