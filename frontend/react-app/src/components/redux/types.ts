// src/redux/dashboard/types.ts
export interface DashboardState {
    nifty50: number;
    sensex: number;
    totalReturns: number;
    currentValue: number;
    holdings: Stock[];
}

export interface Stock {
    symbol: string;
    shares: number;
    avgPrice: number;
    marketPrice: number;
    currentPrice: number;
}

export const UPDATE_INDEX_DATA = 'UPDATE_INDEX_DATA';
export const UPDATE_MINI_PORTFOLIO = 'UPDATE_MINI_PORTFOLIO';
export const ADD_HOLDING = 'ADD_HOLDING';
export const REMOVE_HOLDING = 'REMOVE_HOLDING';

interface UpdateIndexDataAction {
    type: typeof UPDATE_INDEX_DATA;
    payload: {
        nifty50: number;
        sensex: number;
    };
}

interface UpdateMiniPortfolioAction {
    type: typeof UPDATE_MINI_PORTFOLIO;
    payload: {
        totalReturns: number;
        currentValue: number;
    };
}

interface AddHoldingAction {
    type: typeof ADD_HOLDING;
    payload: Stock;
}

interface RemoveHoldingAction {
    type: typeof REMOVE_HOLDING;
    payload: string; // Symbol of the stock to be removed
}

export type DashboardActionTypes =
    | UpdateIndexDataAction
    | UpdateMiniPortfolioAction
    | AddHoldingAction
    | RemoveHoldingAction;
