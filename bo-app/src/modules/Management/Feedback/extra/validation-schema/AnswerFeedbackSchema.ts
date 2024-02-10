import * as Yup from 'yup';

export const AnswerFeedbackSchema = Yup.object().shape({
  answer: Yup.string().required('field_required').label('Answer'),
});
