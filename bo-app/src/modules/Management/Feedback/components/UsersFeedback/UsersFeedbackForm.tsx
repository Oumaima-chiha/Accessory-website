import { SimpleGrid, VStack } from '@chakra-ui/react';
import Form from 'components/Form';
import FormControlButtons from 'components/Form/components/FormControlButtons';
import FormControlInput from 'components/Form/components/FormControlInput';
import FormControlTextArea from 'components/Form/components/FormControlTextArea';
import { useFormik } from 'formik';
import { FORM_TYPE } from 'interfaces/enums/formType';
import type { FormProps } from 'interfaces/FormProps';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { feedbackManagementRoute } from 'utils/constant';
import { capitalizeWords, displayToast } from 'utils/functions';
import { AnswerFeedbackSchema } from '../../extra/validation-schema/AnswerFeedbackSchema';
import type { IFeedback, IReduxFeedback } from '../../interfaces';
import { useAnswerUserFeedbackMutation } from '../../redux';

const AnswerFeedbackForm = (): JSX.Element => {
  const { t, i18n } = useTranslation(['fields', 'common']);
  const location = useLocation();
  const navigate = useNavigate();
  const { state }: { state: FormProps<IFeedback> } = location;
  const [answerUserFeedbackHandler, { isLoading }] =
    useAnswerUserFeedbackMutation();

  const formik = useFormik({
    initialValues: {
      comment: state?.form?.comment ?? '',
      title: state?.form?.title ?? '',
      answer: state?.form?.answer ?? '',
      feedbackCategory:
        state?.form?.feedbackCategory?.[
          `name${capitalizeWords(i18n.language)}`
        ] ?? '',
    },
    validationSchema: AnswerFeedbackSchema,
    onSubmit: async values => {
      const { answer } = values;
      await answerUserFeedback({
        id: state?.form?.id,
        answer,
      });
    },
  });

  const answerUserFeedback = async (
    payload: IReduxFeedback.AnswerUserFeedbackPayload,
  ): Promise<void> => {
    try {
      await answerUserFeedbackHandler(payload).unwrap();
      displayToast(
        t('feedback:success_msgs.feedback_answer_success', {
          context: 'answer',
        }),
        'success',
      );
      navigate(feedbackManagementRoute);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form
      handleSubmit={formik.handleSubmit}
      handleReset={formik.resetForm}
      title={`${t(`shared:${state?.type}`)} ${t(
        'feedback:users_feedback.name',
        { context: 'one' },
      )}`}>
      <VStack gap={3} alignItems="start">
        <SimpleGrid columns={2} spacing={2} width="100%">
          <FormControlInput
            formik={formik}
            name="feedbackCategory"
            label="feedback.feedback_category"
            schema={AnswerFeedbackSchema}
            isDisabled={true}
          />
          <FormControlInput
            formik={formik}
            name="title"
            label="feedback.title"
            schema={AnswerFeedbackSchema}
            isDisabled={true}
          />
          <FormControlTextArea
            formik={formik}
            name="answer"
            label="feedback.answer"
            schema={AnswerFeedbackSchema}
            isDisabled={state?.type === FORM_TYPE.VIEW}
          />
          <FormControlTextArea
            formik={formik}
            name="comment"
            label="feedback.question"
            schema={AnswerFeedbackSchema}
            isDisabled={true}
          />
        </SimpleGrid>
        {state?.type !== FORM_TYPE.VIEW && (
          <FormControlButtons isLoading={isLoading} />
        )}
      </VStack>
    </Form>
  );
};

export default AnswerFeedbackForm;
