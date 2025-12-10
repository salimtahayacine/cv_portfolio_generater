import portfolioReducer, {
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
  addPortfolioItem,
  deletePortfolioItem,
} from '../portfolioSlice';
import { Portfolio, PortfolioItem } from '../../../types/portfolio.types';

describe('portfolioSlice', () => {
  const mockPortfolio: Portfolio = {
    id: '1',
    name: 'My Portfolio',
    items: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const mockItem: PortfolioItem = {
    id: 'item1',
    title: 'Project 1',
    description: 'A great project',
    link: 'https://example.com',
    tags: ['react', 'typescript'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  it('should handle initial state', () => {
    expect(portfolioReducer(undefined, { type: 'unknown' })).toEqual({
      portfolios: [],
      currentPortfolio: null,
    });
  });

  it('should handle createPortfolio', () => {
    const actual = portfolioReducer(undefined, createPortfolio(mockPortfolio));
    expect(actual.portfolios).toHaveLength(1);
    expect(actual.portfolios[0]).toEqual(mockPortfolio);
    expect(actual.currentPortfolio).toEqual(mockPortfolio);
  });

  it('should handle updatePortfolio', () => {
    const initialState = {
      portfolios: [mockPortfolio],
      currentPortfolio: mockPortfolio,
    };
    const updatedPortfolio = { ...mockPortfolio, name: 'Updated Portfolio' };
    const actual = portfolioReducer(initialState, updatePortfolio(updatedPortfolio));
    expect(actual.portfolios[0].name).toBe('Updated Portfolio');
    expect(actual.currentPortfolio?.name).toBe('Updated Portfolio');
  });

  it('should handle deletePortfolio', () => {
    const initialState = {
      portfolios: [mockPortfolio],
      currentPortfolio: mockPortfolio,
    };
    const actual = portfolioReducer(initialState, deletePortfolio(mockPortfolio.id));
    expect(actual.portfolios).toHaveLength(0);
    expect(actual.currentPortfolio).toBeNull();
  });

  it('should handle addPortfolioItem', () => {
    const initialState = {
      portfolios: [mockPortfolio],
      currentPortfolio: mockPortfolio,
    };
    const actual = portfolioReducer(initialState, addPortfolioItem(mockItem));
    expect(actual.currentPortfolio?.items).toHaveLength(1);
    expect(actual.currentPortfolio?.items[0]).toEqual(mockItem);
  });

  it('should handle deletePortfolioItem', () => {
    const portfolioWithItem = {
      ...mockPortfolio,
      items: [mockItem],
    };
    const initialState = {
      portfolios: [portfolioWithItem],
      currentPortfolio: portfolioWithItem,
    };
    const actual = portfolioReducer(initialState, deletePortfolioItem(mockItem.id));
    expect(actual.currentPortfolio?.items).toHaveLength(0);
  });
});
