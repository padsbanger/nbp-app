import { applyMiddleware, createStore } from "redux";
import reducer from "./store/combineReducers";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import thunk from "redux-thunk";

export default function configureStore(preloadedState?: any) {
  const store = createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(thunk))
  );

  return store;
}
