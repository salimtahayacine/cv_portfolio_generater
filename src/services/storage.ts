import AsyncStorage from '@react-native-async-storage/async-storage';
import { CV } from '../types/cv.types';
import { Portfolio } from '../types/portfolio.types';

const CV_STORAGE_KEY = '@cv_portfolio_generator:cvs';
const PORTFOLIO_STORAGE_KEY = '@cv_portfolio_generator:portfolios';

export const storageService = {
  // CV operations
  async saveCVs(cvs: CV[]): Promise<void> {
    try {
      await AsyncStorage.setItem(CV_STORAGE_KEY, JSON.stringify(cvs));
    } catch (error) {
      console.error('Error saving CVs:', error);
      throw error;
    }
  },

  async loadCVs(): Promise<CV[]> {
    try {
      const data = await AsyncStorage.getItem(CV_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading CVs:', error);
      return [];
    }
  },

  async saveCV(cv: CV): Promise<void> {
    try {
      const cvs = await this.loadCVs();
      const index = cvs.findIndex(c => c.id === cv.id);
      if (index !== -1) {
        cvs[index] = cv;
      } else {
        cvs.push(cv);
      }
      await this.saveCVs(cvs);
    } catch (error) {
      console.error('Error saving CV:', error);
      throw error;
    }
  },

  async deleteCV(cvId: string): Promise<void> {
    try {
      const cvs = await this.loadCVs();
      const filteredCVs = cvs.filter(cv => cv.id !== cvId);
      await this.saveCVs(filteredCVs);
    } catch (error) {
      console.error('Error deleting CV:', error);
      throw error;
    }
  },

  // Portfolio operations
  async savePortfolios(portfolios: Portfolio[]): Promise<void> {
    try {
      await AsyncStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(portfolios));
    } catch (error) {
      console.error('Error saving portfolios:', error);
      throw error;
    }
  },

  async loadPortfolios(): Promise<Portfolio[]> {
    try {
      const data = await AsyncStorage.getItem(PORTFOLIO_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading portfolios:', error);
      return [];
    }
  },

  async savePortfolio(portfolio: Portfolio): Promise<void> {
    try {
      const portfolios = await this.loadPortfolios();
      const index = portfolios.findIndex(p => p.id === portfolio.id);
      if (index !== -1) {
        portfolios[index] = portfolio;
      } else {
        portfolios.push(portfolio);
      }
      await this.savePortfolios(portfolios);
    } catch (error) {
      console.error('Error saving portfolio:', error);
      throw error;
    }
  },

  async deletePortfolio(portfolioId: string): Promise<void> {
    try {
      const portfolios = await this.loadPortfolios();
      const filteredPortfolios = portfolios.filter(p => p.id !== portfolioId);
      await this.savePortfolios(filteredPortfolios);
    } catch (error) {
      console.error('Error deleting portfolio:', error);
      throw error;
    }
  },

  // Clear all data
  async clearAll(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([CV_STORAGE_KEY, PORTFOLIO_STORAGE_KEY]);
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  },
};
