import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import mainReducer from "../store/reducers/reducer";

const rootReducer = combineReducers({
        mainReducer:mainReducer
});

const actionHandler = (store) => (next) => (action) => {
  if (!action.hasOwnProperty("meta")) {
    return next(action);
  }
  if (action.meta.type === "API") {
    fetch(action.meta.url, { ...action.meta.options })
      .then((resp) => {
        if (resp.ok) {
          resp
            .json()
            .then((data) => {
              store.dispatch(action.meta.successAction(data, action.meta.extraParams));
            })
            .catch((error) => {
              throw error;
            });
        } else {
          resp
            .json()
            .then((data) => {
              store.dispatch(action.meta.failureAction(data, action.meta.extraParams));
            })
            .catch((error) => {
              throw error;
            });
        }
       
      })
      .catch((error) => {
        
        throw error;
      });
  }
};

let middlewares = [thunk, actionHandler];
let composeEnhancers = compose;

if (process.env.NODE_ENV === `development`) {
  composeEnhancers = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 50 })) || compose;
}

const Store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));

export default Store;
