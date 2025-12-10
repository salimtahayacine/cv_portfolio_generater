import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CV, Experience, Education, Skill, Language, PersonalInfo } from '../../types/cv.types';

interface CVState {
  cvs: CV[];
  currentCV: CV | null;
}

const initialState: CVState = {
  cvs: [],
  currentCV: null,
};

const cvSlice = createSlice({
  name: 'cv',
  initialState,
  reducers: {
    createCV: (state, action: PayloadAction<CV>) => {
      state.cvs.push(action.payload);
      state.currentCV = action.payload;
    },
    updateCV: (state, action: PayloadAction<CV>) => {
      const index = state.cvs.findIndex(cv => cv.id === action.payload.id);
      if (index !== -1) {
        state.cvs[index] = action.payload;
        if (state.currentCV?.id === action.payload.id) {
          state.currentCV = action.payload;
        }
      }
    },
    deleteCV: (state, action: PayloadAction<string>) => {
      state.cvs = state.cvs.filter(cv => cv.id !== action.payload);
      if (state.currentCV?.id === action.payload) {
        state.currentCV = null;
      }
    },
    setCurrentCV: (state, action: PayloadAction<string>) => {
      const cv = state.cvs.find(cv => cv.id === action.payload);
      state.currentCV = cv || null;
    },
    updatePersonalInfo: (state, action: PayloadAction<PersonalInfo>) => {
      if (state.currentCV) {
        state.currentCV.personalInfo = action.payload;
        state.currentCV.updatedAt = new Date().toISOString();
        const index = state.cvs.findIndex(cv => cv.id === state.currentCV!.id);
        if (index !== -1) {
          state.cvs[index] = state.currentCV;
        }
      }
    },
    addExperience: (state, action: PayloadAction<Experience>) => {
      if (state.currentCV) {
        state.currentCV.experiences.push(action.payload);
        state.currentCV.updatedAt = new Date().toISOString();
      }
    },
    updateExperience: (state, action: PayloadAction<Experience>) => {
      if (state.currentCV) {
        const index = state.currentCV.experiences.findIndex(exp => exp.id === action.payload.id);
        if (index !== -1) {
          state.currentCV.experiences[index] = action.payload;
          state.currentCV.updatedAt = new Date().toISOString();
        }
      }
    },
    deleteExperience: (state, action: PayloadAction<string>) => {
      if (state.currentCV) {
        state.currentCV.experiences = state.currentCV.experiences.filter(
          exp => exp.id !== action.payload
        );
        state.currentCV.updatedAt = new Date().toISOString();
      }
    },
    addEducation: (state, action: PayloadAction<Education>) => {
      if (state.currentCV) {
        state.currentCV.education.push(action.payload);
        state.currentCV.updatedAt = new Date().toISOString();
      }
    },
    updateEducation: (state, action: PayloadAction<Education>) => {
      if (state.currentCV) {
        const index = state.currentCV.education.findIndex(edu => edu.id === action.payload.id);
        if (index !== -1) {
          state.currentCV.education[index] = action.payload;
          state.currentCV.updatedAt = new Date().toISOString();
        }
      }
    },
    deleteEducation: (state, action: PayloadAction<string>) => {
      if (state.currentCV) {
        state.currentCV.education = state.currentCV.education.filter(
          edu => edu.id !== action.payload
        );
        state.currentCV.updatedAt = new Date().toISOString();
      }
    },
    addSkill: (state, action: PayloadAction<Skill>) => {
      if (state.currentCV) {
        state.currentCV.skills.push(action.payload);
        state.currentCV.updatedAt = new Date().toISOString();
      }
    },
    updateSkill: (state, action: PayloadAction<Skill>) => {
      if (state.currentCV) {
        const index = state.currentCV.skills.findIndex(skill => skill.id === action.payload.id);
        if (index !== -1) {
          state.currentCV.skills[index] = action.payload;
          state.currentCV.updatedAt = new Date().toISOString();
        }
      }
    },
    deleteSkill: (state, action: PayloadAction<string>) => {
      if (state.currentCV) {
        state.currentCV.skills = state.currentCV.skills.filter(
          skill => skill.id !== action.payload
        );
        state.currentCV.updatedAt = new Date().toISOString();
      }
    },
    addLanguage: (state, action: PayloadAction<Language>) => {
      if (state.currentCV) {
        state.currentCV.languages.push(action.payload);
        state.currentCV.updatedAt = new Date().toISOString();
      }
    },
    updateLanguage: (state, action: PayloadAction<Language>) => {
      if (state.currentCV) {
        const index = state.currentCV.languages.findIndex(lang => lang.id === action.payload.id);
        if (index !== -1) {
          state.currentCV.languages[index] = action.payload;
          state.currentCV.updatedAt = new Date().toISOString();
        }
      }
    },
    deleteLanguage: (state, action: PayloadAction<string>) => {
      if (state.currentCV) {
        state.currentCV.languages = state.currentCV.languages.filter(
          lang => lang.id !== action.payload
        );
        state.currentCV.updatedAt = new Date().toISOString();
      }
    },
    loadCVs: (state, action: PayloadAction<CV[]>) => {
      state.cvs = action.payload;
    },
  },
});

export const {
  createCV,
  updateCV,
  deleteCV,
  setCurrentCV,
  updatePersonalInfo,
  addExperience,
  updateExperience,
  deleteExperience,
  addEducation,
  updateEducation,
  deleteEducation,
  addSkill,
  updateSkill,
  deleteSkill,
  addLanguage,
  updateLanguage,
  deleteLanguage,
  loadCVs,
} = cvSlice.actions;

export default cvSlice.reducer;
