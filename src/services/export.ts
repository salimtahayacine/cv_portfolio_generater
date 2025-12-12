import { File, Paths } from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as Print from 'expo-print';
import { CV, ExportOptions, CVTemplate } from '../types/cv.types';
import { Portfolio, PortfolioExportOptions, PortfolioTemplate } from '../types/portfolio.types';
import { escapeHtml } from '../utils/helpers';

/**
 * CV Template Generators
 */
const cvTemplates = {
  modern: (cv: CV): string => {
    const { personalInfo, experiences, education, skills, languages } = cv;
    const e = escapeHtml;

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${e(personalInfo.firstName)} ${e(personalInfo.lastName)} - CV</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
        h1 { color: #2c3e50; border-bottom: 3px solid #3498db; padding-bottom: 10px; margin-bottom: 20px; }
        h2 { color: #34495e; margin-top: 30px; margin-bottom: 15px; border-bottom: 2px solid #ecf0f1; padding-bottom: 5px; }
        h3 { color: #7f8c8d; margin-top: 15px; }
        .contact-info { margin-bottom: 20px; }
        .contact-info p { margin: 5px 0; }
        .section { margin-bottom: 30px; }
        .item { margin-bottom: 20px; }
        .item-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 5px; }
        .item-title { font-weight: bold; color: #2c3e50; }
        .item-subtitle { color: #7f8c8d; font-style: italic; }
        .item-date { color: #95a5a6; font-size: 0.9em; }
        .skill-list, .language-list { display: flex; flex-wrap: wrap; gap: 10px; }
        .skill-item, .language-item { background: #ecf0f1; padding: 5px 15px; border-radius: 20px; }
        @media print { body { padding: 0; } }
    </style>
</head>
<body>
    <header>
        <h1>${e(personalInfo.firstName)} ${e(personalInfo.lastName)}</h1>
        <div class="contact-info">
            <p><strong>Email:</strong> ${e(personalInfo.email)}</p>
            <p><strong>Phone:</strong> ${e(personalInfo.phone)}</p>
            <p><strong>Address:</strong> ${e(personalInfo.address)}</p>
        </div>
        ${personalInfo.summary ? `<p><strong>Summary:</strong> ${e(personalInfo.summary)}</p>` : ''}
    </header>

    ${experiences.length > 0 ? `
    <section class="section">
        <h2>Experience</h2>
        ${experiences.map(exp => `
        <div class="item">
            <div class="item-header">
                <div>
                    <div class="item-title">${e(exp.title)}</div>
                    <div class="item-subtitle">${e(exp.company)} - ${e(exp.location)}</div>
                </div>
                <div class="item-date">${e(exp.startDate)} - ${exp.current ? 'Present' : e(exp.endDate)}</div>
            </div>
            <p>${e(exp.description)}</p>
        </div>
        `).join('')}
    </section>
    ` : ''}

    ${education.length > 0 ? `
    <section class="section">
        <h2>Education</h2>
        ${education.map(edu => `
        <div class="item">
            <div class="item-header">
                <div>
                    <div class="item-title">${e(edu.degree)}</div>
                    <div class="item-subtitle">${e(edu.school)} - ${e(edu.location)}</div>
                </div>
                <div class="item-date">${e(edu.startDate)} - ${edu.current ? 'Present' : e(edu.endDate)}</div>
            </div>
            <p>${e(edu.description)}</p>
        </div>
        `).join('')}
    </section>
    ` : ''}

    ${skills.length > 0 ? `
    <section class="section">
        <h2>Skills</h2>
        <div class="skill-list">
            ${skills.map(skill => `<span class="skill-item">${e(skill.name)} (${e(skill.level)})</span>`).join('')}
        </div>
    </section>
    ` : ''}

    ${languages.length > 0 ? `
    <section class="section">
        <h2>Languages</h2>
        <div class="language-list">
            ${languages.map(lang => `<span class="language-item">${e(lang.name)} (${e(lang.level)})</span>`).join('')}
        </div>
    </section>
    ` : ''}
</body>
</html>
    `.trim();
  },

  classic: (cv: CV): string => {
    const { personalInfo, experiences, education, skills, languages } = cv;
    const e = escapeHtml;

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${e(personalInfo.firstName)} ${e(personalInfo.lastName)} - CV</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Times New Roman', serif; line-height: 1.8; color: #000; max-width: 800px; margin: 0 auto; padding: 30px; background: #fff; }
        h1 { color: #000; text-align: center; font-size: 2.5em; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 2px; }
        h2 { color: #000; margin-top: 25px; margin-bottom: 10px; font-size: 1.3em; text-transform: uppercase; border-bottom: 1px solid #000; padding-bottom: 3px; }
        .contact-info { text-align: center; margin-bottom: 25px; font-size: 0.95em; }
        .contact-info p { margin: 3px 0; }
        .section { margin-bottom: 25px; }
        .item { margin-bottom: 18px; }
        .item-header { margin-bottom: 5px; }
        .item-title { font-weight: bold; font-size: 1.1em; }
        .item-subtitle { font-style: italic; margin-top: 2px; }
        .item-date { font-size: 0.9em; margin-top: 2px; }
        .skill-list, .language-list { margin-top: 8px; }
        .skill-item, .language-item { display: inline-block; margin-right: 15px; margin-bottom: 5px; }
        @media print { body { padding: 10px; } }
    </style>
</head>
<body>
    <header>
        <h1>${e(personalInfo.firstName)} ${e(personalInfo.lastName)}</h1>
        <div class="contact-info">
            <p>${e(personalInfo.email)} | ${e(personalInfo.phone)} | ${e(personalInfo.address)}</p>
        </div>
        ${personalInfo.summary ? `<p style="text-align: center; margin-bottom: 20px;">${e(personalInfo.summary)}</p>` : ''}
    </header>

    ${experiences.length > 0 ? `
    <section class="section">
        <h2>Professional Experience</h2>
        ${experiences.map(exp => `
        <div class="item">
            <div class="item-header">
                <div class="item-title">${e(exp.title)}</div>
                <div class="item-subtitle">${e(exp.company)}, ${e(exp.location)}</div>
                <div class="item-date">${e(exp.startDate)} - ${exp.current ? 'Present' : e(exp.endDate)}</div>
            </div>
            <p>${e(exp.description)}</p>
        </div>
        `).join('')}
    </section>
    ` : ''}

    ${education.length > 0 ? `
    <section class="section">
        <h2>Education</h2>
        ${education.map(edu => `
        <div class="item">
            <div class="item-header">
                <div class="item-title">${e(edu.degree)}</div>
                <div class="item-subtitle">${e(edu.school)}, ${e(edu.location)}</div>
                <div class="item-date">${e(edu.startDate)} - ${edu.current ? 'Present' : e(edu.endDate)}</div>
            </div>
            <p>${e(edu.description)}</p>
        </div>
        `).join('')}
    </section>
    ` : ''}

    ${skills.length > 0 ? `
    <section class="section">
        <h2>Skills</h2>
        <div class="skill-list">
            ${skills.map(skill => `<span class="skill-item">${e(skill.name)} (${e(skill.level)})</span>`).join('')}
        </div>
    </section>
    ` : ''}

    ${languages.length > 0 ? `
    <section class="section">
        <h2>Languages</h2>
        <div class="language-list">
            ${languages.map(lang => `<span class="language-item">${e(lang.name)} (${e(lang.level)})</span>`).join('')}
        </div>
    </section>
    ` : ''}
</body>
</html>
    `.trim();
  },
};

/**
 * Portfolio Template Generators
 */
const portfolioTemplates = {
  grid: (portfolio: Portfolio): string => {
    const { name, items } = portfolio;
    const e = escapeHtml;

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${e(name)} - Portfolio</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; background: #f5f5f5; }
        header { background: #2c3e50; color: white; padding: 40px 20px; text-align: center; }
        h1 { font-size: 2.5em; margin-bottom: 10px; }
        .container { max-width: 1200px; margin: 0 auto; padding: 40px 20px; }
        .portfolio-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 30px; }
        .portfolio-item { background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); transition: transform 0.3s; }
        .portfolio-item:hover { transform: translateY(-5px); box-shadow: 0 5px 20px rgba(0,0,0,0.2); }
        .portfolio-image { width: 100%; height: 200px; background: #ecf0f1; display: flex; align-items: center; justify-content: center; color: #95a5a6; }
        .portfolio-content { padding: 20px; }
        .portfolio-title { font-size: 1.5em; color: #2c3e50; margin-bottom: 10px; }
        .portfolio-description { color: #7f8c8d; margin-bottom: 15px; }
        .portfolio-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 15px; }
        .tag { background: #3498db; color: white; padding: 4px 12px; border-radius: 15px; font-size: 0.85em; }
        .portfolio-link { display: inline-block; color: #3498db; text-decoration: none; font-weight: bold; }
        .portfolio-link:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <header>
        <h1>${e(name)}</h1>
        <p>My Portfolio</p>
    </header>

    <div class="container">
        <div class="portfolio-grid">
            ${items.map(item => `
            <div class="portfolio-item">
                <div class="portfolio-image">
                    ${item.imageUri ? `<img src="${e(item.imageUri)}" alt="${e(item.title)}" style="width: 100%; height: 100%; object-fit: cover;">` : '<span>No Image</span>'}
                </div>
                <div class="portfolio-content">
                    <h2 class="portfolio-title">${e(item.title)}</h2>
                    <p class="portfolio-description">${e(item.description)}</p>
                    ${item.tags.length > 0 ? `
                    <div class="portfolio-tags">
                        ${item.tags.map(tag => `<span class="tag">${e(tag)}</span>`).join('')}
                    </div>
                    ` : ''}
                    ${item.link ? `<a href="${e(item.link)}" class="portfolio-link" target="_blank">View Project →</a>` : ''}
                </div>
            </div>
            `).join('')}
        </div>
    </div>
</body>
</html>
    `.trim();
  },

  list: (portfolio: Portfolio): string => {
    const { name, items } = portfolio;
    const e = escapeHtml;

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${e(name)} - Portfolio</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; background: #fff; }
        header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 60px 20px; text-align: center; }
        h1 { font-size: 3em; margin-bottom: 10px; }
        .container { max-width: 900px; margin: 0 auto; padding: 40px 20px; }
        .portfolio-item { background: white; margin-bottom: 30px; padding: 30px; border-left: 5px solid #667eea; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
        .portfolio-header { display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px; }
        .portfolio-title { font-size: 1.8em; color: #2c3e50; margin-bottom: 5px; }
        .portfolio-image { width: 200px; height: 150px; background: #ecf0f1; display: flex; align-items: center; justify-content: center; color: #95a5a6; border-radius: 5px; margin-left: 20px; flex-shrink: 0; }
        .portfolio-main { flex: 1; }
        .portfolio-description { color: #555; margin-bottom: 15px; line-height: 1.8; }
        .portfolio-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 15px; }
        .tag { background: #667eea; color: white; padding: 5px 15px; border-radius: 20px; font-size: 0.85em; }
        .portfolio-link { color: #667eea; text-decoration: none; font-weight: bold; font-size: 0.95em; }
        .portfolio-link:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <header>
        <h1>${e(name)}</h1>
        <p style="font-size: 1.2em; margin-top: 10px;">Portfolio Collection</p>
    </header>

    <div class="container">
        ${items.map(item => `
        <div class="portfolio-item">
            <div class="portfolio-header">
                <div class="portfolio-main">
                    <h2 class="portfolio-title">${e(item.title)}</h2>
                    <p class="portfolio-description">${e(item.description)}</p>
                    ${item.tags.length > 0 ? `
                    <div class="portfolio-tags">
                        ${item.tags.map(tag => `<span class="tag">${e(tag)}</span>`).join('')}
                    </div>
                    ` : ''}
                    ${item.link ? `<a href="${e(item.link)}" class="portfolio-link" target="_blank">View Project →</a>` : ''}
                </div>
                ${item.imageUri ? `
                <div class="portfolio-image">
                    <img src="${e(item.imageUri)}" alt="${e(item.title)}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 5px;">
                </div>
                ` : ''}
            </div>
        </div>
        `).join('')}
    </div>
</body>
</html>
    `.trim();
  },
};

/**
 * Export service for generating HTML/PDF files from CV and Portfolio data
 */
export const exportService = {
  /**
   * Generate HTML content for a CV with specified template
   */
  generateCVHTML(cv: CV, template: CVTemplate = 'modern'): string {
    const templateGenerator = cvTemplates[template];
    return templateGenerator(cv);
  },

  /**
   * Generate HTML content for a Portfolio with specified template
   */
  generatePortfolioHTML(portfolio: Portfolio, template: PortfolioTemplate = 'grid'): string {
    const templateGenerator = portfolioTemplates[template];
    return templateGenerator(portfolio);
  },

  /**
   * Export CV with specified options (format and template)
   */
  async exportAndShareCV(cv: CV, options: ExportOptions = { format: 'html', template: 'modern' }): Promise<void> {
    try {
      const html = this.generateCVHTML(cv, options.template || 'modern');
      const timestamp = Date.now();
      const baseName = `CV_${cv.personalInfo.firstName}_${cv.personalInfo.lastName}_${timestamp}`;

      if (options.format === 'pdf') {
        // Generate PDF from HTML
        const { uri } = await Print.printToFileAsync({ html });
        
        const isAvailable = await Sharing.isAvailableAsync();
        if (isAvailable) {
          await Sharing.shareAsync(uri, {
            mimeType: 'application/pdf',
            dialogTitle: 'Share CV (PDF)',
          });
        } else {
          throw new Error('Sharing is not available on this device');
        }
      } else {
        // Export as HTML
        const fileName = `${baseName}.html`;
        const file = new File(Paths.document, fileName);
        file.write(html);

        const isAvailable = await Sharing.isAvailableAsync();
        if (isAvailable) {
          await Sharing.shareAsync(file.uri, {
            mimeType: 'text/html',
            dialogTitle: 'Share CV (HTML)',
          });
        } else {
          throw new Error('Sharing is not available on this device');
        }
      }
    } catch (error) {
      console.error('Error exporting CV:', error);
      throw error;
    }
  },

  /**
   * Export Portfolio with specified options (format and template)
   */
  async exportAndSharePortfolio(
    portfolio: Portfolio,
    options: PortfolioExportOptions = { format: 'html', template: 'grid' }
  ): Promise<void> {
    try {
      const html = this.generatePortfolioHTML(portfolio, options.template || 'grid');
      const timestamp = Date.now();
      const baseName = `Portfolio_${portfolio.name.replace(/\s+/g, '_')}_${timestamp}`;

      if (options.format === 'pdf') {
        // Generate PDF from HTML
        const { uri } = await Print.printToFileAsync({ html });
        
        const isAvailable = await Sharing.isAvailableAsync();
        if (isAvailable) {
          await Sharing.shareAsync(uri, {
            mimeType: 'application/pdf',
            dialogTitle: 'Share Portfolio (PDF)',
          });
        } else {
          throw new Error('Sharing is not available on this device');
        }
      } else {
        // Export as HTML
        const fileName = `${baseName}.html`;
        const file = new File(Paths.document, fileName);
        file.write(html);

        const isAvailable = await Sharing.isAvailableAsync();
        if (isAvailable) {
          await Sharing.shareAsync(file.uri, {
            mimeType: 'text/html',
            dialogTitle: 'Share Portfolio (HTML)',
          });
        } else {
          throw new Error('Sharing is not available on this device');
        }
      }
    } catch (error) {
      console.error('Error exporting portfolio:', error);
      throw error;
    }
  },
};
