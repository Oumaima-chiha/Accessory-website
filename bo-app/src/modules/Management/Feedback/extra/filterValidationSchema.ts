import * as Yup from 'yup';

export const FeedbackFilterFormSchema = Yup.object().shape({
  title: Yup.string().strict(true).trim().optional(),
  comment: Yup.string().strict(true).trim().optional(),
  answer: Yup.string().strict(true).trim().optional(),
});

export const FeedbackCategoryFilterFormSchema = Yup.object().shape({
  title: Yup.string().strict(true).trim().optional(),
  status: Yup.string().trim().optional(),
});
