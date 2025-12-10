import { File, Paths } from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { CV } from '../types/cv.types';
import { Portfolio } from '../types/portfolio.types';

/**
 * Export service for generating HTML/CSS/JS files from CV and Portfolio data
 */
export const exportService = {
  /**
   * Generate HTML content for a CV
   */
  generateCVHTML(cv: CV): string {
    const { personalInfo, experiences, education, skills, languages } = cv;

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${personalInfo.firstName} ${personalInfo.lastName} - CV</title>
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
        <h1>${personalInfo.firstName} ${personalInfo.lastName}</h1>
        <div class="contact-info">
            <p><strong>Email:</strong> ${personalInfo.email}</p>
            <p><strong>Phone:</strong> ${personalInfo.phone}</p>
            <p><strong>Address:</strong> ${personalInfo.address}</p>
        </div>
        ${personalInfo.summary ? `<p><strong>Summary:</strong> ${personalInfo.summary}</p>` : ''}
    </header>

    ${experiences.length > 0 ? `
    <section class="section">
        <h2>Experience</h2>
        ${experiences.map(exp => `
        <div class="item">
            <div class="item-header">
                <div>
                    <div class="item-title">${exp.title}</div>
                    <div class="item-subtitle">${exp.company} - ${exp.location}</div>
                </div>
                <div class="item-date">${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}</div>
            </div>
            <p>${exp.description}</p>
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
                    <div class="item-title">${edu.degree}</div>
                    <div class="item-subtitle">${edu.school} - ${edu.location}</div>
                </div>
                <div class="item-date">${edu.startDate} - ${edu.current ? 'Present' : edu.endDate}</div>
            </div>
            <p>${edu.description}</p>
        </div>
        `).join('')}
    </section>
    ` : ''}

    ${skills.length > 0 ? `
    <section class="section">
        <h2>Skills</h2>
        <div class="skill-list">
            ${skills.map(skill => `<span class="skill-item">${skill.name} (${skill.level})</span>`).join('')}
        </div>
    </section>
    ` : ''}

    ${languages.length > 0 ? `
    <section class="section">
        <h2>Languages</h2>
        <div class="language-list">
            ${languages.map(lang => `<span class="language-item">${lang.name} (${lang.level})</span>`).join('')}
        </div>
    </section>
    ` : ''}
</body>
</html>
    `.trim();
  },

  /**
   * Generate HTML content for a Portfolio
   */
  generatePortfolioHTML(portfolio: Portfolio): string {
    const { name, items } = portfolio;

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name} - Portfolio</title>
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
        <h1>${name}</h1>
        <p>My Portfolio</p>
    </header>

    <div class="container">
        <div class="portfolio-grid">
            ${items.map(item => `
            <div class="portfolio-item">
                <div class="portfolio-image">
                    ${item.imageUri ? `<img src="${item.imageUri}" alt="${item.title}" style="width: 100%; height: 100%; object-fit: cover;">` : '<span>No Image</span>'}
                </div>
                <div class="portfolio-content">
                    <h2 class="portfolio-title">${item.title}</h2>
                    <p class="portfolio-description">${item.description}</p>
                    ${item.tags.length > 0 ? `
                    <div class="portfolio-tags">
                        ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    ` : ''}
                    ${item.link ? `<a href="${item.link}" class="portfolio-link" target="_blank">View Project →</a>` : ''}
                </div>
            </div>
            `).join('')}
        </div>
    </div>
</body>
</html>
    `.trim();
  },

  /**
   * Export CV to HTML file and share it
   */
  async exportAndShareCV(cv: CV): Promise<void> {
    try {
      const html = this.generateCVHTML(cv);
      const fileName = `CV_${cv.personalInfo.firstName}_${cv.personalInfo.lastName}_${Date.now()}.html`;
      const file = new File(Paths.document, fileName);

      file.write(html);

      const isAvailable = await Sharing.isAvailableAsync();
      if (isAvailable) {
        await Sharing.shareAsync(file.uri, {
          mimeType: 'text/html',
          dialogTitle: 'Share CV',
        });
      } else {
        throw new Error('Sharing is not available on this device');
      }
    } catch (error) {
      console.error('Error exporting CV:', error);
      throw error;
    }
  },

  /**
   * Export Portfolio to HTML file and share it
   */
  async exportAndSharePortfolio(portfolio: Portfolio): Promise<void> {
    try {
      const html = this.generatePortfolioHTML(portfolio);
      const fileName = `Portfolio_${portfolio.name.replace(/\s+/g, '_')}_${Date.now()}.html`;
      const file = new File(Paths.document, fileName);

      file.write(html);

      const isAvailable = await Sharing.isAvailableAsync();
      if (isAvailable) {
        await Sharing.shareAsync(file.uri, {
          mimeType: 'text/html',
          dialogTitle: 'Share Portfolio',
        });
      } else {
        throw new Error('Sharing is not available on this device');
      }
    } catch (error) {
      console.error('Error exporting portfolio:', error);
      throw error;
    }
  },
};
