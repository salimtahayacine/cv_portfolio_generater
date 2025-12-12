import { exportService } from '../export';
import { CV } from '../../types/cv.types';
import { Portfolio } from '../../types/portfolio.types';

describe('exportService', () => {
  const mockCV: CV = {
    id: '1',
    personalInfo: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '1234567890',
      address: '123 Main St',
      summary: 'Software Developer',
    },
    experiences: [
      {
        id: 'exp1',
        title: 'Software Engineer',
        company: 'Tech Corp',
        location: 'San Francisco',
        startDate: '2020-01-01',
        endDate: '2023-01-01',
        current: false,
        description: 'Developed web applications',
      },
    ],
    education: [
      {
        id: 'edu1',
        degree: 'Bachelor of Science',
        school: 'University',
        location: 'City',
        startDate: '2016-09-01',
        endDate: '2020-06-01',
        current: false,
        description: 'Computer Science',
      },
    ],
    skills: [
      {
        id: 'skill1',
        name: 'JavaScript',
        level: 'expert',
      },
    ],
    languages: [
      {
        id: 'lang1',
        name: 'English',
        level: 'native',
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const mockPortfolio: Portfolio = {
    id: '1',
    name: 'My Portfolio',
    items: [
      {
        id: 'item1',
        title: 'Project 1',
        description: 'A great project',
        link: 'https://example.com',
        imageUri: 'https://example.com/image.jpg',
        tags: ['React', 'TypeScript'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  describe('generateCVHTML', () => {
    it('should generate HTML for CV with modern template', () => {
      const html = exportService.generateCVHTML(mockCV, 'modern');
      
      expect(html).toContain('<!DOCTYPE html>');
      expect(html).toContain('John Doe');
      expect(html).toContain('john@example.com');
      expect(html).toContain('Software Engineer');
      expect(html).toContain('Tech Corp');
      expect(html).toContain('Bachelor of Science');
      expect(html).toContain('JavaScript');
      expect(html).toContain('English');
    });

    it('should generate HTML for CV with classic template', () => {
      const html = exportService.generateCVHTML(mockCV, 'classic');
      
      expect(html).toContain('<!DOCTYPE html>');
      expect(html).toContain('John Doe');
      expect(html).toContain('Professional Experience');
      expect(html).toContain('text-align: center');
    });

    it('should escape HTML special characters', () => {
      const cvWithSpecialChars: CV = {
        ...mockCV,
        personalInfo: {
          ...mockCV.personalInfo,
          firstName: 'John<script>',
          lastName: 'Doe&Co',
        },
      };
      
      const html = exportService.generateCVHTML(cvWithSpecialChars, 'modern');
      
      expect(html).not.toContain('<script>');
      expect(html).toContain('&lt;script&gt;');
      expect(html).toContain('&amp;Co');
    });

    it('should default to modern template if not specified', () => {
      const html = exportService.generateCVHTML(mockCV);
      
      expect(html).toContain('<!DOCTYPE html>');
      expect(html).toContain('John Doe');
    });
  });

  describe('generatePortfolioHTML', () => {
    it('should generate HTML for Portfolio with grid template', () => {
      const html = exportService.generatePortfolioHTML(mockPortfolio, 'grid');
      
      expect(html).toContain('<!DOCTYPE html>');
      expect(html).toContain('My Portfolio');
      expect(html).toContain('Project 1');
      expect(html).toContain('A great project');
      expect(html).toContain('React');
      expect(html).toContain('TypeScript');
      expect(html).toContain('portfolio-grid');
    });

    it('should generate HTML for Portfolio with list template', () => {
      const html = exportService.generatePortfolioHTML(mockPortfolio, 'list');
      
      expect(html).toContain('<!DOCTYPE html>');
      expect(html).toContain('My Portfolio');
      expect(html).toContain('Project 1');
      expect(html).toContain('linear-gradient');
    });

    it('should handle portfolios without images', () => {
      const portfolioWithoutImage: Portfolio = {
        ...mockPortfolio,
        items: [
          {
            ...mockPortfolio.items[0],
            imageUri: undefined,
          },
        ],
      };
      
      const html = exportService.generatePortfolioHTML(portfolioWithoutImage, 'grid');
      
      expect(html).toContain('No Image');
    });

    it('should default to grid template if not specified', () => {
      const html = exportService.generatePortfolioHTML(mockPortfolio);
      
      expect(html).toContain('portfolio-grid');
    });
  });
});
