import { createStore, applyMiddleware, AnyAction } from "redux";
import { useDispatch as standartUseDispatch } from "react-redux";
import thunk, { ThunkDispatch } from 'redux-thunk'
import reducer from "./reducers/reducer";

const store = createStore(reducer, applyMiddleware(thunk));

//store.subscribe(() => { console.log(store.getState()) })

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction> & typeof store.dispatch;

export const objectKeys = <Obj>(obj: object): (keyof Obj)[] => {
	return Object.keys(obj) as (keyof Obj)[]
}

export const useDispatch = standartUseDispatch<AppDispatch>;

export default store