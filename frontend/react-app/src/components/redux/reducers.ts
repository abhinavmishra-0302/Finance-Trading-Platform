// src/redux/dashboard/reducers.ts
import { DashboardState, DashboardActionTypes, UPDATE_INDEX_DATA, UPDATE_MINI_PORTFOLIO, ADD_HOLDING, REMOVE_HOLDING } from './types';

const initialState: DashboardState = {
    nifty50: 0,
    sensex: 0,
    totalReturns: 0,
    currentValue: 0,
    holdings: [],
};

const dashboardReducer = (state = initialState, action: DashboardActionTypes): DashboardState => {
    switch (action.type) {
        case UPDATE_INDEX_DATA:
            return {
                ...state,
                nifty50: action.payload.nifty50,
                sensex: action.payload.sensex,
            };
        case UPDATE_MINI_PORTFOLIO:
            return {
                ...state,
                totalReturns: action.payload.totalReturns,
                currentValue: action.payload.currentValue,
            };
        case ADD_HOLDING:
            return {
                ...state,
                holdings: [...state.holdings, action.payload],
            };
        case REMOVE_HOLDING:
            return {
                ...state,
                holdings: state.holdings.filter(holding => holding.symbol !== action.payload),
            };
        default:
            return state;
    }
};

export default dashboardReducer;
