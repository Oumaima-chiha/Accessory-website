import {
  IArticle,
  IRecommendedSpecialist,
  IResults,
  IRiskFactor,
} from '../models';
import CustomQueryError from './customError';
import { Gender } from './enums/gender';
import { InterviewSteps } from './enums/interviewSteps';
import { UserType } from './enums/userType';

//? ---------- Demographic types ---------- ?//
type Age = {
  value: number;
  unit: 'year' | 'month';
};

//? ---------- Symptoms Interfaces ---------- ?//
interface ISymptoms {
  id: string;
  label: string;
  choiceId: string;
  source: string;
}

//? ---------- Regions Interfaces ---------- ?//
interface IRegion {
  id: string;
  label: string;
  choiceId: string;
  source: string;
}

//? ---------- RiskFactor Interfaces ---------- ?//
interface IAnswer {
  id: string;
  choiceId: string;
  value?: number;
  label?: string;
}
interface IScaleAnswer {
  id: string;
  max?: number;
  min?: number;
}

//? ---------- Interview Interfaces ---------- ?//

interface IInterview {
  questions: IQuestion[];
  conditions: ICondition[];
  currentQuestionIndex: number;
  shouldStop: boolean;
  hasEmergencyEvidence: boolean;
  interviewToken: string;
  currentQuestion: IQuestion;
  isNextButtonDisabled: boolean;
}
interface IQuestion {
  type: string;
  text: string;
  items: IItem[];
  answers: IAnswer[];
}

interface IItem {
  id: string;
  name: string;
  min?: number;
  max?: number;
  explication?: string;
  choices: IChoice[];
}

interface IChoice {
  id: string;
  label: string;
}

interface ICondition {
  id: string;
  name: string;
  commonName: string;
  probability: number;
  hasDetails: boolean;
}

interface HighestProbabilityCondition {
  condition: ICondition;
  token: string;
}

//? ---------- Risk Factor Interfaces ---------- ?//

interface IRiskFactorPayload {
  phrase?: string;
  sex: Gender.MALE | Gender.FEMALE;
  age: Age;
}

//? ---------- Results Interfaces ---------- ?//
interface IResultsPayload extends IRiskFactorPayload {
  evidence: Evidence[];
  interviewId?: number;
}

interface Evidence {
  id: string;
  choiceId: string;
  source?: string;
  label?: string;
}

interface ConditionPayload {
  interviewToken: string;
  conditionId: string;
}

interface IShareResultsPayload extends IResultsPayload {
  conditions: ICondition[];
  triageLevel: string;
  triageLabel: string;
  triageDetails: string;
}

//? ---------- Initial State Interfaces ---------- ?//
interface IInitialState {
  sex?: Gender;
  age?: Age & {
    date?: string;
  };
  type?: UserType;
  riskFactor?: IRiskFactor[];
  symptoms?: ISymptoms[];
  regions?: IRegion[];
  interview?: IInterview;
  shouldReset?: boolean;
  results?: {
    data?: IResults;
    isLoading?: boolean;
    error?: CustomQueryError;
    article?: {
      data?: IArticle;
      isLoading?: boolean;
      error?: CustomQueryError;
    };
    recommendedSpecialist?: IRecommendedSpecialist;
  };
  pendingResults?: boolean;
  interviewStep?: InterviewSteps;
}

//TODO:migrate to Dto
interface ISuggestRiskFactorsResponse {
  id: string;
  name: string;
  commonName: string;
  explication: string;
  question: string;
  questionThirdPerson: string;
}

export type {
  ISymptoms,
  IRegion,
  IAnswer,
  IInterview,
  IScaleAnswer,
  IItem,
  IQuestion,
  ICondition,
  IRiskFactorPayload,
  IChoice,
  IShareResultsPayload,
  IResultsPayload,
  ConditionPayload,
  IInitialState as CheckerInitialState,
  ISuggestRiskFactorsResponse,
  HighestProbabilityCondition,
  Age,
  Evidence,
};
