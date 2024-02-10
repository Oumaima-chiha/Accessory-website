import { SurveyQuestionType } from './enums/surveyQuestionType';

interface Question {
  id: number;
  title: string;
  type: SurveyQuestionType;
  options: QuestionOption[];
  createdAt: string;
  updatedAt: string;
  active: true;
}

interface QuestionOption {
  id: number;
  label: string;
  createdAt: string;
  updatedAt: string;
}

type ISurvey = Question[];

interface AnswerSurveyPayload {
  responses: ResponsePayload[];
  notificationId: number;
}

interface ResponsePayload {
  questionId: number;
  optionId: number;
}

export type { Question, QuestionOption, AnswerSurveyPayload, ISurvey };
