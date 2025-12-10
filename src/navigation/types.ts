export type RootStackParamList = {
  Home: undefined;
  CVList: undefined;
  CVForm: { cvId?: string };
  CVDetail: { cvId: string };
  ExperienceForm: { experienceId?: string };
  EducationForm: { educationId?: string };
  SkillsForm: undefined;
  LanguagesForm: undefined;
  PortfolioList: undefined;
  PortfolioForm: { portfolioId?: string };
  PortfolioDetail: { portfolioId: string };
  PortfolioItemForm: { itemId?: string };
  Export: { type: 'cv' | 'portfolio'; id: string };
};
