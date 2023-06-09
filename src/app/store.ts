import { createStore, applyMiddleware, AnyAction } from "redux";
import { useDispatch as standartUseDispatch } from "react-redux";
import thunk, { ThunkDispatch } from 'redux-thunk'
import reducer from "./reducers/reducer";

const store = createStore(reducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction> & typeof store.dispatch;

export const useDispatch = standartUseDispatch<AppDispatch>;

export default store