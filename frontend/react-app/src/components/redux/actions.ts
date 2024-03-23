// src/redux/dashboard/actions.ts
import { DashboardActionTypes, UPDATE_INDEX_DATA, UPDATE_MINI_PORTFOLIO, ADD_HOLDING, REMOVE_HOLDING, Stock } from './types';

export const updateIndexData = (nifty50: number, sensex: number): DashboardActionTypes => ({
    type: UPDATE_INDEX_DATA,
    payload: { nifty50, sensex },
});

export const updateMiniPortfolio = (totalReturns: number, currentValue: number): DashboardActionTypes => ({
    type: UPDATE_MINI_PORTFOLIO,
    payload: { totalReturns, currentValue },
});

export const addHolding = (holding: Stock): DashboardActionTypes => ({
    type: ADD_HOLDING,
    payload: holding,
});

export const removeHolding = (symbol: string): DashboardActionTypes => ({
    type: REMOVE_HOLDING,
    payload: symbol,
});
