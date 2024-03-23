// src/redux/rootReducer.ts
import { combineReducers } from 'redux';
import dashboardReducer from './reducers';

const rootReducer = combineReducers({
    dashboard: dashboardReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
