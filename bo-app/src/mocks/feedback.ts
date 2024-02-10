import type { IUser } from 'models';
import type {
  IFeedback,
  IFeedbackCategory,
} from 'modules/Management/Feedback/interfaces';

// Mock data for categories list
const categories: IFeedbackCategory[] = [
  {
    id: 1,
    nameAr: 'تجربة المنتج',
    nameEn: 'Product Experience',
    active: false,
  },
  {
    id: 2,
    nameAr: 'دعم العملاء',
    nameEn: 'Customer Support',
    active: true,
  },
  {
    id: 3,
    nameAr: 'توصية',
    nameEn: 'Recommendation',
    active: false,
  },
];

// Mock data for feedback questions
const feedbackQuestions: IFeedback[] = [
  {
    id: 1,
    comment: 'How satisfied are you with our product?',
    answer: 'Correct',
    feedbackCategory: categories[0],
    date: new Date('2023-08-15').toLocaleDateString(),
    user: {
      id: 1,
      name: 'Hachem',
    } as IUser,
  },
  {
    id: 2,
    comment: 'Did you find our customer support helpful?',
    answer: null,
    feedbackCategory: categories[1],
    date: new Date('2023-08-14').toLocaleDateString(),
    user: {
      id: 2,
      name: 'Hachem',
    } as IUser,
  },
  {
    id: 3,
    comment: 'How likely are you to recommend our service to others?',
    answer: null,
    feedbackCategory: categories[2],
    date: new Date('2023-08-13').toLocaleDateString(),
    user: {
      id: 3,
      name: 'Hachem',
    } as IUser,
  },
];

export { feedbackQuestions, categories };
