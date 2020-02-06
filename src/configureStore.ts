import { applyMiddleware, createStore } from "redux";
import createRootReducer from "./store/combineReducers";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import thunk from "redux-thunk";

export default function configureStore(preloadedState?: any) {
  const store = createStore(
    createRootReducer(),
    preloadedState,
    composeWithDevTools(applyMiddleware(thunk))
  );

  return store;
}
