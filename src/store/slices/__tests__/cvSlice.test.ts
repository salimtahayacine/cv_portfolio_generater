import cvReducer, {
  createCV,
  updateCV,
  deleteCV,
  addExperience,
  updateExperience,
  deleteExperience,
} from '../cvSlice';
import { CV, Experience } from '../../../types/cv.types';

describe('cvSlice', () => {
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
    experiences: [],
    education: [],
    skills: [],
    languages: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const mockExperience: Experience = {
    id: 'exp1',
    title: 'Software Engineer',
    company: 'Tech Corp',
    location: 'San Francisco',
    startDate: '2020-01-01',
    endDate: '2023-01-01',
    current: false,
    description: 'Developed web applications',
  };

  it('should handle initial state', () => {
    expect(cvReducer(undefined, { type: 'unknown' })).toEqual({
      cvs: [],
      currentCV: null,
    });
  });

  it('should handle createCV', () => {
    const actual = cvReducer(undefined, createCV(mockCV));
    expect(actual.cvs).toHaveLength(1);
    expect(actual.cvs[0]).toEqual(mockCV);
    expect(actual.currentCV).toEqual(mockCV);
  });

  it('should handle updateCV', () => {
    const initialState = {
      cvs: [mockCV],
      currentCV: mockCV,
    };
    const updatedCV = { ...mockCV, personalInfo: { ...mockCV.personalInfo, firstName: 'Jane' } };
    const actual = cvReducer(initialState, updateCV(updatedCV));
    expect(actual.cvs[0].personalInfo.firstName).toBe('Jane');
    expect(actual.currentCV?.personalInfo.firstName).toBe('Jane');
  });

  it('should handle deleteCV', () => {
    const initialState = {
      cvs: [mockCV],
      currentCV: mockCV,
    };
    const actual = cvReducer(initialState, deleteCV(mockCV.id));
    expect(actual.cvs).toHaveLength(0);
    expect(actual.currentCV).toBeNull();
  });

  it('should handle addExperience', () => {
    const initialState = {
      cvs: [mockCV],
      currentCV: mockCV,
    };
    const actual = cvReducer(initialState, addExperience(mockExperience));
    expect(actual.currentCV?.experiences).toHaveLength(1);
    expect(actual.currentCV?.experiences[0]).toEqual(mockExperience);
  });

  it('should handle updateExperience', () => {
    const cvWithExperience = {
      ...mockCV,
      experiences: [mockExperience],
    };
    const initialState = {
      cvs: [cvWithExperience],
      currentCV: cvWithExperience,
    };
    const updatedExperience = { ...mockExperience, title: 'Senior Software Engineer' };
    const actual = cvReducer(initialState, updateExperience(updatedExperience));
    expect(actual.currentCV?.experiences[0].title).toBe('Senior Software Engineer');
  });

  it('should handle deleteExperience', () => {
    const cvWithExperience = {
      ...mockCV,
      experiences: [mockExperience],
    };
    const initialState = {
      cvs: [cvWithExperience],
      currentCV: cvWithExperience,
    };
    const actual = cvReducer(initialState, deleteExperience(mockExperience.id));
    expect(actual.currentCV?.experiences).toHaveLength(0);
  });
});
