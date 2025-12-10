import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Portfolio, PortfolioItem } from '../../types/portfolio.types';

interface PortfolioState {
  portfolios: Portfolio[];
  currentPortfolio: Portfolio | null;
}

const initialState: PortfolioState = {
  portfolios: [],
  currentPortfolio: null,
};

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    createPortfolio: (state, action: PayloadAction<Portfolio>) => {
      state.portfolios.push(action.payload);
      state.currentPortfolio = action.payload;
    },
    updatePortfolio: (state, action: PayloadAction<Portfolio>) => {
      const index = state.portfolios.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.portfolios[index] = action.payload;
        if (state.currentPortfolio?.id === action.payload.id) {
          state.currentPortfolio = action.payload;
        }
      }
    },
    deletePortfolio: (state, action: PayloadAction<string>) => {
      state.portfolios = state.portfolios.filter(p => p.id !== action.payload);
      if (state.currentPortfolio?.id === action.payload) {
        state.currentPortfolio = null;
      }
    },
    setCurrentPortfolio: (state, action: PayloadAction<string>) => {
      const portfolio = state.portfolios.find(p => p.id === action.payload);
      state.currentPortfolio = portfolio || null;
    },
    addPortfolioItem: (state, action: PayloadAction<PortfolioItem>) => {
      if (state.currentPortfolio) {
        state.currentPortfolio.items.push(action.payload);
        state.currentPortfolio.updatedAt = new Date().toISOString();
        const index = state.portfolios.findIndex(p => p.id === state.currentPortfolio!.id);
        if (index !== -1) {
          state.portfolios[index] = state.currentPortfolio;
        }
      }
    },
    updatePortfolioItem: (state, action: PayloadAction<PortfolioItem>) => {
      if (state.currentPortfolio) {
        const index = state.currentPortfolio.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.currentPortfolio.items[index] = action.payload;
          state.currentPortfolio.updatedAt = new Date().toISOString();
          const portfolioIndex = state.portfolios.findIndex(p => p.id === state.currentPortfolio!.id);
          if (portfolioIndex !== -1) {
            state.portfolios[portfolioIndex] = state.currentPortfolio;
          }
        }
      }
    },
    deletePortfolioItem: (state, action: PayloadAction<string>) => {
      if (state.currentPortfolio) {
        state.currentPortfolio.items = state.currentPortfolio.items.filter(
          item => item.id !== action.payload
        );
        state.currentPortfolio.updatedAt = new Date().toISOString();
        const index = state.portfolios.findIndex(p => p.id === state.currentPortfolio!.id);
        if (index !== -1) {
          state.portfolios[index] = state.currentPortfolio;
        }
      }
    },
    loadPortfolios: (state, action: PayloadAction<Portfolio[]>) => {
      state.portfolios = action.payload;
    },
  },
});

export const {
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
  setCurrentPortfolio,
  addPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem,
  loadPortfolios,
} = portfolioSlice.actions;

export default portfolioSlice.reducer;
