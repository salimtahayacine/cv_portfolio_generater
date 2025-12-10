# CV & Portfolio Generator

A React Native mobile application for creating professional CVs and portfolios with export capabilities.

## Features

- **CV Management**: Create and manage professional curriculum vitae with experiences, education, skills, and languages
- **Portfolio Showcase**: Build and showcase your projects with images, descriptions, and links
- **Data Persistence**: Local storage using AsyncStorage to save your data
- **Export Functionality**: Export CVs and portfolios to HTML/CSS/JS (planned)
- **Share**: Share exported files with others (planned)

## Tech Stack

- **React Native + Expo**: Cross-platform mobile development
- **TypeScript**: Type-safe development
- **Redux Toolkit**: State management
- **React Navigation**: Navigation between screens
- **React Native Paper**: Material Design UI components
- **Formik + Yup**: Form handling and validation (planned)
- **AsyncStorage**: Local data persistence
- **Jest + React Testing Library**: Unit testing

## Project Structure

```
cv_portfolio_generater/
├── src/
│   ├── components/       # Reusable UI components
│   ├── screens/          # Screen components
│   ├── navigation/       # Navigation configuration
│   ├── store/            # Redux store and slices
│   ├── services/         # Services (storage, export, etc.)
│   ├── types/            # TypeScript type definitions
│   ├── hooks/            # Custom React hooks
│   └── utils/            # Utility functions
├── assets/               # Images, fonts, etc.
├── App.tsx               # Root component
└── package.json          # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (optional)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/salimtahayacine/cv_portfolio_generater.git
cd cv_portfolio_generater
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

### Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator (macOS only)
- `npm run web` - Run in web browser
- `npm test` - Run unit tests
- `npm run lint` - Run TypeScript type checking

## Development Progress

This project follows the MVP task list defined in "Liste des tâches (MVP).md":

### Completed Tasks
- ✅ T1: Initialize Expo + TypeScript project
- ✅ T2: Create Redux Toolkit store (CV & Portfolio)
- ✅ T3: Implement Home screen with navigation
- ✅ T7: Implement local storage (AsyncStorage)
- ✅ T10: Create unit tests for reducers

### In Progress
- 🔄 T4: CRUD for Experiences/Education with forms
- 🔄 T5: CRUD for Skills & Languages
- 🔄 T6: Create Portfolio screen with image support
- 🔄 T8: Implement export functionality (HTML/CSS/JS)
- 🔄 T9: Integrate Share functionality

### Planned
- ⏳ T11: E2E tests with Detox
- ⏳ T12: Complete documentation
- ⏳ T13: CI/CD with GitHub Actions

## Usage

1. Launch the app
2. Choose between CV or Portfolio management
3. Create and edit your CV with:
   - Personal information
   - Work experiences
   - Education history
   - Skills and competencies
   - Languages
4. Create portfolio items with:
   - Project titles
   - Descriptions
   - Links
   - Images
5. Export and share your CV/Portfolio

## Contributing

This project is in active development. Contributions are welcome!

## License

This project is private.

## Contact

For questions or support, please contact the project maintainer.
