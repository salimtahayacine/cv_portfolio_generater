IDTâchePrioritéDuréeStatusNotes
T1Initialise projet Expo + TypeScriptH0.5 jest.✅ DONEexpo init + config TS
T2Créer le store Redux Toolkit (CV & Portfolio)H1 jest.✅ DONEcreateSlice, middleware
T3Implémenter l'écran d'accueil (Home)M0.5 jest.✅ DONENavigation vers CV / Portfolio
T4CRUD – Expériences / ÉducationM1 jest.✅ DONEForms + validation (Formik/Yup)
T5CRUD – Compétences & LanguesM0.5 jest.✅ DONESimilar to T4
T6Créer écran "Portfolio" (titre, description, lien, image)H1 jest.✅ DONEGestion d'image via expo-image-picker
T7Gérer le stockage local (AsyncStorage)M0.5 jest.✅ DONEPersistant les CV/portfolios
T8Implémenter l'export : génération HTML/CSS/JSH2 j✅ DONEScript dans services/export.ts
T9Intégrer <Share> pour partager le dossier exportéL0.5 jest.✅ DONEexpo-sharing
T10Tests unitaires sur reducers & composants clésM1 jest.🔄 TODOJest + RTL
T11Tests E2E (Detox) – navigation & export Liste\ des\ tâches\ \(MVP\).md 1 jest.🔄 TODOSetup Detox, tests scripts
T12Documentation README + guide utilisateurL1 jest.🔄 TODOMarkdown détaillé
T13CI/CD avec GitHub ActionsL1 jest.🔄 TODOBuild, test, lint

## Completed Tasks (T1-T9)

### T1-T3: Project Setup ✅
- Expo project initialized with TypeScript
- Redux Toolkit store configured with CV and Portfolio slices
- Home screen with navigation implemented

### T4: CRUD for Experiences/Education ✅
- Created CVListScreen to display all CVs
- Created CVDetailScreen to view and manage CV details
- Created ExperienceFormScreen with Formik validation
- Created EducationFormScreen with Formik validation
- Full CRUD operations for experiences and education

### T5: CRUD for Skills & Languages ✅
- Created SkillsFormScreen with inline add/edit/delete
- Created LanguagesFormScreen with inline add/edit/delete
- Dropdown menus for skill/language levels

### T6: Portfolio Screens with Image Support ✅
- Created PortfolioListScreen to display all portfolios
- Created PortfolioDetailScreen to view and manage portfolios
- Created PortfolioItemFormScreen with expo-image-picker integration
- Support for tags and external links

### T7: Storage (Already Implemented) ✅
- AsyncStorage service for persisting CVs and Portfolios
- Auto-load on app start

### T8: Export Functionality ✅
- HTML/CSS/JS generation for CVs
- HTML/CSS/JS generation for Portfolios
- Export buttons in CVDetailScreen and PortfolioDetailScreen

### T9: Share Integration ✅
- expo-sharing integrated in export service
- Share functionality connected to export buttons
- One-click export and share for both CVs and Portfolios

## Remaining Tasks (T10-T13)

Tasks T10-T13 are out of scope for the current implementation but are documented for future development:
- T10: Unit tests expansion
- T11: E2E testing with Detox
- T12: Comprehensive documentation
- T13: CI/CD pipeline setup
